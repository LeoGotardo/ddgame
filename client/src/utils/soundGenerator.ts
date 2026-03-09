/**
 * Geração e reprodução de sons
 */

export class SoundGenerator {
  private audioContext: AudioContext | null = null;

  constructor() {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.audioContext = new AudioContextClass();
    } catch (e) {
      console.log('AudioContext não suportado:', e);
    }
  }

  private playBeep(frequency: number, duration: number): void {
    if (!this.audioContext) return;

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration);
    } catch (e) {
      console.log('Erro ao tocar som:', e);
    }
  }

  playClick(): void {
    this.playBeep(800, 0.1);
  }

  playUpgrade(): void {
    this.playBeep(600, 0.15);
    setTimeout(() => this.playBeep(800, 0.15), 100);
  }

  playAchievement(): void {
    this.playBeep(600, 0.2);
    setTimeout(() => this.playBeep(800, 0.2), 150);
    setTimeout(() => this.playBeep(1000, 0.3), 300);
  }

  playCustom(audio: HTMLAudioElement): void {
    try {
      audio.currentTime = 0;
      audio.play().catch(e => console.log('Erro ao tocar som:', e));
    } catch (e) {
      console.log('Erro ao tocar som customizado:', e);
    }
  }
}

export function createSoundGenerator(): SoundGenerator {
  return new SoundGenerator();
}
