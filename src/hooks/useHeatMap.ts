import { CellTypes } from 'types/types';
import { getAllCellAmounts } from 'helpers/generalHelper';
import {
  calculateMinMax,
  clampValue,
  generateHeatMapColor,
  normalizeValue,
  parseCellAmount,
} from 'helpers/heatMapHelper';

export function useHeatMap(clonedMatrix: CellTypes[][]) {
  const allValues = getAllCellAmounts(clonedMatrix);
  const [minValue, maxValue] = calculateMinMax(allValues);

  const getHeatMap = (cellAmount: number) => {
    const adjustedAmount = parseCellAmount(cellAmount);
    const normalizedValue = normalizeValue(adjustedAmount, minValue, maxValue);
    const clampedValue = clampValue(normalizedValue);

    return generateHeatMapColor(clampedValue);
  };

  return {
    getHeatMap,
  };
}
