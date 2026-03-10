/**
 * Contexto global do jogo
 */

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { GameState, Settings, CustomSounds } from '@/types/game';
import type { Upgrade } from '@/types/upgrade';
import type { Achievement } from '@/types/achievement';
import { UPGRADES_DATA } from '@/types/upgrade';
import { ACHIEVEMENTS_DATA } from '@/types/achievement';
import { saveGame, loadGame, deleteSave } from '@/utils/storageManager';
import { calculateDiceRollBonus } from '@/utils/gameCalculations';

interface GameContextType {
  // Game State
  gameState: GameState;
  upgrades: Upgrade[];
  achievements: Achievement[];
  settings: Settings;
  customSounds: CustomSounds;

  // Game Actions
  handleClick: () => void;
  rollDice: () => { roll: number; bonusData: any };
  buyUpgrade: (upgrade: Upgrade) => void;
  toggleSetting: (key: keyof Settings) => void;
  uploadSound: (type: 'click' | 'upgrade' | 'achievement', file: File) => void;
  removeSound: (type: 'click' | 'upgrade' | 'achievement') => void;
  saveGameData: () => void;
  loadGameData: () => void;
  resetGameData: () => void;

  // Utility
  updateGameState: (updates: Partial<GameState>) => void;
  updateUpgrades: (upgrades: Upgrade[]) => void;
  updateAchievements: (achievements: Achievement[]) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [gameState, setGameState] = useState<GameState>({
    gold: 0,
    totalGoldEarned: 0,
    clickPower: 1,
    passiveIncome: 0,
    diceBonus: 0,
    bonusEndTime: 0,
    rollCooldown: 0,
    totalClicks: 0,
    totalUpgrades: 0,
    criticalRolls: 0,
  });

  const [upgrades, setUpgrades] = useState<Upgrade[]>(
    UPGRADES_DATA.map(u => ({ ...u }))
  );

  const [achievements, setAchievements] = useState<Achievement[]>(
    ACHIEVEMENTS_DATA.map(a => ({ ...a, achieved: false }))
  );

  const [settings, setSettings] = useState<Settings>({
    particles: true,
    clickEffects: true,
    achievementNotifications: true,
    autosave: true,
    sounds: true,
  });

  const [customSounds, setCustomSounds] = useState<CustomSounds>({
    click: null,
    upgrade: null,
    achievement: null,
  });

  const updateGameState = useCallback((updates: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...updates }));
  }, []);

  const updateUpgrades = useCallback((newUpgrades: Upgrade[]) => {
    setUpgrades(newUpgrades);
  }, []);

  const updateAchievements = useCallback((newAchievements: Achievement[]) => {
    setAchievements(newAchievements);
  }, []);

  const handleClick = useCallback(() => {
    const totalPower = Math.floor(gameState.clickPower * (1 + gameState.diceBonus));
    updateGameState({
      gold: gameState.gold + totalPower,
      totalGoldEarned: gameState.totalGoldEarned + totalPower,
      totalClicks: gameState.totalClicks + 1,
    });
  }, [gameState.clickPower, gameState.diceBonus, gameState.gold, gameState.totalGoldEarned, gameState.totalClicks, updateGameState]);

  const rollDice = useCallback(() => {
    if (gameState.rollCooldown > 0) return { roll: 0, bonusData: null };

    const roll = Math.floor(Math.random() * 20) + 1;
    const bonusData = calculateDiceRollBonus(roll);

    const updates: Partial<GameState> = {
      diceBonus: bonusData.bonus,
      bonusEndTime: Date.now() + bonusData.duration,
      rollCooldown: 60,
    };

    if (roll === 20) {
      updates.criticalRolls = gameState.criticalRolls + 1;
    }

    updateGameState(updates);
    return { roll, bonusData };
  }, [gameState.rollCooldown, gameState.criticalRolls, updateGameState]);

  const buyUpgrade = useCallback((upgrade: Upgrade) => {
    const cost = Math.floor(upgrade.baseCost * Math.pow(1.15, upgrade.count));
    if (gameState.gold >= cost) {
      updateGameState({
        gold: gameState.gold - cost,
        clickPower: gameState.clickPower + upgrade.clickBonus,
        passiveIncome: gameState.passiveIncome + upgrade.passiveBonus,
        totalUpgrades: gameState.totalUpgrades + 1,
      });

      const updatedUpgrades = upgrades.map(u =>
        u.id === upgrade.id ? { ...u, count: u.count + 1 } : u
      );
      updateUpgrades(updatedUpgrades);
    }
  }, [gameState.gold, gameState.clickPower, gameState.passiveIncome, gameState.totalUpgrades, upgrades, updateGameState, updateUpgrades]);

  const toggleSetting = useCallback((key: keyof Settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const uploadSound = useCallback((type: 'click' | 'upgrade' | 'achievement', file: File) => {
    const reader = new FileReader();
    reader.onload = function(e) {
      const audio = new Audio(e.target?.result as string);
      setCustomSounds(prev => ({ ...prev, [type]: audio }));
    };
    reader.readAsDataURL(file);
  }, []);

  const removeSound = useCallback((type: 'click' | 'upgrade' | 'achievement') => {
    setCustomSounds(prev => ({ ...prev, [type]: null }));
  }, []);

  const saveGameData = useCallback(() => {
    saveGame(gameState, upgrades, achievements, settings);
  }, [gameState, upgrades, achievements, settings]);

  const loadGameData = useCallback(() => {
    const data = loadGame();
    if (data) {
      setGameState({
        gold: data.gold || 0,
        totalGoldEarned: data.totalGoldEarned || 0,
        clickPower: data.clickPower || 1,
        passiveIncome: data.passiveIncome || 0,
        diceBonus: 0,
        bonusEndTime: 0,
        rollCooldown: 0,
        totalClicks: data.totalClicks || 0,
        totalUpgrades: data.totalUpgrades || 0,
        criticalRolls: data.criticalRolls || 0,
      });

      if (data.upgrades) {
        const updatedUpgrades = upgrades.map(upgrade => {
          const savedUpgrade = data.upgrades.find(u => u.id === upgrade.id);
          return savedUpgrade ? { ...upgrade, count: savedUpgrade.count } : upgrade;
        });
        setUpgrades(updatedUpgrades);
      }

      if (data.achievements) {
        const updatedAchievements = achievements.map(ach => {
          const savedAch = data.achievements.find(a => a.id === ach.id);
          return savedAch ? { ...ach, achieved: savedAch.achieved } : ach;
        });
        setAchievements(updatedAchievements);
      }

      if (data.settings) {
        setSettings(data.settings);
      }
    }
  }, [upgrades, achievements]);

  const resetGameData = useCallback(() => {
    if (confirm('Tem certeza que deseja resetar todo o progresso?')) {
      deleteSave();
      setGameState({
        gold: 0,
        totalGoldEarned: 0,
        clickPower: 1,
        passiveIncome: 0,
        diceBonus: 0,
        bonusEndTime: 0,
        rollCooldown: 0,
        totalClicks: 0,
        totalUpgrades: 0,
        criticalRolls: 0,
      });
      setUpgrades(UPGRADES_DATA.map(u => ({ ...u })));
      setAchievements(ACHIEVEMENTS_DATA.map(a => ({ ...a, achieved: false })));
      setSettings({
        particles: true,
        clickEffects: true,
        achievementNotifications: true,
        autosave: true,
        sounds: true,
      });
    }
  }, []);

  // Load game on mount
  useEffect(() => {
    loadGameData();
  }, []);

  // Auto-save
  useEffect(() => {
    const interval = setInterval(() => {
      if (settings.autosave) {
        saveGameData();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [settings.autosave, saveGameData]);

  const value: GameContextType = {
    gameState,
    upgrades,
    achievements,
    settings,
    customSounds,
    handleClick,
    rollDice,
    buyUpgrade,
    toggleSetting,
    uploadSound,
    removeSound,
    saveGameData,
    loadGameData,
    resetGameData,
    updateGameState,
    updateUpgrades,
    updateAchievements,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame(): GameContextType {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame deve ser usado dentro de GameProvider');
  }
  return context;
}
