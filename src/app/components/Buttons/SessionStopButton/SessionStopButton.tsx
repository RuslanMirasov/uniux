import css from './SessionStopButton.module.scss';

interface SessionStopButtonProps {
  onClick?: () => void;
}

const SessionStopButton: React.FC<SessionStopButtonProps> = ({ onClick }) => {
  return (
    <button type="button" className={css.SessionStopButton} onClick={onClick}>
      <span>Stop</span>
    </button>
  );
};

export default SessionStopButton;
