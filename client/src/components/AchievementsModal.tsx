/**
 * Modal para exibir conquistas
 */

import { useGame } from '@/contexts/GameContext';
import AchievementCard from './AchievementCard';

interface AchievementsModalProps {
  onClose: () => void;
}

export default function AchievementsModal({ onClose }: AchievementsModalProps) {
  const { achievements } = useGame();

  return (
    <div className="modal active" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">🏆 Conquistas</div>
        <div className="achievement-grid">
          {achievements.map(achievement => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
        <button className="close-modal" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}
