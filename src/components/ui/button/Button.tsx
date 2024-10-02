import { memo, ReactNode } from 'react';
import styles from './Button.module.css';

type ButtonProps = {
  children: ReactNode;
  handleClick?: () => void;
  centered?: boolean;
};

const Button = ({ handleClick, centered = false, children }: ButtonProps) => {
  const className = `${styles.button} ${centered ? styles.centered : ''}`;

  return (
    <button type='submit' onClick={handleClick} className={className}>
      {children}
    </button>
  );
};

export default memo(Button);
