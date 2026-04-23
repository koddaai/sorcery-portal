---
title: "realms.cards — o simulador online 3D gratuito para jogar Sorcery"
description: "Plataforma web gratuita com tabuleiro 3D, tutorial integrado, IA para treinar e torneios Swiss. Funciona no celular."
pubDate: 2026-04-22
heroImage: "../../assets/posts/Battlefield.jpg"
category: "ferramentas"
type: "pilar"
tags: ["ferramenta", "online", "simulador", "iniciante", "torneio"]
author: "Equipe Sorcery Brasil"
sortOrder: 5
references:
  - "https://realms.cards/"
  - "https://reddit.com/r/SorceryTCG/comments/1po046d"
  - "https://github.com/realms-cards/contested-realms"
  - "https://patreon.com/realmscards"
---

**realms.cards** é a plataforma web gratuita mais completa para jogar Sorcery TCG online. Funciona no navegador com **tabuleiro 3D interativo**, traz **tutorial integrado**, **adversários controlados por IA**, e suporta torneios completos — tudo sem pagar nada, sem conta Steam, sem download.

> **TL;DR**: Grátis, roda no navegador (desktop e mobile), tem tutorial pra aprender, tem IA pra treinar sozinho, 100% open source, e suporta desde casual até torneios Swiss.

---

## Quem criou e por quê

Projeto fan-made desenvolvido pelo usuário **Heavy_Bluebird_9692** (Reddit), sob o handle oficial **"kingofthe"**.

Inspiração declarada: **Jinteki.net**, o simulador clássico de Netrunner — projeto fan-made que virou referência e mantido por anos pela comunidade.

Em 2025 entrou em **open beta**; em meados do ano foi **100% open-sourced** no GitHub, com licença **GPL-3.0** (qualquer um pode copiar, modificar, inclusive hospedar uma instância privada pra LGS ou comunidade regional).

---

## O que tem no realms.cards

### Modos de jogo disponíveis

| Modo | Descrição |
|---|---|
| **Constructed** | Formato oficial do jogo (Spellbook 50 / Atlas 30 / Collection 10) |
| **Sealed** | Pool gerado dinamicamente do set escolhido |
| **Draft** | Booster draft online com rotação de packs |
| **Cube Draft** | Monte um cube customizado, players draftam dele |
| **Hotseat (solo)** | Jogue contra você mesmo — ideal pra aprender |
| **vs. IA (CPU)** | Adversários controlados por IA com dificuldade configurável |

### Tabuleiro 3D interativo

O tabuleiro é renderizado em **3D** usando React Three Fiber + Three.js:
- Veja unidades em **camadas** (underground, surface, airborne) de forma visual
- Acompanhe **line of sight** sem calcular mentalmente
- Experiência **imersiva**, próxima do jogo físico

### Tutorial interativo nativo

Tutorial **embutido** que ensina:
- Mecânicas básicas (invocar, mover, atacar)
- Threshold vs. mana
- Combate, intercept, stealth
- Uso de sites e threshold

### Adversários controlados por IA

Treine **sem precisar de oponente humano**:
- Dificuldade configurável
- Novatos internalizam regras sem pressão
- Teste builds novas antes de enfrentar humanos

### Torneios integrados com Swiss-pairing

A plataforma organiza **torneios completos**:
- Swiss pairing automático
- Standings em tempo real
- Replays de cada partida
- Leaderboard global permanente

### Suporte mobile otimizado

Funciona bem em **celular e tablet** — raro em simuladores de TCG.

---

## Comparativo com alternativas

| Característica | realms.cards | TTS | spells.bar |
|---|---|---|---|
| **Custo** | Grátis | ~$20 USD | Grátis |
| **Plataforma** | Browser (desktop + mobile) | Steam | Browser |
| **Tutorial interativo** | ✅ Sim | ❌ Não | ❌ Não |
| **IA / vs CPU** | ✅ Sim | ❌ Não | ❌ Não |
| **Torneios Swiss** | ✅ Embutido | ⚠️ Manual | ❌ Não |
| **Replays** | ✅ Sim | ❌ Não | ❌ Não |
| **Mobile** | ✅ Otimizado | ❌ Não | ⚠️ Parcial |
| **Open source** | ✅ GPL-3.0 | ❌ Não | ❌ Não |

**Veredicto prático:**
- **Iniciante**: realms.cards sem discussão — tutorial + IA resolvem a barreira de "aprender"
- **Competitivo**: Sorcery League oficial ainda usa TTS, mas realms.cards fecha essa lacuna rápido
- **Casual com amigos**: realms.cards pela facilidade de entrada

---

## Como começar

### Semana 1 — Orientação
1. Acesse **realms.cards** no navegador
2. Faça login via **Discord OAuth**
3. Complete o **tutorial interativo** (30-60min)

### Semana 2 — Solo
4. Jogue **3-5 partidas contra IA**, começando na dificuldade fácil
5. Use o **deck editor** pra montar sua primeira lista

### Semana 3 — Social
6. Entre no **Discord oficial** do realms.cards
7. Quando sentir pronto, **entre na queue** pra jogar online

---

## Apoie o projeto

O criador opera o realms.cards **no vermelho financeiramente**. Para manter os servidores:

- **Patreon**: [patreon.com/realmscards](https://patreon.com/realmscards)
- **Contribuir código** no GitHub
- **Feedback ativo** — bugs, UX, features
- **Divulgar** — cada novo usuário ajuda

Projetos fan-made dessa qualidade são **raros e frágeis**. Se o seu grupo BR adotar a ferramenta, considere retribuir.

---

## Links úteis

- **Site oficial**: [realms.cards](https://realms.cards/)
- **GitHub**: [github.com/realms-cards/contested-realms](https://github.com/realms-cards/contested-realms)
- **Patreon**: [patreon.com/realmscards](https://patreon.com/realmscards)
- **Contato**: kingofthe@realms.cards

---

*Se você é jogador de Sorcery no Brasil que acabou de descobrir o jogo e não tem onde jogar: **realms.cards é o seu ponto de partida em 2026.***
