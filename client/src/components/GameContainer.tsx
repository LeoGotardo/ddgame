/**
 * Container principal do jogo
 */

import { GameProvider } from '@/contexts/GameContext';
import { useGameLoop } from '@/hooks/useGameLoop';
import { useAchievements } from '@/hooks/useAchievements';
import ParticleBackground from './ParticleBackground';
import TopButtons from './TopButtons';
import LeftPanel from './LeftPanel';
import UpgradesList from './UpgradesList';

function GameContent() {
  useGameLoop();
  useAchievements();

  return (
    <>
      <ParticleBackground />
      <TopButtons />
      <div className="game-wrapper">
        <LeftPanel />
        <UpgradesList />
      </div>
    </>
  );
}

export default function GameContainer() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}
