import { Avatar, Icon } from '../../../components';
import css from './SessionItem.module.scss';

interface SessionItemProps {
  name?: string | null;
  email: string;
  date?: string;
  children?: React.ReactNode;
}

const SessionItem: React.FC<SessionItemProps> = ({
  name = null,
  email,
  date = '2025-03-04T12:27:22.383+00:00',
  children,
}) => {
  const dateString = new Date(date);

  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(dateString);

  return (
    <div className={css.SessionItem}>
      <Avatar name={name} email={email} />
      <div className={css.Content}>
        <Icon name="accordeon-play-session" size="14" />
        <span>{formattedDate}</span>
        <p>{name ? name : email}</p>
        <ul className={css.TasksList}>
          <li className={css.Success}>Task 1</li>
          <li className={css.Success}>Task 2</li>
          <li className={css.Fail}>Task 3</li>
          <li>Task 4</li>
        </ul>
      </div>

      {children}
    </div>
  );
};

export default SessionItem;
