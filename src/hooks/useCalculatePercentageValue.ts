import { CellTypes } from 'types/types';
import { removePercentSign } from 'utils/utils';

export function useCalculatePercentageValue(
  clonedMatrix: CellTypes[][],
  setMatrix: (_clonedMatrix: CellTypes[][]) => void
) {
  const calculatePercentageCellValue = (rowIndex: number) => {
    const row = clonedMatrix[rowIndex];
    const totalAmount = row[row.length - 1]?.amount;
    if (totalAmount === 0) return;

    row.slice(0, -1).forEach((cell) => {
      cell.amount = (cell.amount / totalAmount) * 100;
    });

    setMatrix(clonedMatrix);
  };

  const getIntegerCellValue = (rowIndex: number) => {
    const row = clonedMatrix[rowIndex];
    const totalAmount = row[row.length - 1]?.amount;

    row.slice(0, -1).forEach((cell) => {
      const percentageValue = removePercentSign(cell.amount);
      cell.amount = Math.round((totalAmount * percentageValue) / 100);
    });

    setMatrix(clonedMatrix);
  };

  return {
    calculatePercentageCellValue,
    getIntegerCellValue,
  };
}
