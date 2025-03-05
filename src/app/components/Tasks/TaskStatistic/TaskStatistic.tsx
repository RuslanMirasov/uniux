import css from './TaskStatistic.module.scss';

interface TaskStatisticProps {
  overall?: number;
  success?: number;
  rate?: number;
  time?: number;
  children?: React.ReactNode;
}

const TaskStatistic: React.FC<TaskStatisticProps> = ({ overall = 0, success = 0, rate = 0, time = 0, children }) => {
  const formattedTime = new Intl.DateTimeFormat('en-GB', {
    minute: '2-digit',
    second: '2-digit',
  }).format(time);

  return (
    <>
      <ul className={css.TaskStatistic}>
        <li>
          <p>Overall</p>
          <span>{overall}</span>
        </li>
        <li>
          <p>Success</p>
          <span>{success}</span>
        </li>
        <li>
          <p>Success rate</p>
          <span>{rate}%</span>
        </li>
        <li>
          <p>Avr. time</p>
          <span>{formattedTime}</span>
        </li>
      </ul>
      {children && children}
    </>
  );
};

export default TaskStatistic;
