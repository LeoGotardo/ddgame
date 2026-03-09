/**
 * Modal para configurações do jogo
 */

import { useRef } from 'react';
import { useGame } from '@/contexts/GameContext';
import SettingToggle from './SettingToggle';

interface SettingsModalProps {
  onClose: () => void;
}

export default function SettingsModal({ onClose }: SettingsModalProps) {
  const {
    settings,
    toggleSetting,
    uploadSound,
    removeSound,
    customSounds,
    saveGameData,
    loadGameData,
    resetGameData,
  } = useGame();

  const clickSoundInputRef = useRef<HTMLInputElement>(null);
  const upgradeSoundInputRef = useRef<HTMLInputElement>(null);
  const achievementSoundInputRef = useRef<HTMLInputElement>(null);

  const handleSoundUpload = (type: 'click' | 'upgrade' | 'achievement') => {
    const inputRef =
      type === 'click'
        ? clickSoundInputRef
        : type === 'upgrade'
          ? upgradeSoundInputRef
          : achievementSoundInputRef;

    const file = inputRef.current?.files?.[0];
    if (file) {
      uploadSound(type, file);
    }
  };

  return (
    <div className="modal active" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">⚙️ Configurações</div>

        {/* Visual Settings */}
        <div className="modal-section">
          <h3>🎨 Visual</h3>
          <SettingToggle
            label="Partículas de Fundo"
            value={settings.particles}
            onChange={() => toggleSetting('particles')}
          />
          <SettingToggle
            label="Efeitos de Clique"
            value={settings.clickEffects}
            onChange={() => toggleSetting('clickEffects')}
          />
          <SettingToggle
            label="Sons"
            value={settings.sounds}
            onChange={() => toggleSetting('sounds')}
          />
        </div>

        {/* Gameplay Settings */}
        <div className="modal-section">
          <h3>🎮 Gameplay</h3>
          <SettingToggle
            label="Notificações de Conquistas"
            value={settings.achievementNotifications}
            onChange={() => toggleSetting('achievementNotifications')}
          />
          <SettingToggle
            label="Auto-Save"
            value={settings.autosave}
            onChange={() => toggleSetting('autosave')}
          />
        </div>

        {/* Sound Customization */}
        <div className="modal-section">
          <h3>🎵 Personalização de Sons</h3>
          <div className="file-upload-section">
            <p style={{ color: '#a0a0a0', marginBottom: '15px' }}>
              Faça upload de seus próprios efeitos sonoros!
            </p>
            <input
              ref={clickSoundInputRef}
              type="file"
              accept="audio/*"
              style={{ display: 'none' }}
              onChange={() => handleSoundUpload('click')}
            />
            <input
              ref={upgradeSoundInputRef}
              type="file"
              accept="audio/*"
              style={{ display: 'none' }}
              onChange={() => handleSoundUpload('upgrade')}
            />
            <input
              ref={achievementSoundInputRef}
              type="file"
              accept="audio/*"
              style={{ display: 'none' }}
              onChange={() => handleSoundUpload('achievement')}
            />
            <button
              className="file-upload-btn"
              onClick={() => clickSoundInputRef.current?.click()}
            >
              🎵 Som de Clique
            </button>
            <button
              className="file-upload-btn"
              onClick={() => upgradeSoundInputRef.current?.click()}
            >
              🎵 Som de Upgrade
            </button>
            <button
              className="file-upload-btn"
              onClick={() => achievementSoundInputRef.current?.click()}
            >
              🎵 Som de Conquista
            </button>
            <div className="file-list">
              {customSounds.click && (
                <div className="file-item">
                  <span className="file-item-name">🎵 Clique</span>
                  <button
                    className="file-item-remove"
                    onClick={() => removeSound('click')}
                  >
                    Remover
                  </button>
                </div>
              )}
              {customSounds.upgrade && (
                <div className="file-item">
                  <span className="file-item-name">🎵 Upgrade</span>
                  <button
                    className="file-item-remove"
                    onClick={() => removeSound('upgrade')}
                  >
                    Remover
                  </button>
                </div>
              )}
              {customSounds.achievement && (
                <div className="file-item">
                  <span className="file-item-name">🎵 Conquista</span>
                  <button
                    className="file-item-remove"
                    onClick={() => removeSound('achievement')}
                  >
                    Remover
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="modal-section">
          <h3>💾 Dados</h3>
          <div className="setting-item">
            <button
              className="close-modal"
              onClick={saveGameData}
              style={{ margin: 0, background: 'linear-gradient(145deg, #228b22, #32cd32)' }}
            >
              💾 Salvar Jogo
            </button>
          </div>
          <div className="setting-item">
            <button
              className="close-modal"
              onClick={loadGameData}
              style={{ margin: 0, background: 'linear-gradient(145deg, #4169e1, #1e90ff)' }}
            >
              📂 Carregar Jogo
            </button>
          </div>
          <div className="setting-item">
            <button
              className="close-modal"
              onClick={resetGameData}
              style={{ margin: 0 }}
            >
              🔄 Resetar Jogo
            </button>
          </div>
        </div>

        <button className="close-modal" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}
