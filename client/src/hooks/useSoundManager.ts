/**
 * Hook para gerenciar reprodução de sons
 */

import { useEffect, useRef } from 'react';
import { useGame } from '@/contexts/GameContext';
import { createSoundGenerator } from '@/utils/soundGenerator';

export function useSoundManager() {
  const { settings, customSounds } = useGame();
  const soundGeneratorRef = useRef(createSoundGenerator());

  const playSound = (type: 'click' | 'upgrade' | 'achievement') => {
    if (!settings.sounds) return;

    const customSound = customSounds[type];
    if (customSound) {
      soundGeneratorRef.current.playCustom(customSound);
    } else {
      if (type === 'click') soundGeneratorRef.current.playClick();
      else if (type === 'upgrade') soundGeneratorRef.current.playUpgrade();
      else if (type === 'achievement') soundGeneratorRef.current.playAchievement();
    }
  };

  return { playSound };
}
