import { StateContext } from 'context/Context';
import { useContext, useCallback } from 'react';
import { CellTypes } from 'types/types';
import styles from '../Table.module.css';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg';
import { useCalculatePercentageValue } from 'hooks/useCalculatePercentageValue';
import { useHeatMap } from 'hooks/useHeatMap';
import { AVERAGE_ROW_ID, DEFAULT_INCREMENT } from 'const/const';
import {
  createAverageRow,
  generateAverageValueColumns,
  getCellStyle,
  mergeAverageRow,
  updateCellAmount,
} from 'helpers/tableHelper';
import { useHighlightCells } from 'hooks/useHighlightCells';

type TableBodyProps = {
  clonedMatrix: CellTypes[][];
};

const TableBody = ({ clonedMatrix }: TableBodyProps) => {
  const { formData, matrix, setMatrix } = useContext(StateContext);
  const { hoveredSumRow, highlightedCells, setHoveredSumRow, handleHighlightCells, handleUnHighlightCells } =
    useHighlightCells(clonedMatrix, formData.limit);
  const { calculatePercentageCellValue, getIntegerCellValue } = useCalculatePercentageValue(clonedMatrix, setMatrix);
  const { getHeatMap } = useHeatMap(clonedMatrix);

  const isLastRow = (rowIndex: number) => rowIndex === matrix.length - 1;
  const isSumCell = (columnIndex: number) => columnIndex === matrix[0].length - 1;

  const handleAddValueByAmount = (rowIndex: number, cellIndex: number, amount: number) => {
    const updatedMatrix = updateCellAmount(clonedMatrix, rowIndex, cellIndex, amount);
    const newAverageRow = createAverageRow(updatedMatrix);
    setMatrix(mergeAverageRow(updatedMatrix, newAverageRow));
  };

  const handleCellClick = useCallback(
    (rowIndex: number, columnIndex: number) => {
      if (!isSumCell(columnIndex) && !isLastRow(rowIndex)) {
        handleAddValueByAmount(rowIndex, columnIndex, DEFAULT_INCREMENT);
      }
    },
    [handleAddValueByAmount]
  );

  const handleMouseEnter = useCallback(
    (rowIndex: number, columnIndex: number) => {
      if (!isSumCell(columnIndex)) {
        handleHighlightCells(
          rowIndex * clonedMatrix[0].length + columnIndex,
          clonedMatrix[rowIndex][columnIndex].amount
        );
      }
    },
    [handleHighlightCells, clonedMatrix]
  );

  const handleMouseLeave = useCallback(
    (isSumCell: boolean, rowIndex: number) => {
      if (isSumCell) {
        getIntegerCellValue(rowIndex);
        setHoveredSumRow(null);
      } else {
        handleUnHighlightCells();
      }
    },
    [getIntegerCellValue, handleUnHighlightCells]
  );

  const handleDeleteRow = (index: number) => {
    const updatedMatrix = clonedMatrix.filter((_, idx) => idx !== index);
    const matrixWithoutAverage = updatedMatrix.filter((row) => !row.some((cell) => cell.id === AVERAGE_ROW_ID));
    const newAverageRow = generateAverageValueColumns(matrixWithoutAverage).map((cell) => ({
      ...cell,
      id: AVERAGE_ROW_ID,
    }));
    setMatrix([...matrixWithoutAverage, newAverageRow]);
  };

  const renderCell = (cell: CellTypes, rowIndex: number, columnIndex: number) => {
    const isHighlighted = highlightedCells.includes(`${rowIndex}-${columnIndex}`);
    const hoverCellColor = getHeatMap(cell.amount);
    const isRowHovered = hoveredSumRow === rowIndex;
    const sumCell = isSumCell(columnIndex) && !isLastRow(rowIndex);
    const displayAmount = isRowHovered && !sumCell ? `${cell.amount.toFixed(2)}%` : cell.amount;

    return (
      <td
        key={columnIndex}
        id={cell.id.toString()}
        onClick={() => handleCellClick(rowIndex, columnIndex)}
        onMouseEnter={() => {
          if (!isLastRow(rowIndex)) {
            if (sumCell) {
              calculatePercentageCellValue(rowIndex);
              setHoveredSumRow(rowIndex);
            } else {
              handleMouseEnter(rowIndex, columnIndex);
            }
          }
        }}
        onMouseLeave={() => handleMouseLeave(sumCell, rowIndex)}
        style={getCellStyle(sumCell, isHighlighted, isRowHovered, hoverCellColor)}
      >
        {displayAmount}
      </td>
    );
  };

  return (
    <tbody>
      {matrix.map((row, rowIndex) => (
        <tr key={rowIndex}>
          <td>{isLastRow(rowIndex) ? '50th percentile' : `Cell values M = ${rowIndex + 1}`}</td>
          {row.map((cell, columnIndex) => renderCell(cell, rowIndex, columnIndex))}
          <td onClick={() => !isLastRow(rowIndex) && handleDeleteRow(rowIndex)}>
            {!isLastRow(rowIndex) && <DeleteIcon className={styles.delete} />}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
