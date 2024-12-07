import { Icon } from '../..';
import css from './PlayStop.module.scss';

interface PlayStopProps {
  name: 'play' | 'stop';
  size: string;
  onClick: () => void;
}

const PlayStop: React.FC<PlayStopProps> = ({ name = 'play', size, onClick }) => {
  return (
    <button type="button" className={css.PlayStop} onClick={onClick} aria-label={name === 'play' ? 'Play button' : 'Stop button'}>
      <Icon name={name} size={size} />
    </button>
  );
};

export default PlayStop;
