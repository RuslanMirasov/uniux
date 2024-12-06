import { Icon } from "../../../components";
import css from "./LogoutButton.module.scss";

const LogoutButton = () => {
  const handleClick = () => {
    console.log("LOGOUT");
  };

  return (
    <button type="button" className={css.LogoutButton} onClick={handleClick}>
      <Icon name="logout" size="16" />
      <span>Logout</span>
    </button>
  );
};

export default LogoutButton;
