// Sorcery Brasil - Portal constants

export const SITE_TITLE = 'Sorcery Brasil';
export const SITE_DESCRIPTION = 'O portal brasileiro de Sorcery: Contested Realm. Guias, regras, decks e estratégias em português.';

export const NAVIGATION = [
  { name: 'Início', href: '/' },
  { name: 'Começar', href: '/comecar' },
  { name: 'Decks', href: '/decks' },
  { name: 'Regras', href: '/regras' },
  { name: 'Glossário', href: '/glossario' },
  { name: 'Sets', href: '/sets' },
  { name: 'Blog', href: '/blog' },
];

export const SOCIAL_LINKS = {
  discord: 'https://discord.gg/qvYVGFAS5n',
  reddit: 'https://reddit.com/r/SorceryTCG',
  curiosa: 'https://curiosa.io',
  tcgplayer: 'https://www.tcgplayer.com/search/sorcery-contested-realm',
};

export const CATEGORIES = {
  'primeiros-passos': { name: 'Primeiros Passos', icon: '🎓', description: 'Guias para iniciantes' },
  'regras-mecanicas': { name: 'Regras & Mecânicas', icon: '📜', description: 'Entenda o jogo em profundidade' },
  'duvidas-cartas': { name: 'Dúvidas sobre Cartas', icon: '❓', description: 'Rulings e interações' },
  'decks-construcao': { name: 'Decks & Construção', icon: '🃏', description: 'Deckbuilding e listas' },
  'limited': { name: 'Limited', icon: '📦', description: 'Draft e Sealed' },
  'meta-competitivo': { name: 'Meta & Competitivo', icon: '🏆', description: 'Torneios e meta atual' },
  'sets-spoilers': { name: 'Sets & Spoilers', icon: '✨', description: 'Novos sets e cards' },
  'lore-arte': { name: 'Lore & Arte', icon: '🎨', description: 'Histórias e artistas' },
  'ferramentas': { name: 'Ferramentas', icon: '🛠️', description: 'Apps e recursos úteis' },
  'eventos': { name: 'Eventos', icon: '📅', description: 'Torneios e encontros' },
  'geral': { name: 'Geral', icon: '💬', description: 'Discussões gerais' },
} as const;
