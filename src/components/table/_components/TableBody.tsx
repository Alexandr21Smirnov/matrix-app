import { StateContext } from 'context/Context';
import React, { useContext } from 'react';
import { CellTypes, PercentageCellTypes } from 'types/types';
import styles from '../Table.module.css';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg';
import { filterByProperty, generateAverageValueColumns, removePercentSign } from 'utils/utils';

type TableBody = {
  clonedMatrix: CellTypes[][];
};

const TableBody = ({ clonedMatrix }: TableBody) => {
  const { formData, matrix, setMatrix, setNearestValue } = useContext(StateContext);

  const findNearestByValueCells = (rowIndex: number, cellIndex: number, target: number, limit: number = 0) => {
    const clonedMatrix = structuredClone(matrix);

    const filteredTarget = filterByProperty(clonedMatrix, 'amount', target);

    const nearestValue = filteredTarget.reduce(
      (acc: CellTypes, curr: CellTypes) =>
        Math.abs(target - curr.amount) <= Math.abs(target - acc.amount) ? curr : acc,
      {}
    );
    setNearestValue(nearestValue.amount);
  };

  const calculatePercentValue = (rowIndex: number) => {
    for (let i = 0; i < clonedMatrix[rowIndex].length - 1; i++) {
      (clonedMatrix as unknown as PercentageCellTypes[][])[rowIndex][i].amount =
        ((clonedMatrix[rowIndex][i].amount / clonedMatrix[rowIndex].slice(-1)[0].amount) * 100).toFixed(2) + '%';
    }
    setMatrix(clonedMatrix);
  };

  const getIntegerCellValue = (rowIndex: number) => {
    for (let i = 0; i < clonedMatrix[rowIndex].length - 1; i++) {
      clonedMatrix[rowIndex][i].amount = Math.round(
        (clonedMatrix[rowIndex].slice(-1)[0].amount * removePercentSign(clonedMatrix[rowIndex][i].amount)) / 100
      );
    }
    setMatrix(clonedMatrix);
  };

  const handleAddValueByAmount = (rowIndex: number, cellIndex: number, amount: number) => {
    clonedMatrix[rowIndex][cellIndex].amount += amount;
    clonedMatrix[rowIndex].slice(-1)[0].amount += amount;
    const average = generateAverageValueColumns(clonedMatrix);
    clonedMatrix.pop();
    clonedMatrix.push(average);
    setMatrix(clonedMatrix);
  };

  const handleDeleteRow = (index: number) => {
    setMatrix(
      clonedMatrix.filter((_: CellTypes[], idx: number) => {
        return idx !== index;
      })
    );
  };

  return (
    <tbody>
      {matrix.map((row, index) => (
        <tr key={index + 1}>
          <td>
            {matrix.length - 1 === index ? <span>50th percentile</span> : <span>Cell values M = {index + 1}</span>}
          </td>

          {row.map((cell, cellIndex) => (
            <td
              key={cellIndex}
              id={JSON.stringify(cell?.id)}
              onClick={() =>
                matrix[0].length - 1 !== cellIndex &&
                matrix.length - 1 !== index &&
                handleAddValueByAmount(index, cellIndex, 1)
              }
              onMouseOver={() =>
                matrix.length - 1 === index
                  ? null
                  : matrix[0].length - 1 !== cellIndex
                    ? findNearestByValueCells(index, cellIndex, cell!.amount, formData.limit)
                    : calculatePercentValue(index)
              }
              onMouseLeave={() =>
                matrix[0].length - 1 === cellIndex && matrix.length - 1 !== index && getIntegerCellValue(index)
              }
            >
              {cell?.amount}
            </td>
          ))}
          {matrix.length - 1 !== index ? (
            <td onClick={() => handleDeleteRow(index)}>
              <DeleteIcon className={styles.delete} />
            </td>
          ) : (
            <td></td>
          )}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
