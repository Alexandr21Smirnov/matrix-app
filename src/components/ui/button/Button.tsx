import { memo, ReactNode } from 'react';
import styles from './Button.module.css';

type ButtonProps = {
  children: ReactNode;
  handleClick?: () => void;
  centered?: boolean;
};

const Button = ({ handleClick, centered, children }: ButtonProps) => {

  const classes = [styles.button];
  if (centered) classes.push(styles.centered);
  return (
    <button type='submit' onClick={handleClick} className={classes.join(' ')}>
      {children}
    </button>
  );
};

export default memo(Button);
