/**
 * Hook para gerenciar o loop do jogo
 */

import { useEffect, useRef } from 'react';
import { useGame } from '@/contexts/GameContext';

export function useGameLoop() {
  const { gameState, updateGameState } = useGame();
  const lastUpdateRef = useRef(Date.now());

  useEffect(() => {
    const gameLoop = () => {
      const now = Date.now();
      const deltaTime = (now - lastUpdateRef.current) / 1000;
      lastUpdateRef.current = now;

      // Passive income
      if (gameState.passiveIncome > 0) {
        const earned = gameState.passiveIncome * deltaTime;
        updateGameState({
          gold: gameState.gold + earned,
          totalGoldEarned: gameState.totalGoldEarned + earned,
        });
      }

      // Dice bonus expiration
      if (gameState.bonusEndTime > 0 && now >= gameState.bonusEndTime) {
        updateGameState({
          diceBonus: 0,
          bonusEndTime: 0,
        });
      }

      // Roll cooldown
      if (gameState.rollCooldown > 0) {
        updateGameState({
          rollCooldown: Math.max(0, gameState.rollCooldown - deltaTime),
        });
      }

      requestAnimationFrame(gameLoop);
    };

    const frameId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(frameId);
  }, [gameState, updateGameState]);
}
