import { ReactNode } from 'react';
import clsx from 'clsx';
import css from './Fieldset.module.scss';

interface FieldsetProps {
  grid?: string[];
  legend?: string;
  children: ReactNode;
}

const Fieldset: React.FC<FieldsetProps> = ({ legend, grid = ['full', 'full', 'full'], children }) => {
  const FieldsetClasses = clsx(css.Fieldset, css[`Col-Desctop--${grid[0]}`], css[`Col-Tablet--${grid[1]}`], css[`Col-Mobil--${grid[2]}`]);

  return (
    <fieldset className={FieldsetClasses}>
      {legend && <legend>{legend}</legend>}
      {children}
    </fieldset>
  );
};

export default Fieldset;
