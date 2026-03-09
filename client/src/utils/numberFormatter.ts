/**
 * Utilitários para formatação de números
 */

export function formatNumber(num: number): string {
  if (num >= 1000000000) return (num / 1000000000).toFixed(2) + 'B';
  if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return Math.floor(num).toString();
}

export function formatNumberDetailed(num: number): string {
  return Math.floor(num).toString();
}

export function formatDecimal(num: number, places: number = 1): string {
  return num.toFixed(places);
}
