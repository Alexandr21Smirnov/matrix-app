import { BASE_RGB_COLOR } from 'const/const';

export function calculateMinMax(values: number[]): [number, number] {
  return [Math.min(...values), Math.max(...values)];
}

export function parseCellAmount(cellAmount: number | string): number {
  return typeof cellAmount === 'string' ? parseFloat(cellAmount) : Math.round(cellAmount);
}

export function normalizeValue(value: number, minValue: number, maxValue: number): number {
  return (value - minValue) / (maxValue - minValue || 1);
}

export function clampValue(value: number): number {
  return Math.max(0, Math.min(1, value));
}

export function generateHeatMapColor(clampedValue: number): string {
  const baseColor = getBaseColor();
  const intensityScale = 15;
  const [r, g, b] = getColorComponents(clampedValue, baseColor, intensityScale);

  const minColorValue = 100;
  return `rgba(${Math.max(r, minColorValue)}, ${Math.max(g, minColorValue)}, ${Math.max(b, minColorValue)}, 1)`;
}

function getBaseColor(): number[] {
  return BASE_RGB_COLOR;
}

function getColorComponents(clampedValue: number, baseColor: number[], intensityScale: number): number[] {
  const adjustment = 1 - clampedValue * intensityScale;
  return baseColor.map((color) => Math.round(color * adjustment));
}
