import { StateContext } from 'context/Context';
import React, { FormEvent, useCallback, useContext, useMemo } from 'react';
import Input from './_components/input/Input';
import styles from './Form.module.css';
import { generateTable } from 'utils/utils';
import Button from '../ui/button/Button';

const Form = () => {
  const { formData, setMatrix } = useContext(StateContext);
  const { rows, columns, limit } = formData;

  const formInput = useMemo(
    () => [
      {
        id: 1,
        name: 'rows',
        mark: 'M',
        value: rows,
        maxValue: 100,
        minValue: 0,
        description: 'Number of rows',
      },
      {
        id: 2,
        name: 'columns',
        mark: 'N',
        value: columns,
        maxValue: 100,
        minValue: 0,
        description: 'Number of columns',
      },
      {
        id: 3,
        name: 'limit',
        mark: 'X',
        value: limit,
        maxValue: rows * columns,
        minValue: 1,
        description: 'Limit for nearest by value cells',
      },
    ],
    [formData]
  );

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      const table = generateTable(formData);
      setMatrix(table);
    },
    [formData, setMatrix]
  );

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
