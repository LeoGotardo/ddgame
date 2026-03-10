/**
 * Hook para gerenciar o loop do jogo
 */

import { useEffect, useRef } from 'react';
import { useGame } from '@/contexts/GameContext';

export function useGameLoop() {
  const { gameState, updateGameState } = useGame();
  const gameStateRef = useRef(gameState);
  const lastUpdateRef = useRef(Date.now());
  const frameIdRef = useRef<number>(0);

  // Sincroniza o ref com o estado atual a cada render
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    const gameLoop = () => {
      const now = Date.now();
      const deltaTime = (now - lastUpdateRef.current) / 1000;
      lastUpdateRef.current = now;

      const currentGameState = gameStateRef.current;
      const updates: any = {};
      let hasUpdates = false;

      // Passive income
      if (currentGameState.passiveIncome > 0) {
        const earned = currentGameState.passiveIncome * deltaTime;
        updates.gold = currentGameState.gold + earned;
        updates.totalGoldEarned = currentGameState.totalGoldEarned + earned;
        hasUpdates = true;
      }

      // Dice bonus expiration
      if (currentGameState.bonusEndTime > 0 && now >= currentGameState.bonusEndTime) {
        updates.diceBonus = 0;
        updates.bonusEndTime = 0;
        hasUpdates = true;
      }

      // Roll cooldown
      if (currentGameState.rollCooldown > 0) {
        updates.rollCooldown = Math.max(0, currentGameState.rollCooldown - deltaTime);
        hasUpdates = true;
      }

      if (hasUpdates) {
        updateGameState(updates);
      }

      frameIdRef.current = requestAnimationFrame(gameLoop);
    };

    frameIdRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
    };
  }, [updateGameState]);
}
