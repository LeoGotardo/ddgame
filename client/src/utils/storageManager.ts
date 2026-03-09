/**
 * Gerenciamento de localStorage para persistência do jogo
 */

import type { SaveData, GameState, Settings } from '@/types/game';
import type { Upgrade } from '@/types/upgrade';
import type { Achievement } from '@/types/achievement';

const SAVE_KEY = 'dndClickerSave';

export function saveGame(
  gameState: GameState,
  upgrades: Upgrade[],
  achievements: Achievement[],
  settings: Settings
): boolean {
  try {
    const saveData: SaveData = {
      gold: gameState.gold,
      totalGoldEarned: gameState.totalGoldEarned,
      clickPower: gameState.clickPower,
      passiveIncome: gameState.passiveIncome,
      totalClicks: gameState.totalClicks,
      totalUpgrades: gameState.totalUpgrades,
      criticalRolls: gameState.criticalRolls,
      upgrades: upgrades.map(u => ({ id: u.id, count: u.count })),
      achievements: achievements.map(a => ({ id: a.id, achieved: a.achieved })),
      settings,
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
    return true;
  } catch (e) {
    console.error('Erro ao salvar:', e);
    return false;
  }
}

export function loadGame(): SaveData | null {
  try {
    const saveData = localStorage.getItem(SAVE_KEY);
    if (saveData) {
      return JSON.parse(saveData);
    }
    return null;
  } catch (e) {
    console.error('Erro ao carregar:', e);
    return null;
  }
}

export function deleteSave(): boolean {
  try {
    localStorage.removeItem(SAVE_KEY);
    return true;
  } catch (e) {
    console.error('Erro ao deletar save:', e);
    return false;
  }
}

export function hasSave(): boolean {
  return localStorage.getItem(SAVE_KEY) !== null;
}
