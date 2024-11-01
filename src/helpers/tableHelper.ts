import { CellTypes, CellWithDistance, FormTypes } from 'types/types';
import { AVERAGE_ROW_ID, DEFAULT_CELL_COLOR, HIGHLIGHTED_CELL_COLOR } from 'const/const';
import { generateThreeDigitRandomNumber, uniqueID } from './generalHelper';

const createCell = (): CellTypes => ({
  id: uniqueID(),
  amount: generateThreeDigitRandomNumber(),
});

const createRow = (columns: number): CellTypes[] => {
  const rowCells = Array.from({ length: columns }, createCell);
  const sumCell = createSumCell(rowCells);
  return [...rowCells, sumCell];
};

const createSumCell = (cells: CellTypes[]): CellTypes => {
  const rowSum = cells.reduce((sum, cell) => sum + cell.amount, 0);
  return {
    id: uniqueID(),
    amount: rowSum,
  };
};

export const generateTable = (formData: FormTypes): CellTypes[][] => {
  const rows = Array.from({ length: formData.rows }, () => createRow(formData.columns));
  const averageRow = generateAverageValueColumns(rows);
  return [...rows, averageRow];
};

export function generateAverageValueColumns(matrix: CellTypes[][]) {
  const numberOfColumns = matrix[0]?.length || 0;

  return Array.from({ length: numberOfColumns }, (_, colIndex) => {
    const columnValues = getColumnValues(matrix, colIndex);
    return createAverageCell(columnValues);
  });
}

function getColumnValues(matrix: CellTypes[][], colIndex: number): number[] {
  return matrix.map((row) => row[colIndex]?.amount || 0);
}

function createAverageCell(values: number[]) {
  const averageAmount = calculateAverageValue(values);

  return {
    id: AVERAGE_ROW_ID,
    amount: averageAmount,
  };
}

function calculateAverageValue(values: number[]) {
  if (values.length === 0) return 0;
  const total = values.reduce((sum, value) => sum + value, 0);
  return Math.round(total / values.length);
}

export function findNearestCells(matrix: CellTypes[][], targetCell: number, targetValue: number, limit: number) {
  const targetPosition = getTargetPosition(targetCell, matrix[0].length);
  const cellsWithDistances = getCellsWithDistances(matrix, targetPosition, targetValue);

  const nearestCells = getNearestCells(cellsWithDistances, limit);

  return formatCellCoordinates(nearestCells);
}

function getTargetPosition(targetCell: number, cols: number) {
  return {
    row: Math.floor(targetCell / cols),
    col: targetCell % cols,
  };
}

function getCellsWithDistances(
  matrix: CellTypes[][],
  targetPosition: { row: number; col: number },
  targetValue: number
) {
  return matrix
    .slice(0, -1)
    .flatMap((row, rowIndex) => getRowCellsWithDistances(row, rowIndex, targetPosition, targetValue))
    .filter(isCellNotNull);
}

function getRowCellsWithDistances(
  row: CellTypes[],
  rowIndex: number,
  targetPosition: { row: number; col: number },
  targetValue: number
) {
  return row.slice(0, -1).map((cell, colIndex) => {
    if (rowIndex === targetPosition.row && colIndex === targetPosition.col) {
      return null; // Skip the target cell
    }

    return {
      value: cell.amount,
      distance: Math.abs(cell.amount - targetValue),
      row: rowIndex,
      col: colIndex,
    };
  });
}

// Type guard
function isCellNotNull(cell: CellWithDistance | null): cell is CellWithDistance {
  return cell !== null;
}

function getNearestCells(
  cellsWithDistances: { value: number; distance: number; row: number; col: number }[],
  limit: number
) {
  return cellsWithDistances.sort((a, b) => a.distance - b.distance).slice(0, limit);
}

function formatCellCoordinates(cells: { row: number; col: number }[]) {
  return cells.map((cell) => `${cell.row}-${cell.col}`);
}

export const getCellStyle = (
  isSumCell: boolean,
  isHighlighted: boolean,
  isRowHovered: boolean,
  hoverCellColor: string
) => {
  if (isSumCell) return { background: DEFAULT_CELL_COLOR };
  if (isHighlighted) return { background: HIGHLIGHTED_CELL_COLOR };
  if (isRowHovered) return { background: hoverCellColor };
  return { background: DEFAULT_CELL_COLOR };
};

export function updateCellAmount(
  matrix: CellTypes[][],
  rowIndex: number,
  cellIndex: number,
  amount: number
): CellTypes[][] {
  return matrix.map((row, index) => {
    if (index !== rowIndex) return row;

    const updatedRow = row.map((cell, cellIdx) => {
      if (cellIdx === cellIndex) {
        return { ...cell, amount: cell.amount + amount };
      }
      return cell;
    });

    const lastCell = updatedRow[updatedRow.length - 1];

    const newSumAmount = updatedRow.slice(0, -1).reduce((sum, cell) => sum + cell.amount, 0);
    const updatedSumCell = { ...lastCell, amount: newSumAmount };
    return [...updatedRow.slice(0, -1), updatedSumCell];
  });
}

export function createAverageRow(matrix: CellTypes[][]): CellTypes[] {
  return generateAverageValueColumns(matrix).map((cell) => ({
    ...cell,
    id: AVERAGE_ROW_ID,
  }));
}

export function mergeAverageRow(matrix: CellTypes[][], averageRow: CellTypes[]): CellTypes[][] {
  const matrixWithoutAverageRow = matrix.filter((row) => !row.some((cell) => cell.id === AVERAGE_ROW_ID));
  return [...matrixWithoutAverageRow, averageRow];
}
