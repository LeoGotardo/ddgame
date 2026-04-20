/**
 * Tipos principais do jogo D&D Adventure Clicker
 */

export interface GameState {
  gold: number;
  totalGoldEarned: number;
  clickPower: number;
  passiveIncome: number;
  diceBonus: number;
  bonusEndTime: number;
  rollCooldown: number;
  totalClicks: number;
  totalUpgrades: number;
  criticalRolls: number;
}

export interface Settings {
  particles: boolean;
  clickEffects: boolean;
  achievementNotifications: boolean;
  autosave: boolean;
  sounds: boolean;
}

export interface CustomSounds {
  click: string | null;
  upgrade: string | null;
  achievement: string | null;
}

export interface SaveData {
  gold: number;
  totalGoldEarned: number;
  clickPower: number;
  passiveIncome: number;
  totalClicks: number;
  totalUpgrades: number;
  criticalRolls: number;
  upgrades: Array<{ id: string; count: number }>;
  achievements: Array<{ id: string; achieved: boolean }>;
  settings: Settings;
}

export interface DiceRollResult {
  roll: number;
  bonus: number;
  duration: number;
  message: string;
  className: string;
}

export interface ClickEffectData {
  value: number;
  x: number;
  y: number;
}
