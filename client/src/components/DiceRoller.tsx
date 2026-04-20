import { useGame } from '@/contexts/GameContext';
import { useSoundManager } from '@/hooks/useSoundManager';
import { useState, useEffect } from 'react';

export default function DiceRoller() {
  const { gameState, rollDice } = useGame();
  const { playSound } = useSoundManager();
  const [diceResult, setDiceResult] = useState<number | null>(null);
  const [rollMessage, setRollMessage] = useState('');
  const [isRolling, setIsRolling] = useState(false);
  const [diceClassName, setDiceClassName] = useState('');

  const onRollClick = () => {
    if (gameState.rollCooldown > 0) return;

    setIsRolling(true);

    setTimeout(() => {
      setIsRolling(false);
      const result = rollDice();
      if (!result) return;

      setDiceResult(result.roll);
      setDiceClassName(result.className);
      setRollMessage(`${result.message} — Bônus ativo por 30 segundos!`);

      if (result.roll === 20) {
        playSound('achievement');
      } else {
        playSound('upgrade');
      }
    }, 600);
  };

  useEffect(() => {
    if (gameState.bonusEndTime > 0 && Date.now() >= gameState.bonusEndTime) {
      setDiceResult(null);
      setRollMessage('');
      setDiceClassName('');
    }
  }, [gameState.bonusEndTime]);

  return (
    <div className="bonus-section">
      <div className="bonus-title">🎲 Dado de Bônus (D20)</div>
      <div className={`dice-result ${diceClassName} ${isRolling ? 'rolling' : ''}`}>
        {diceResult ?? '?'}
      </div>
      <button
        className="roll-button"
        onClick={onRollClick}
        disabled={gameState.rollCooldown > 0}
      >
        {gameState.rollCooldown > 0
          ? `Aguarde ${Math.ceil(gameState.rollCooldown)}s`
          : 'Rolar D20'}
      </button>
      <div className="roll-info">
        {rollMessage ? (
          <span>{rollMessage}</span>
        ) : (
          <span>
            Role para ganhar bônus temporário!<br />
            1-5: +10% | 6-10: +25% | 11-15: +50%<br />
            16-19: +100% | 20: <span style={{ color: '#ffd700' }}>⭐ CRÍTICO +500% ⭐</span>
          </span>
        )}
      </div>
    </div>
  );
}
