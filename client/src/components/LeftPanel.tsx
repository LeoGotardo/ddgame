/**
 * Painel esquerdo do jogo (área principal de clique)
 */

import XPDisplay from './XPDisplay';
import DiceButton from './DiceButton';
import DiceRoller from './DiceRoller';

export default function LeftPanel() {
  return (
    <div className="left-panel">
      <div className="background-pattern"></div>

      <div className="header">
        <h1>⚔️ D&D CLICKER ⚔️</h1>
      </div>

      <XPDisplay />

      <DiceButton />

      <DiceRoller />
    </div>
  );
}
