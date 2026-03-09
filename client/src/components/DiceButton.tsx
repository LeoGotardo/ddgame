/**
 * Componente do botão principal de clique (dado)
 */

import { useGame } from '@/contexts/GameContext';
import { useSoundManager } from '@/hooks/useSoundManager';
import { formatNumber } from '@/utils/numberFormatter';
import { useState } from 'react';

export default function DiceButton() {
  const { gameState, handleClick } = useGame();
  const { playSound } = useSoundManager();
  const [clickEffects, setClickEffects] = useState<Array<{ id: string; value: number; x: number; y: number }>>([]);

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const totalPower = Math.floor(gameState.clickPower * (1 + gameState.diceBonus));
    
    handleClick();
    playSound('click');

    // Create click effect
    if (gameState.clickPower > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const id = Math.random().toString();
      const effect = {
        id,
        value: totalPower,
        x: rect.left + rect.width / 2 + (Math.random() - 0.5) * 100,
        y: rect.top + rect.height / 2 + (Math.random() - 0.5) * 100,
      };
      
      setClickEffects(prev => [...prev, effect]);
      
      setTimeout(() => {
        setClickEffects(prev => prev.filter(e => e.id !== id));
      }, 1200);
    }
  };

  return (
    <div className="dice-container">
      <button className="dice-button" onClick={onClickHandler}>
        🎲
      </button>
      <div className="per-click">⚔️ <span>{formatNumber(gameState.clickPower)}</span> por clique</div>
      
      {/* Click Effects */}
      {clickEffects.map(effect => (
        <div
          key={effect.id}
          className="click-effect"
          style={{
            left: effect.x + 'px',
            top: effect.y + 'px',
          }}
        >
          +{formatNumber(effect.value)}
        </div>
      ))}
    </div>
  );
}
