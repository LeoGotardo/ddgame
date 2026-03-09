/**
 * Componente para exibir XP/Gold do jogador
 */

import { useGame } from '@/contexts/GameContext';
import { formatNumber, formatDecimal } from '@/utils/numberFormatter';

export default function XPDisplay() {
  const { gameState } = useGame();

  return (
    <div className="xp-display">
      <div className="xp-label">Pontos de Experiência</div>
      <div className="xp-value">{formatNumber(gameState.gold)}</div>
      <div className="xp-per-second">
        ⚡ <span>{formatDecimal(gameState.passiveIncome)}</span> XP/s
      </div>
    </div>
  );
}
