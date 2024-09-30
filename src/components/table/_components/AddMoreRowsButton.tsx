import Button from 'components/ui/button/Button';
import React, { memo, useContext } from 'react';
import { ReactComponent as AddIcon } from '../../../assets/icons/add.svg';
import { generateAverageValueColumns, generateThreeDigitRandomNumber, uniqueID } from 'utils/utils';
import { CellTypes } from 'types/types';
import { StateContext } from 'context/Context';

type AddMoreRowsProps = {
  clonedMatrix: CellTypes[][];
};

const AddMoreRowsButton = ({ clonedMatrix }: AddMoreRowsProps) => {
  const { matrix, setMatrix } = useContext(StateContext);

  const addRow = () => {
    const newIndex = clonedMatrix.push([]) - 1;

    matrix[0].forEach((_, index) => {
      clonedMatrix[newIndex - 1][index] = {
        id: uniqueID(),
        amount: generateThreeDigitRandomNumber(),
      };
    });
    const sum = clonedMatrix[newIndex - 1].slice(0, -1).reduce((acc, curr) => acc + curr.amount, 0);
    const filteredMatrix = clonedMatrix.filter((subArray) => subArray.length > 0);
    const average = generateAverageValueColumns(filteredMatrix);
    clonedMatrix.pop();
    clonedMatrix.push(average);
    const averageSum = clonedMatrix[newIndex].slice(0, -1).reduce((acc, curr) => acc + curr.amount, 0);
    clonedMatrix[newIndex - 1].slice(-1)[0]!.amount = sum;
    clonedMatrix[newIndex].slice(-1)[0]!.amount = averageSum;
    setMatrix(clonedMatrix);
  };

  return (
    <Button handleClick={addRow} centered={true}>
      Add more rows <AddIcon />
    </Button>
  );
};

export default memo(AddMoreRowsButton);
