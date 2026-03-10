/**
 * Hook para gerenciar e verificar conquistas
 */

import { useEffect, useCallback } from 'react';
import { useGame } from '@/contexts/GameContext';

export function useAchievements() {
  const { gameState, achievements, updateAchievements } = useGame();

  const checkAchievements = useCallback(() => {
    let hasChanges = false;
    const updatedAchievements = achievements.map(achievement => {
      if (achievement.achieved) return achievement;

      let achieved = false;

      switch (achievement.id) {
        case 'first_click':
          achieved = gameState.totalClicks >= 1;
          break;
        case 'clicks_100':
          achieved = gameState.totalClicks >= 100;
          break;
        case 'clicks_1000':
          achieved = gameState.totalClicks >= 1000;
          break;
        case 'gold_1k':
          achieved = gameState.totalGoldEarned >= 1000;
          break;
        case 'gold_100k':
          achieved = gameState.totalGoldEarned >= 100000;
          break;
        case 'gold_1m':
          achieved = gameState.totalGoldEarned >= 1000000;
          break;
        case 'critical':
          achieved = gameState.criticalRolls >= 1;
          break;
        case 'critical_10':
          achieved = gameState.criticalRolls >= 10;
          break;
        case 'upgrades_5':
          achieved = gameState.totalUpgrades >= 5;
          break;
        case 'upgrades_50':
          achieved = gameState.totalUpgrades >= 50;
          break;
        case 'passive_100':
          achieved = gameState.passiveIncome >= 100;
          break;
        case 'click_power_100':
          achieved = gameState.clickPower >= 100;
          break;
      }

      if (achieved) {
        hasChanges = true;
        return { ...achievement, achieved: true };
      }
      return achievement;
    });

    if (hasChanges) {
      updateAchievements(updatedAchievements);
    }
  }, [gameState, achievements, updateAchievements]);

  useEffect(() => {
    checkAchievements();
  }, [gameState, checkAchievements]);

  const getUnachievedCount = useCallback(() => {
    return achievements.filter(a => !a.achieved).length;
  }, [achievements]);

  return { checkAchievements, getUnachievedCount };
}
