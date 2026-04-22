import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Post types matching the editorial calendar
const postTypes = ['pilar', 'tecnico', 'cultura'] as const;

// Categories from the content plan
const categories = [
  'primeiros-passos',
  'regras-mecanicas',
  'duvidas-cartas',
  'decks-construcao',
  'limited',
  'meta-competitivo',
  'sets-spoilers',
  'lore-arte',
  'ferramentas',
  'eventos',
  'geral',
] as const;

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().max(160), // SEO meta description
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: z.optional(image()),
      category: z.enum(categories),
      type: z.enum(postTypes).default('tecnico'),
      tags: z.array(z.string()).default([]),
      author: z.string().default('Equipe Sorcery Brasil'),
      references: z.array(z.string()).optional(), // Reddit/source links
      draft: z.boolean().default(false),
    }),
});

// Pillar pages (static content)
const pillars = defineCollection({
  loader: glob({ base: './src/content/pillars', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      heroImage: z.optional(image()),
      order: z.number().default(0),
    }),
});

// Glossary entries
const glossary = defineCollection({
  loader: glob({ base: './src/content/glossary', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    term: z.string(),
    category: z.string(),
    aliases: z.array(z.string()).optional(),
  }),
});

export const collections = { blog, pillars, glossary };
