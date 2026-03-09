/**
 * Utilitários para cálculos do jogo
 */

import type { Upgrade } from '@/types/upgrade';

export function calculateUpgradeCost(upgrade: Upgrade): number {
  return Math.floor(upgrade.baseCost * Math.pow(1.15, upgrade.count));
}

export function isUpgradeUnlocked(upgrade: Upgrade, totalGoldEarned: number): boolean {
  return totalGoldEarned >= upgrade.unlockAt;
}

export function isUpgradeAffordable(upgrade: Upgrade, gold: number, totalGoldEarned: number): boolean {
  const cost = calculateUpgradeCost(upgrade);
  const unlocked = isUpgradeUnlocked(upgrade, totalGoldEarned);
  return gold >= cost && unlocked;
}

export function calculateDiceRollBonus(roll: number): {
  bonus: number;
  duration: number;
  message: string;
  className: string;
} {
  if (roll === 20) {
    return {
      bonus: 5,
      duration: 30000,
      message: '🌟 CRÍTICO! +500% XP! 🌟',
      className: 'critical',
    };
  } else if (roll >= 16) {
    return {
      bonus: 1,
      duration: 30000,
      message: '⚡ Excelente! +100% XP!',
      className: '',
    };
  } else if (roll >= 11) {
    return {
      bonus: 0.5,
      duration: 30000,
      message: '✨ Ótimo! +50% XP!',
      className: '',
    };
  } else if (roll >= 6) {
    return {
      bonus: 0.25,
      duration: 30000,
      message: '👍 Bom! +25% XP!',
      className: '',
    };
  } else {
    return {
      bonus: 0.1,
      duration: 30000,
      message: '🎲 +10% XP',
      className: '',
    };
  }
}

export function calculateTotalClickPower(clickPower: number, diceBonus: number): number {
  return Math.floor(clickPower * (1 + diceBonus));
}
