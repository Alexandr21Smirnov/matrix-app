import { StateContext } from 'context/Context';
import { useContext, useCallback } from 'react';
import { CellTypes } from 'types/types';
import styles from '../Table.module.css';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg';
import { useCalculatePercentageValue } from 'hooks/useCalculatePercentageValue';
import { useHighlightCells } from 'hooks/useFindNearestCells';
import { useRowHandler } from 'hooks/useRowHandler';
import { useHeatMap } from 'hooks/useHeatMap';
import { getCellStyle } from 'utils/utils';

type TableBodyProps = {
  clonedMatrix: CellTypes[][];
};

const TableBody = ({ clonedMatrix }: TableBodyProps) => {
  const { formData, matrix, setMatrix } = useContext(StateContext);
  const { hoveredSumRow, highlightedCells, setHoveredSumRow, handleHighlightCells, handleUnHighlightCells } =
    useHighlightCells(clonedMatrix, formData.limit);
  const { calculatePercentageCellValue, getIntegerCellValue } = useCalculatePercentageValue(clonedMatrix, setMatrix);
  const { handleAddValueByAmount, handleDeleteRow } = useRowHandler(clonedMatrix, setMatrix);
  const { getHeatMap } = useHeatMap(clonedMatrix);

  const isLastRow = (rowIndex: number) => rowIndex === matrix.length - 1;
  const isSumCell = (columnIndex: number) => columnIndex === matrix[0].length - 1;

  const handleCellClick = useCallback(
    (rowIndex: number, columnIndex: number) => {
      if (!isSumCell(columnIndex) && !isLastRow(rowIndex)) {
        handleAddValueByAmount(rowIndex, columnIndex, 1);
      }
    },
    [handleAddValueByAmount, matrix]
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
    [handleHighlightCells, clonedMatrix, matrix]
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
    [getIntegerCellValue, handleUnHighlightCells, setHoveredSumRow]
  );

  return (
    <tbody>
      {matrix.map((row, rowIndex) => {
        return (
          <tr key={rowIndex}>
            <td>{isLastRow(rowIndex) ? '50th percentile' : `Cell values M = ${rowIndex + 1}`}</td>
            {row.map((cell, columnIndex) => {
              const { id, amount } = cell;
              const cellId = `${rowIndex}-${columnIndex}`;
              const isHighlighted = highlightedCells.includes(cellId);
              const hoverCellColor = getHeatMap(amount);
              const isRowHovered = hoveredSumRow === rowIndex;
              const sumCell = isSumCell(columnIndex) && !isLastRow(rowIndex);
              const displayAmount = isRowHovered && !sumCell ? `${amount.toFixed(2)}%` : amount;

              return (
                <td
                  key={columnIndex}
                  id={id.toString()}
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
            })}
            <td onClick={() => !isLastRow(rowIndex) && handleDeleteRow(rowIndex)}>
              {!isLastRow(rowIndex) && <DeleteIcon className={styles.delete} />}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
