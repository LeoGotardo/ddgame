/**
 * Componente para partículas de fundo animadas
 */

import { useEffect, useRef } from 'react';
import { useGame } from '@/contexts/GameContext';

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { settings } = useGame();

  useEffect(() => {
    if (!settings.particles || !containerRef.current) return;

    const container = containerRef.current;
    container.innerHTML = '';

    // Create particles
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.width = Math.random() * 100 + 50 + 'px';
      particle.style.height = particle.style.width;
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 20 + 's';
      particle.style.animationDuration = Math.random() * 10 + 15 + 's';
      container.appendChild(particle);
    }
  }, [settings.particles]);

  return (
    <div
      ref={containerRef}
      className="particles"
      style={{ display: settings.particles ? 'block' : 'none' }}
    />
  );
}
