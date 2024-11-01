import Button from 'components/ui/button/Button';
import { memo, useContext } from 'react';
import { ReactComponent as AddIcon } from '../../../assets/icons/add.svg';
import { CellTypes } from 'types/types';
import { StateContext } from 'context/Context';
import { AVERAGE_ROW_ID } from 'const/const';
import { generateThreeDigitRandomNumber, uniqueID } from 'helpers/generalHelper';
import { generateAverageValueColumns } from 'helpers/tableHelper';

type AddMoreRowsProps = {
  clonedMatrix: CellTypes[][];
};

const AddMoreRowsButton = ({ clonedMatrix }: AddMoreRowsProps) => {
  const { setMatrix } = useContext(StateContext);

  const addRow = () => {
    const createNewRow = () =>
      clonedMatrix[0].map(() => ({
        id: uniqueID(),
        amount: generateThreeDigitRandomNumber(),
      }));

    const calculateSum = (row: CellTypes[]) => row.slice(0, -1).reduce((acc, curr) => acc + curr.amount, 0);

    const newRow = createNewRow();
    newRow[newRow.length - 1].amount = calculateSum(newRow);

    const updatedMatrix = [...clonedMatrix, newRow].filter((row) => !row.some((cell) => cell.id === AVERAGE_ROW_ID));

    const averageRow = generateAverageValueColumns(updatedMatrix).map((cell) => ({
      ...cell,
      id: AVERAGE_ROW_ID,
    }));

    setMatrix([...updatedMatrix, averageRow]);
  };

  return (
    <Button handleClick={addRow} centered={true}>
      Add more rows <AddIcon />
    </Button>
  );
};

export default memo(AddMoreRowsButton);
