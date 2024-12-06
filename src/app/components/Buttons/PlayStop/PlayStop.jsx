import { Icon } from "../../../components";
import css from "./PlayStop.module.scss";

const PlayStop = ({ name = "play", size, onClick }) => {
  return (
    <button type="button" className={css.PlayStop} onClick={onClick}>
      <Icon name={name} size={size} />
    </button>
  );
};

export default PlayStop;
