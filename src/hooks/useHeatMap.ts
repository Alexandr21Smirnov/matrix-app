import { CellTypes } from 'types/types';

export function useHeatMap(clonedMatrix: CellTypes[][]) {
  const allValues = clonedMatrix.flatMap((row) => row.map((cell) => cell.amount));
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);

  const getHeatMap = (cellAmount: number) => {
    const adjustedAmount = typeof cellAmount === 'string' ? parseFloat(cellAmount) : Math.round(cellAmount);
    const normalizedValue = (adjustedAmount - minValue) / (maxValue - minValue || 1);
    const clampedValue = Math.max(0, Math.min(1, normalizedValue));
    const baseColor = [181, 200, 200];
    const intensityScale = 15;

    const r = Math.round(baseColor[0] * (1 - clampedValue * intensityScale));
    const g = Math.round(baseColor[1] * (1 - clampedValue * intensityScale));
    const b = Math.round(baseColor[2] * (1 - clampedValue * intensityScale));

    const minColorValue = 100;
    return `rgba(${Math.max(r, minColorValue)}, ${Math.max(g, minColorValue)}, ${Math.max(b, minColorValue)}, 1)`;
  };

  return {
    getHeatMap,
  };
}
