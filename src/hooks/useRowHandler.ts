import { AVERAGE_ROW_ID } from 'const/const';
import { CellTypes } from 'types/types';
import { generateAverageValueColumns } from 'utils/utils';

export function useRowHandler(clonedMatrix: CellTypes[][], setMatrix: (_clonedMatrix: CellTypes[][]) => void) {
  const handleAddValueByAmount = (rowIndex: number, cellIndex: number, amount: number) => {
    clonedMatrix[rowIndex][cellIndex].amount += amount;
    clonedMatrix[rowIndex].slice(-1)[0].amount += amount;
    const newAverageRow = generateAverageValueColumns(clonedMatrix);

    newAverageRow.forEach((cell) => (cell.id = AVERAGE_ROW_ID));

    const mergedUpdatedMatrix = clonedMatrix.filter((row) => !row.some((cell) => cell.id === AVERAGE_ROW_ID));

    mergedUpdatedMatrix.push(newAverageRow);

    setMatrix(mergedUpdatedMatrix);
  };

  const handleDeleteRow = (index: number) => {
    const updatedMatrix = clonedMatrix.filter((_: CellTypes[], idx: number) => idx !== index);

    const matrixWithoutAverage = updatedMatrix.filter((row) => !row.some((cell) => cell.id === AVERAGE_ROW_ID));

    const newAverageRow = generateAverageValueColumns(matrixWithoutAverage);
    newAverageRow.forEach((cell) => (cell.id = AVERAGE_ROW_ID));

    const mergedUpdatedMatrix = [...matrixWithoutAverage, newAverageRow];
    setMatrix(mergedUpdatedMatrix);
  };

  return {
    handleAddValueByAmount,
    handleDeleteRow,
  };
}
