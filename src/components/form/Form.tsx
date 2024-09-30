import { StateContext } from 'context/Context';
import React, { FormEvent, useContext, useMemo } from 'react';
import Input from './_components/input/Input';
import styles from './Form.module.css';
import { generateTable } from 'utils/utils';
import Button from '../ui/button/Button';

const Form = () => {
  const { formData, setMatrix } = useContext(StateContext);

  const formInput = useMemo(
    () => [
      {
        id: 1,
        name: 'rows',
        mark: 'M',
        value: formData.rows,
        maxValue: 100,
        minValue: 0,
        description: 'Number of rows',
      },
      {
        id: 2,
        name: 'columns',
        mark: 'N',
        value: formData.columns,
        maxValue: 100,
        minValue: 0,
        description: 'Number of columns',
      },
      {
        id: 3,
        name: 'limit',
        mark: 'X',
        value: formData.limit,
        maxValue: formData.rows * formData.columns,
        minValue: 1,
        description: 'Limit for nearest by value cells',
      },
    ],
    [formData]
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const table = generateTable(formData);
    setMatrix(table);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {formInput.map((input) => (
        <Input
          mark={input.mark}
          key={input.id}
          value={input.value}
          maxValue={input.maxValue}
          minValue={input.minValue}
          name={input.name}
          description={input.description}
        />
      ))}
      <Button>Create a table</Button>
    </form>
  );
};

export default Form;
