import { AVERAGE_ROW_ID } from 'const/const';
import { CellTypes, FormTypes } from 'types/types';

export const generateThreeDigitRandomNumber = () => {
  let number = Math.floor(Math.random() * 900) + 100;

  if (number === 999) {
    number--;
  } else if (number % 2 !== 0) {
    number++;
  }

  return number;
};

let idCounter = 0;

export const uniqueID = () => {
  return ++idCounter;
};

export const removePercentSign = (amount: number) => {
  return +amount.toString().replace(/\%/g, '');
};

export const generateTable = (formData: FormTypes): CellTypes[][] => {
  const table: CellTypes[][] = [];

  for (let row = 0; row < formData.rows; row++) {
    const rowCells: CellTypes[] = [];
    let rowSum = 0;

    for (let column = 0; column < formData.columns; column++) {
      const cell: CellTypes = {
        id: uniqueID(),
        amount: generateThreeDigitRandomNumber(),
      };

      rowCells.push(cell);
      rowSum += cell.amount;
    }

    const sumCell: CellTypes = {
      id: uniqueID(),
      amount: rowSum,
    };
    rowCells.push(sumCell);
    table.push(rowCells);
  }
  const averageRow = generateAverageValueColumns(table);
  table.push(averageRow);

  return table;
};

export function generateAverageValueColumns(matrix: CellTypes[][]) {
  const averages: CellTypes[] = [];

  for (let col = 0; col < (matrix[0]?.length || 0); col++) {
    const columnValues: number[] = matrix.map((row) => row[col]?.amount || 0);
    const averageCell = countAverageValues(columnValues);
    averages.push(averageCell);
  }

  return averages;
}

function countAverageValues(values: number[]) {
  const total = values.reduce((sum, value) => sum + value, 0);
  const averageAmount = values.length > 0 ? Math.round(total / values.length) : 0;

  return {
    id: AVERAGE_ROW_ID,
    amount: averageAmount,
  };
}

export function findNearestCells(matrix: CellTypes[][], targetCell: number, targetValue: number, limit: number) {
  const targetRow = Math.floor(targetCell / matrix[0].length);
  const targetCol = targetCell % matrix[0].length;
  const nearestCells = [];

  for (let i = 0; i < matrix.length - 1; i++) {
    for (let j = 0; j < matrix[i].length - 1; j++) {
      if (i === targetRow && j === targetCol) continue;

      const value = matrix[i][j].amount;
      nearestCells.push({ value, distance: Math.abs(value - targetValue), row: i, col: j });
    }
  }
  nearestCells.sort((a, b) => a.distance - b.distance);
  return nearestCells.slice(0, limit).map((cell) => `${cell.row}-${cell.col}`);
}
