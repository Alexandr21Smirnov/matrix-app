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

export const uniqueID = () => {
  return +Math.floor(Math.random() * Date.now());
};

export const removePercentSign = (amount: number) => {
  return +amount.toString().replace(/\%/g, '');
};

export const generateTable = (formData: FormTypes): CellTypes[][] => {
  let table: CellTypes[][] = [];
  let sum = 0;
  let sumObj: CellTypes = {
    id: 0,
    amount: 0,
  };

  for (let row = 0; row < formData.rows; row++) {
    let children: CellTypes[] = [];

    sum = 0;

    for (let column = 0; column < formData.columns; column++) {
      const cell = {
        id: uniqueID(),
        amount: generateThreeDigitRandomNumber(),
      } as CellTypes;

      children.push(cell);

      sumObj = {
        id: uniqueID(),
        amount: (sum += children[column].amount),
      };
    }

    children.push(sumObj);
    table.push(children);
  }

  const average = generateAverageValueColumns(table);
  table.push(average);

  return table;
};

export function generateAverageValueColumns(matrix: CellTypes[][]) {
  let columns = [];

  for (let col = 0; col < matrix[0].length; col++) {
    let columnValues = [];
    for (let row = 0; row < matrix.length; row++) {
      columnValues.push(matrix[row][col]?.amount);
    }
    let averageValue = countAverageValues(columnValues);
    columns.push(averageValue);
  }

  return columns;
}

function countAverageValues(column: number[]) {
  let average = 0;
  let averageObj: CellTypes = {
    id: 0,
    amount: 0,
  };
  for (let i = 0; i < column.length; i++) {
    averageObj = {
      id: uniqueID(),
      amount: +((average += column[i]) / column.length).toFixed(0),
    };
  }
  return averageObj;
}

export function filterByProperty(array: any, prop: string, target: number) {
  const filtered = [];
  for (let i = 0; i < array.length; i++) {
    const obj = array[i];

    for (let key in obj) {
      if (typeof (obj[key] == 'object')) {
        const item = obj[key];
        if (
          item[prop] !== target &&
          item[prop] !== array[i].slice(-1)[0].amount &&
          item[prop] !== array[array.length - 1][+key].amount
        ) {
          filtered.push(item);
        }
      }
    }
  }

  return filtered;
}
