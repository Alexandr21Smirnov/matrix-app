import { CellTypes } from 'types/types';

export function getAllCellAmounts(matrix: CellTypes[][]): number[] {
  return matrix.flatMap((row) => row.map((cell) => cell.amount));
}

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
