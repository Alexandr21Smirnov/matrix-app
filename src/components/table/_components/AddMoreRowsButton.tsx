import Button from 'components/ui/button/Button';
import React, { memo, useContext } from 'react';
import { ReactComponent as AddIcon } from '../../../assets/icons/add.svg';
import { generateAverageValueColumns, generateThreeDigitRandomNumber, uniqueID } from 'utils/utils';
import { CellTypes } from 'types/types';
import { StateContext } from 'context/Context';
import { AVERAGE_ROW_ID } from 'const/const';

type AddMoreRowsProps = {
  clonedMatrix: CellTypes[][];
};

const AddMoreRowsButton = ({ clonedMatrix }: AddMoreRowsProps) => {
  const { matrix, setMatrix } = useContext(StateContext);

  const addRow = () => {
    const newRow = clonedMatrix[0].map(() => ({
      id: uniqueID(),
      amount: generateThreeDigitRandomNumber(),
    }));
    const sum = newRow.slice(0, -1).reduce((acc, curr) => acc + curr.amount, 0);
    newRow[newRow.length - 1].amount = sum;
    let updatedMatrix = [...clonedMatrix, newRow];

    updatedMatrix = updatedMatrix.filter((row) => !row.some((cell) => cell.id === AVERAGE_ROW_ID));

    const averageRow = generateAverageValueColumns(updatedMatrix);

    // fixed average id
    averageRow.forEach((cell) => (cell.id = AVERAGE_ROW_ID));

    updatedMatrix.push(averageRow);

    setMatrix(updatedMatrix);
  };

  return (
    <Button handleClick={addRow} centered={true}>
      Add more rows <AddIcon />
    </Button>
  );
};

export default memo(AddMoreRowsButton);
