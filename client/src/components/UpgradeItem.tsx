/**
 * Componente para um item individual de upgrade
 */

import { useSoundManager } from '@/hooks/useSoundManager';
import { formatNumber } from '@/utils/numberFormatter';
import { calculateUpgradeCost, isUpgradeUnlocked } from '@/utils/gameCalculations';
import type { Upgrade } from '@/types/upgrade';

interface UpgradeItemProps {
  upgrade: Upgrade;
  gold: number;
  totalGoldEarned: number;
  onBuy: (upgrade: Upgrade) => void;
}

export default function UpgradeItem({
  upgrade,
  gold,
  totalGoldEarned,
  onBuy,
}: UpgradeItemProps) {
  const { playSound } = useSoundManager();
  const cost = calculateUpgradeCost(upgrade);
  const unlocked = isUpgradeUnlocked(upgrade, totalGoldEarned);
  const affordable = gold >= cost && unlocked;

  const handleClick = () => {
    if (affordable) {
      onBuy(upgrade);
      playSound('upgrade');
    }
  };

  const totalClick = upgrade.clickBonus * upgrade.count;
  const totalPassive = upgrade.passiveBonus * upgrade.count;

  return (
    <div
      className={`upgrade-item ${unlocked ? 'unlocked' : 'locked'} ${affordable ? 'affordable' : ''}`}
      onClick={handleClick}
    >
      <div className="upgrade-header">
        <div className="upgrade-icon">{upgrade.icon}</div>
        <div className="upgrade-info">
          <div className="upgrade-name">{upgrade.name}</div>
          <div className="upgrade-description">{upgrade.description}</div>
          {!unlocked && (
            <div className="unlock-requirement">
              🔒 Desbloqueado com {formatNumber(upgrade.unlockAt)} XP total
            </div>
          )}
        </div>
      </div>
      <div className="upgrade-stats">
        <div className="upgrade-cost">💰 {formatNumber(cost)} XP</div>
        <div className="upgrade-count">Quantidade: {upgrade.count}</div>
      </div>
      {unlocked && (totalClick > 0 || totalPassive > 0) && (
        <div className="upgrade-production">
          {totalClick > 0 && `⚔️ +${formatNumber(totalClick)} por clique`}
          {totalPassive > 0 && `⚡ +${formatNumber(totalPassive)} XP/s`}
        </div>
      )}
    </div>
  );
}
