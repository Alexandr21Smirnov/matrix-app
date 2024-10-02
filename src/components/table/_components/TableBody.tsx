import { StateContext } from 'context/Context';
import { useContext } from 'react';
import { CellTypes } from 'types/types';
import styles from '../Table.module.css';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg';
import { useCalculatePercentageValue } from 'hooks/useCalculatePercentageValue';
import { useHighlightCells } from 'hooks/useFindNearestCells';
import { useRowHandler } from 'hooks/useRowHandler';
import { useHeatMap } from 'hooks/useHeatMap';
import { defaultCellColor, highlightedCellColor } from 'const/const';

type TableBodyProps = {
  clonedMatrix: CellTypes[][];
};

const TableBody = ({ clonedMatrix }: TableBodyProps) => {
  const { formData, matrix, setMatrix } = useContext(StateContext);
  const { hoveredSumRow, highlightedCells, setHoveredSumRow, handleMouseOver, handleMouseOut } = useHighlightCells(
    clonedMatrix,
    formData.limit
  );
  const { calculatePercentageCellValue, getIntegerCellValue } = useCalculatePercentageValue(clonedMatrix, setMatrix);
  const { handleAddValueByAmount, handleDeleteRow } = useRowHandler(clonedMatrix, setMatrix);
  const { getHeatMap } = useHeatMap(clonedMatrix);

  return (
    <tbody>
      {matrix.map((row, rowIndex) => {
        const isLastRow = rowIndex === matrix.length - 1;

        return (
          <tr key={rowIndex}>
            <td>{isLastRow ? <span>50th percentile</span> : <span>Cell values M = {rowIndex + 1}</span>}</td>
            {row.map((cell, columnIndex) => {
              const cellId = `${rowIndex}-${columnIndex}`;
              const cellAmount = cell.amount;
              const isHighlighted = highlightedCells.includes(cellId);
              const hoverCellColor = getHeatMap(cellAmount);
              const isRowHovered = hoveredSumRow === rowIndex;
              const isSumCell = columnIndex === matrix[0].length - 1 && !isLastRow;
              const displayAmount = isRowHovered && !isSumCell ? `${cellAmount.toFixed(2)}%` : cellAmount;

              return (
                <td
                  key={columnIndex}
                  id={cell.id.toString()}
                  onClick={() => !isSumCell && !isLastRow && handleAddValueByAmount(rowIndex, columnIndex, 1)}
                  onMouseEnter={() => {
                    if (!isLastRow) {
                      if (isSumCell) {
                        calculatePercentageCellValue(rowIndex);
                        setHoveredSumRow(rowIndex);
                      } else {
                        handleMouseOver(rowIndex * row.length + columnIndex, cell.amount);
                      }
                    }
                  }}
                  onMouseLeave={() => {
                    if (isSumCell) {
                      getIntegerCellValue(rowIndex);
                      setHoveredSumRow(null);
                    } else {
                      handleMouseOut();
                    }
                  }}
                  style={{
                    background: isSumCell
                      ? defaultCellColor
                      : isHighlighted
                        ? highlightedCellColor
                        : isRowHovered && !isHighlighted
                          ? hoverCellColor
                          : defaultCellColor,
                  }}
                >
                  {displayAmount}
                </td>
              );
            })}
            <td onClick={() => !isLastRow && handleDeleteRow(rowIndex)}>
              {!isLastRow && <DeleteIcon className={styles.delete} />}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
