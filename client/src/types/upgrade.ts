/**
 * Tipos para sistema de upgrades
 */

export interface Upgrade {
  id: string;
  name: string;
  icon: string;
  description: string;
  baseCost: number;
  count: number;
  clickBonus: number;
  passiveBonus: number;
  unlockAt: number;
}

export interface UpgradeItemProps {
  upgrade: Upgrade;
  cost: number;
  unlocked: boolean;
  affordable: boolean;
  onBuy: (upgrade: Upgrade) => void;
}

export const UPGRADES_DATA: Upgrade[] = [
  {
    id: 'sword',
    name: 'Espada Curta',
    icon: '🗡️',
    description: 'Uma espada básica para iniciantes',
    baseCost: 15,
    count: 0,
    clickBonus: 1,
    passiveBonus: 0,
    unlockAt: 0,
  },
  {
    id: 'apprentice',
    name: 'Aprendiz de Mago',
    icon: '🧙‍♂️',
    description: 'Gera XP automaticamente enquanto você aventura',
    baseCost: 100,
    count: 0,
    clickBonus: 0,
    passiveBonus: 1,
    unlockAt: 50,
  },
  {
    id: 'longsword',
    name: 'Espada Longa',
    icon: '⚔️',
    description: 'Uma arma mais poderosa para guerreiros experientes',
    baseCost: 500,
    count: 0,
    clickBonus: 5,
    passiveBonus: 0,
    unlockAt: 250,
  },
  {
    id: 'archer',
    name: 'Arqueiro Élfico',
    icon: '🏹',
    description: 'Ataca inimigos à distância constantemente',
    baseCost: 1200,
    count: 0,
    clickBonus: 0,
    passiveBonus: 5,
    unlockAt: 800,
  },
  {
    id: 'cleric',
    name: 'Clérigo Devoto',
    icon: '⚕️',
    description: 'Cura e abençoa a party continuamente',
    baseCost: 3000,
    count: 0,
    clickBonus: 0,
    passiveBonus: 12,
    unlockAt: 2000,
  },
  {
    id: 'paladin',
    name: 'Paladino Sagrado',
    icon: '🛡️',
    description: 'Defende o grupo com poder divino',
    baseCost: 7500,
    count: 0,
    clickBonus: 0,
    passiveBonus: 30,
    unlockAt: 5000,
  },
  {
    id: 'staff',
    name: 'Cajado Místico',
    icon: '🔮',
    description: 'Amplifica tremendamente seu poder mágico',
    baseCost: 15000,
    count: 0,
    clickBonus: 50,
    passiveBonus: 0,
    unlockAt: 10000,
  },
  {
    id: 'wizard',
    name: 'Arquimago Sábio',
    icon: '🧙',
    description: 'Mestre das artes arcanas',
    baseCost: 30000,
    count: 0,
    clickBonus: 0,
    passiveBonus: 80,
    unlockAt: 20000,
  },
  {
    id: 'dragon',
    name: 'Dragão Ancestral',
    icon: '🐉',
    description: 'Um dragão lendário empresta seu poder',
    baseCost: 75000,
    count: 0,
    clickBonus: 0,
    passiveBonus: 200,
    unlockAt: 50000,
  },
  {
    id: 'artifact',
    name: 'Artefato Lendário',
    icon: '👑',
    description: 'Um item de poder incomensurável',
    baseCost: 150000,
    count: 0,
    clickBonus: 250,
    passiveBonus: 0,
    unlockAt: 100000,
  },
  {
    id: 'lich',
    name: 'Lich Ancestral',
    icon: '💀',
    description: 'Um mago imortal que comanda legiões',
    baseCost: 300000,
    count: 0,
    clickBonus: 0,
    passiveBonus: 500,
    unlockAt: 200000,
  },
  {
    id: 'deity',
    name: 'Avatar Divino',
    icon: '✨',
    description: 'O poder dos próprios deuses',
    baseCost: 1000000,
    count: 0,
    clickBonus: 1000,
    passiveBonus: 1000,
    unlockAt: 500000,
  },
];
