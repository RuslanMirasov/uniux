import css from './ButtonsList.module.scss';

interface ButtonsListProps {
  align?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  children: React.ReactNode;
}

const ButtonsList: React.FC<ButtonsListProps> = ({ align, children }) => {
  return (
    <div className={css.ButtonsList} style={align ? { justifyContent: align } : undefined}>
      {children}
    </div>
  );
};

export default ButtonsList;
