/**
 * Tipos para sistema de conquistas
 */

export interface Achievement {
  id: string;
  icon: string;
  name: string;
  desc: string;
  achieved: boolean;
  check: () => boolean;
  progress: () => number;
  max: number;
}

export interface AchievementNotification {
  id: string;
  icon: string;
  title: string;
  message: string;
}

export const ACHIEVEMENTS_DATA: Array<Omit<Achievement, 'achieved'>> = [
  {
    id: 'first_click',
    icon: '👆',
    name: 'Primeiro Passo',
    desc: 'Faça seu primeiro clique',
    check: () => false,
    progress: () => 0,
    max: 1,
  },
  {
    id: 'clicks_100',
    icon: '⚔️',
    name: 'Aventureiro',
    desc: 'Faça 100 cliques',
    check: () => false,
    progress: () => 0,
    max: 100,
  },
  {
    id: 'clicks_1000',
    icon: '🗡️',
    name: 'Veterano',
    desc: 'Faça 1000 cliques',
    check: () => false,
    progress: () => 0,
    max: 1000,
  },
  {
    id: 'gold_1k',
    icon: '💰',
    name: 'Rico',
    desc: 'Acumule 1.000 XP',
    check: () => false,
    progress: () => 0,
    max: 1000,
  },
  {
    id: 'gold_100k',
    icon: '💎',
    name: 'Magnata',
    desc: 'Acumule 100.000 XP',
    check: () => false,
    progress: () => 0,
    max: 100000,
  },
  {
    id: 'gold_1m',
    icon: '👑',
    name: 'Lendário',
    desc: 'Acumule 1.000.000 XP',
    check: () => false,
    progress: () => 0,
    max: 1000000,
  },
  {
    id: 'critical',
    icon: '🎲',
    name: 'Sorte Crítica',
    desc: 'Role um 20 no D20',
    check: () => false,
    progress: () => 0,
    max: 1,
  },
  {
    id: 'critical_10',
    icon: '🍀',
    name: 'Abençoado',
    desc: 'Role 10 críticos no D20',
    check: () => false,
    progress: () => 0,
    max: 10,
  },
  {
    id: 'upgrades_5',
    icon: '🛒',
    name: 'Colecionador',
    desc: 'Compre 5 upgrades',
    check: () => false,
    progress: () => 0,
    max: 5,
  },
  {
    id: 'upgrades_50',
    icon: '🏰',
    name: 'Construtor de Império',
    desc: 'Compre 50 upgrades',
    check: () => false,
    progress: () => 0,
    max: 50,
  },
  {
    id: 'passive_100',
    icon: '⚡',
    name: 'Automação',
    desc: 'Atinja 100 XP/s passivo',
    check: () => false,
    progress: () => 0,
    max: 100,
  },
  {
    id: 'click_power_100',
    icon: '💪',
    name: 'Força Suprema',
    desc: 'Atinja 100 XP por clique',
    check: () => false,
    progress: () => 0,
    max: 100,
  },
];
