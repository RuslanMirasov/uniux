import css from './CloseButton.module.scss';

interface CloseButtonProps {
  onClick: () => void;
}

const CloseButton = ({ onClick }: CloseButtonProps) => {
  return (
    <button type="button" onClick={onClick} className={css.CloseButton}>
      Close Button
    </button>
  );
};

export default CloseButton;
