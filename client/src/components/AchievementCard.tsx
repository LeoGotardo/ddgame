/**
 * Componente para um card de conquista
 */

import type { Achievement } from '@/types/achievement';

interface AchievementCardProps {
  achievement: Achievement;
}

export default function AchievementCard({ achievement }: AchievementCardProps) {
  const progress = achievement.progress();
  const progressPercent = achievement.max > 0 ? Math.min((progress / achievement.max) * 100, 100) : 0;

  return (
    <div className={`achievement-card ${achievement.achieved ? 'achieved' : 'locked'}`}>
      <div className="achievement-icon">{achievement.icon}</div>
      <div className="achievement-name">{achievement.name}</div>
      <div className="achievement-desc">{achievement.desc}</div>
      <div className="achievement-progress">
        <div
          className="achievement-progress-bar"
          style={{ width: `${progressPercent}%` }}
        >
          {progressPercent > 10 && `${Math.floor(progressPercent)}%`}
        </div>
      </div>
    </div>
  );
}
