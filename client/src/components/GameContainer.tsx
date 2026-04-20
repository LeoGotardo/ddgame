import { useState } from 'react';
import { GameProvider } from '@/contexts/GameContext';
import { useGameLoop } from '@/hooks/useGameLoop';
import { useAchievements } from '@/hooks/useAchievements';
import ParticleBackground from './ParticleBackground';
import TopButtons from './TopButtons';
import LeftPanel from './LeftPanel';
import UpgradesList from './UpgradesList';

type Tab = 'game' | 'shop';

function GameContent() {
  useGameLoop();
  useAchievements();
  const [activeTab, setActiveTab] = useState<Tab>('game');

  return (
    <>
      <ParticleBackground />
      <TopButtons />
      <div className={`game-wrapper tab-${activeTab}`}>
        <LeftPanel />
        <UpgradesList />
      </div>
      <nav className="bottom-nav">
        <button
          className={`bottom-nav-btn ${activeTab === 'game' ? 'active' : ''}`}
          onClick={() => setActiveTab('game')}
        >
          🎲
          <span>Jogo</span>
        </button>
        <button
          className={`bottom-nav-btn ${activeTab === 'shop' ? 'active' : ''}`}
          onClick={() => setActiveTab('shop')}
        >
          🏪
          <span>Loja</span>
        </button>
      </nav>
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
