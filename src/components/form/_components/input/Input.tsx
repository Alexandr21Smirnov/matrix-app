import { ChangeEvent, memo, useCallback, useContext } from 'react';
import styles from './Input.module.css';
import { StateContext } from 'context/Context';

type InputProps = {
  mark: string;
  name: string;
  value: number;
  description: string;
  maxValue: number;
  minValue: number;
};

const Input = ({ mark, name, value, description, maxValue, minValue }: InputProps) => {
  const { formData, setFormData } = useContext(StateContext);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const { name, value } = e.target as HTMLInputElement;

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    },
    [formData]
  );

  return (
    <>
      <label htmlFor={mark} className={styles.label}>
        <span>{mark}&#58;</span> {description}
      </label>
      <input
        type={'number'}
        id={mark}
        max={maxValue}
        min={minValue}
        value={value}
        name={name}
        onChange={handleInputChange}
        className={styles.input}
      ></input>
    </>
  );
};

export default memo(Input);
