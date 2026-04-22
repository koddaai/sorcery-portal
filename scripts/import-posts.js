#!/usr/bin/env node
/**
 * Import posts from sorcery_forum_posts.md to Astro content collection
 *
 * Usage: node scripts/import-posts.js [--all | --launch-batch]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SOURCE_FILE = '/Users/pedro/sorcery_forum_posts.md';
const OUTPUT_DIR = '/Users/pedro/sorcery.com.br/src/content/blog';
const PUB_DATE = '2026-04-22';

// Tag to category mapping
const TAG_CATEGORY_MAP = {
  'GUIA': 'primeiros-passos',
  'AVISO CRÍTICO': 'regras-mecanicas',
  'RULE OF COOL': 'geral',
  'MECÂNICA': 'regras-mecanicas',
  'RULING': 'duvidas-cartas',
  'NOMENCLATURA': 'geral',
  'DECK TECH': 'decks-construcao',
  'COMBO': 'decks-construcao',
  'COMBO INFINITO': 'decks-construcao',
  'META': 'meta-competitivo',
  'RECURSOS': 'ferramentas',
  'AVATAR SPOTLIGHT': 'decks-construcao',
  'CARD SPOTLIGHT': 'duvidas-cartas',
  'SET REVIEW': 'sets-spoilers',
  'ELEMENTO': 'regras-mecanicas',
  'FORMATO': 'limited',
  'PLAYBOOK': 'decks-construcao',
  'LORE': 'lore-arte',
  'REFERÊNCIA': 'ferramentas',
  'ANÁLISE': 'meta-competitivo',
  'EVENTO': 'eventos',
  'COMUNIDADE': 'eventos',
  'CHANGELOG': 'regras-mecanicas',
  'DEEP DIVE': 'regras-mecanicas',
  'ANATOMIA': 'primeiros-passos',
  'ESTRATÉGIA': 'decks-construcao',
  'GLOSSÁRIO': 'primeiros-passos',
};

// Tag to type mapping
const TAG_TYPE_MAP = {
  'GUIA': 'pilar',
  'DEEP DIVE': 'pilar',
  'AVATAR SPOTLIGHT': 'pilar',
  'SET REVIEW': 'pilar',
  'GLOSSÁRIO': 'pilar',
  'ANATOMIA': 'pilar',
  'RULE OF COOL': 'cultura',
  'LORE': 'cultura',
  'COMUNIDADE': 'cultura',
  'EVENTO': 'cultura',
};

// Launch batch titles (exact matches from the document)
const LAUNCH_BATCH_TITLES = [
  'Vim do Magic, o que muda?',
  'Acabei de descobrir o jogo',
  '8 dúvidas que todo jogador novo tem',
  'Os Avatares mais amigáveis',
  'Movimentação no grid',
  'Threshold vs. Mana',
  'Combate em Sorcery',
  'Avatar só morre por dano direto',
  'Avatar só morre por DANO DIRETO',
  'Glossário',
  'todas as keywords',
  'Anatomia de uma carta',
  'A primeira regra de Sorcery',
  'seja legal',
  'Os quatro elementos do Realm',
  'Crescimento explosivo',
  'Deckbuilding em Sorcery',
  'os fundamentos',
  'Druid',
  'dominante do meta',
  'Nomes dos pares de elementos',
  'Steam, Mud, Mist',
  'Precons do Beta',
  'As ferramentas que todo jogador',
  'Como jogar Sorcery sem ninguém',
  'Dust Rewards',
];

/**
 * Convert title to URL-friendly slug
 */
function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^\w\s-]/g, '') // Remove non-word chars
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/-+/g, '-') // Replace multiple - with single -
    .replace(/^-|-$/g, '') // Trim - from start/end
    .substring(0, 60); // Limit length
}

/**
 * Generate SEO description from content
 */
function generateDescription(content, title) {
  // Take first meaningful paragraph
  const lines = content.split('\n').filter(l =>
    l.trim() &&
    !l.startsWith('#') &&
    !l.startsWith('>') &&
    !l.startsWith('*') &&
    !l.startsWith('-') &&
    l.length > 20
  );

  if (lines.length > 0) {
    let desc = lines[0].replace(/\*\*/g, '').replace(/\*/g, '').trim();
    if (desc.length > 155) {
      desc = desc.substring(0, 152) + '...';
    }
    return desc;
  }

  return `${title} - Guia completo em português para jogadores de Sorcery: Contested Realm.`;
}

/**
 * Extract tags from content
 */
function extractTags(content, category) {
  const tags = [];

  // Add category-based tags
  const categoryTags = {
    'primeiros-passos': ['iniciante', 'guia'],
    'regras-mecanicas': ['regras', 'mecanica'],
    'duvidas-cartas': ['ruling', 'cartas'],
    'decks-construcao': ['deck', 'construcao'],
    'limited': ['draft', 'sealed'],
    'meta-competitivo': ['meta', 'competitivo'],
    'sets-spoilers': ['sets', 'novidades'],
    'lore-arte': ['lore', 'arte'],
    'ferramentas': ['ferramentas', 'recursos'],
    'eventos': ['eventos', 'comunidade'],
    'geral': ['discussao'],
  };

  if (categoryTags[category]) {
    tags.push(...categoryTags[category]);
  }

  // Extract element mentions
  const elements = ['fire', 'water', 'earth', 'air'];
  const contentLower = content.toLowerCase();
  elements.forEach(el => {
    if (contentLower.includes(el)) {
      tags.push(el);
    }
  });

  // Detect keywords in content
  if (contentLower.includes('avatar')) tags.push('avatar');
  if (contentLower.includes('precon')) tags.push('precon');
  if (contentLower.includes('magic') || contentLower.includes('mtg')) tags.push('magic-comparison');
  if (contentLower.includes('combo')) tags.push('combo');
  if (contentLower.includes('draft')) tags.push('draft');

  // Return unique tags (max 6)
  return [...new Set(tags)].slice(0, 6);
}

/**
 * Parse a single post section
 */
function parsePost(section) {
  // Match the title line: ### **[TAG] Title**
  const titleMatch = section.match(/###\s+\*\*\[([^\]]+)\]\s+(.+?)\*\*/);
  if (!titleMatch) return null;

  const tag = titleMatch[1];
  const title = titleMatch[2].trim();

  // Extract references
  const refMatch = section.match(/>\s*\*\*Referências?:\*\*\s*(.+?)(?:\n\n|$)/s);
  const references = [];
  if (refMatch) {
    const refText = refMatch[1];
    const urlMatches = refText.matchAll(/\(https?:\/\/[^)]+\)/g);
    for (const match of urlMatches) {
      references.push(match[0].slice(1, -1)); // Remove parentheses
    }
  }

  // Get content (everything between title and references/end)
  let content = section
    .replace(/###\s+\*\*\[[^\]]+\]\s+.+?\*\*\n+/, '') // Remove title
    .replace(/>\s*\*\*Referências?:\*\*.+?$/s, '') // Remove references
    .trim();

  // Convert numbered questions to markdown headers
  content = content.replace(/\*\*(\d+)\.\s+(.+?)\*\*\n/g, '## $1. $2\n\n');

  // Convert **bold** patterns that look like Q&A
  content = content.replace(/\*\*([^*]+\?)\*\*\n/g, '## $1\n\n');

  return { tag, title, content, references };
}

/**
 * Check if a post is in the launch batch
 */
function isLaunchBatch(title) {
  const titleLower = title.toLowerCase();
  return LAUNCH_BATCH_TITLES.some(batch =>
    titleLower.includes(batch.toLowerCase())
  );
}

/**
 * Generate frontmatter for a post
 */
function generateFrontmatter(post) {
  const category = TAG_CATEGORY_MAP[post.tag] || 'geral';
  const type = TAG_TYPE_MAP[post.tag] || 'tecnico';
  const tags = extractTags(post.content, category);
  const description = generateDescription(post.content, post.title);

  let frontmatter = `---
title: "${post.title.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
pubDate: ${PUB_DATE}
category: "${category}"
type: "${type}"
tags: [${tags.map(t => `"${t}"`).join(', ')}]
author: "Equipe Sorcery Brasil"`;

  if (post.references.length > 0) {
    frontmatter += `\nreferences:`;
    post.references.forEach(ref => {
      frontmatter += `\n  - "${ref}"`;
    });
  }

  frontmatter += '\n---\n';
  return frontmatter;
}

/**
 * Main import function
 */
function importPosts(onlyLaunchBatch = true) {
  // Read source file
  const content = fs.readFileSync(SOURCE_FILE, 'utf-8');

  // Split by post separator (### **)
  const sections = content.split(/(?=###\s+\*\*\[)/);

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let imported = 0;
  let skipped = 0;

  for (const section of sections) {
    const post = parsePost(section);
    if (!post) continue;

    // Check if we should import this post
    if (onlyLaunchBatch && !isLaunchBatch(post.title)) {
      skipped++;
      continue;
    }

    // Generate slug and filename
    const slug = slugify(post.title);
    const filename = `${slug}.md`;
    const filepath = path.join(OUTPUT_DIR, filename);

    // Skip if file already exists
    if (fs.existsSync(filepath)) {
      console.log(`⏭️  Skipping (exists): ${filename}`);
      skipped++;
      continue;
    }

    // Generate file content
    const frontmatter = generateFrontmatter(post);
    const fileContent = frontmatter + '\n' + post.content;

    // Write file
    fs.writeFileSync(filepath, fileContent, 'utf-8');
    console.log(`✅ Created: ${filename}`);
    imported++;
  }

  console.log(`\n📊 Summary: ${imported} imported, ${skipped} skipped`);
}

// Parse CLI arguments
const args = process.argv.slice(2);
const importAll = args.includes('--all');
const launchBatchOnly = args.includes('--launch-batch') || !importAll;

console.log(`🚀 Importing posts (${launchBatchOnly ? 'Launch Batch only' : 'ALL posts'})...\n`);
importPosts(launchBatchOnly);
