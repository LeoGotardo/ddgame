/**
 * Componente para os botões superiores (Achievements e Settings)
 */

import { useState } from 'react';
import { useAchievements } from '@/hooks/useAchievements';
import AchievementsModal from './AchievementsModal';
import SettingsModal from './SettingsModal';

export default function TopButtons() {
  const [showAchievements, setShowAchievements] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { getUnachievedCount } = useAchievements();

  const unachievedCount = getUnachievedCount();

  return (
    <>
      <div className="top-buttons">
        <button
          className="achievements-btn"
          onClick={() => setShowAchievements(true)}
        >
          🏆
          {unachievedCount > 0 && (
            <span className="notification-badge">{unachievedCount}</span>
          )}
        </button>
        <button
          className="settings-btn"
          onClick={() => setShowSettings(true)}
        >
          ⚙️
        </button>
      </div>

      {showAchievements && (
        <AchievementsModal onClose={() => setShowAchievements(false)} />
      )}
      {showSettings && (
        <SettingsModal onClose={() => setShowSettings(false)} />
      )}
    </>
  );
}
