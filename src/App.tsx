import Table from 'components/table/Table';
import Form from 'components/form/Form';
import styles from './App.module.css';
import { useContext } from 'react';
import { StateContext } from 'context/Context';

function App() {
  const { nearestValue } = useContext(StateContext);
  return (
    <div className={styles.wrapper}>
      <Form />
      <Table />
      {nearestValue > 0 && <h3 className={styles.text}>Nearest value: {nearestValue}</h3>}
    </div>
  );
}

export default App;
