import React, { useContext } from 'react';
import TableHead from './_components/TableHead';
import { StateContext } from 'context/Context';
import TableBody from './_components/TableBody';
import AddMoreRowsButton from './_components/AddMoreRowsButton';
import styles from './Table.module.css';

const Table = () => {
  const { matrix } = useContext(StateContext);

  if (matrix.length <= 1) {
    return <h3 className={styles.initialText}>Add rows and columns</h3>;
  }

  const clonedMatrix = structuredClone(matrix);

  return (
    <div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <TableHead />
          <TableBody clonedMatrix={clonedMatrix} />
        </table>
      </div>
      <AddMoreRowsButton clonedMatrix={clonedMatrix} />
    </div>
  );
};

export default Table;
