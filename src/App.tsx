import Table from 'components/table/Table';
import Form from 'components/form/Form';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.wrapper}>
      <Form />
      <Table />
    </div>
  );
}

export default App;
