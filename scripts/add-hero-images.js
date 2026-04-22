#!/usr/bin/env node
/**
 * Add hero images to blog posts
 */

import fs from 'fs';
import path from 'path';

const BLOG_DIR = '/Users/pedro/sorcery.com.br/src/content/blog';

// Map post slugs to images (based on content relevance)
const POST_IMAGE_MAP = {
  'vim-do-magic-o-que-muda-o-guia-completo': 'WizardsDen.png',
  'acabei-de-descobrir-o-jogo-o-que-compro': 'RusticVillage.png',
  '8-duvidas-que-todo-jogador-novo-tem-no-primeiro-fim-de-seman': 'DonnybrookInn.jpg',
  'os-avatares-mais-amigaveis-para-quem-esta-comecando': 'Geomancer-Press Kit.png',
  'movimentacao-no-grid-o-ponto-que-mais-trava-quem-vem-de-magi': 'Battlefield.jpg',
  'threshold-vs-mana-a-diferenca-que-todo-novato-confunde': 'MaelstromFullArt (1).jpg',
  'avatar-so-morre-por-dano-direto-atacar-site-nao-finaliza-o-j': 'ScreamingSkull.jpg',
  'todas-as-keywords-do-jogo-em-uma-pagina': 'Camelot.png',
  'anatomia-de-uma-carta-sorcery-o-que-cada-elemento-significa': 'SirPelleas.png',
  'a-primeira-regra-de-sorcery-e-seja-legal': 'DonnybrookInn.jpg',
  'os-quatro-elementos-do-realm-uma-introducao': 'Invasion.png',
  'o-crescimento-explosivo-do-jogo-em-2025': 'SirPerceval.png',
  'deckbuilding-em-sorcery-os-fundamentos-que-voce-precisa-sabe': 'Witch.png',
  'druid-o-avatar-dominante-do-meta': 'CoyNixie.png',
  'os-nomes-dos-pares-de-elementos-convencao-da-comunidade': 'RiverOfFlame.jpg',
  'precons-do-beta-o-que-cada-deck-elemental-ensina': 'Flamecaller-Press Kit.png',
  'as-ferramentas-que-todo-jogador-de-sorcery-usa': 'LoneTower.jpg',
  'como-jogar-sorcery-sem-ninguem-por-perto': 'RemoteDesert.jpg',
  'dust-rewards-o-programa-de-recompensas-explicado': 'MaskOfMayhemFullArt.jpg',
  'smoke-and-ash-o-druid-airfire-que-venceu-um-crossroads': 'Sparkmage-Press Kit.png',
  // Duplicate/old post
  '8-duvidas-jogador-novo': 'DonnybrookInn.jpg',
};

function addHeroImage(filePath, imageName) {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Check if already has heroImage
  if (content.includes('heroImage:')) {
    console.log(`⏭️  Skipping (has image): ${path.basename(filePath)}`);
    return false;
  }

  // Add heroImage after pubDate line
  const updated = content.replace(
    /(pubDate:\s*[\d-]+)\n/,
    `$1\nheroImage: "../../assets/posts/${imageName}"\n`
  );

  if (updated === content) {
    console.log(`⚠️  Could not update: ${path.basename(filePath)}`);
    return false;
  }

  fs.writeFileSync(filePath, updated, 'utf-8');
  console.log(`✅ Added image to: ${path.basename(filePath)}`);
  return true;
}

// Process all posts
const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));
let updated = 0;

for (const file of files) {
  const slug = file.replace('.md', '');
  const imageName = POST_IMAGE_MAP[slug];

  if (imageName) {
    const filePath = path.join(BLOG_DIR, file);
    if (addHeroImage(filePath, imageName)) {
      updated++;
    }
  } else {
    console.log(`❓ No image mapped for: ${file}`);
  }
}

console.log(`\n📊 Summary: ${updated} posts updated with hero images`);
