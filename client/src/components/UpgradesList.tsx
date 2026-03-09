/**
 * Componente para a lista de upgrades
 */

import { useGame } from '@/contexts/GameContext';
import { formatDecimal } from '@/utils/numberFormatter';
import UpgradeItem from './UpgradeItem';

export default function UpgradesList() {
  const { gameState, upgrades, buyUpgrade } = useGame();

  return (
    <div className="right-panel">
      <div className="store-header">
        <div className="store-title">🏪 Loja de Melhorias</div>
        <div className="total-per-second">
          ✨ Produzindo <span>{formatDecimal(gameState.passiveIncome)}</span> XP/s
        </div>
      </div>
      <div className="upgrades-list">
        {upgrades.map(upgrade => (
          <UpgradeItem
            key={upgrade.id}
            upgrade={upgrade}
            gold={gameState.gold}
            totalGoldEarned={gameState.totalGoldEarned}
            onBuy={buyUpgrade}
          />
        ))}
      </div>
    </div>
  );
}
