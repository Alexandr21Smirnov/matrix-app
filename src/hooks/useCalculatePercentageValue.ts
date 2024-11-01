import { removePercentSign } from 'helpers/generalHelper';
import { CellTypes } from 'types/types';

export function useCalculatePercentageValue(
  clonedMatrix: CellTypes[][],
  setMatrix: (_clonedMatrix: CellTypes[][]) => void
) {
  const calculatePercentageCellValue = (rowIndex: number) => {
    const row = clonedMatrix[rowIndex];
    const totalAmount = row[row.length - 1]?.amount;

    if (totalAmount === 0) return;

    const updatedCells = row.slice(0, -1).map((cell) => ({
      ...cell,
      amount: (cell.amount / totalAmount) * 100,
    }));

    const newRow = [...updatedCells, { ...row[row.length - 1] }];
    const updatedMatrix = clonedMatrix.map((r, index) => (index === rowIndex ? newRow : r));
    setMatrix(updatedMatrix);
  };

  const getIntegerCellValue = (rowIndex: number) => {
    const row = clonedMatrix[rowIndex];
    const totalAmount = row[row.length - 1]?.amount;

    if (totalAmount === 0) return;

    row.slice(0, -1).map((cell) => {
      const percentageValueWithoutSign = removePercentSign(cell.amount);
      cell.amount = Math.round((totalAmount * percentageValueWithoutSign) / 100);
    });

    const newRow = [...row.slice(0, -1), { ...row[row.length - 1] }];

    const updatedMatrix = clonedMatrix.map((r, index) => (index === rowIndex ? newRow : r));
    setMatrix(updatedMatrix);
  };

  return {
    calculatePercentageCellValue,
    getIntegerCellValue,
  };
}
