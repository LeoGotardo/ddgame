/**
 * Componente para um toggle de configuração
 */

interface SettingToggleProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export default function SettingToggle({ label, value, onChange }: SettingToggleProps) {
  return (
    <div className="setting-item">
      <span className="setting-label">{label}</span>
      <div
        className={`toggle-switch ${value ? 'active' : ''}`}
        onClick={() => onChange(!value)}
      >
        <div className="toggle-slider"></div>
      </div>
    </div>
  );
}
