import css from './TasksPageContainer.module.scss';

interface TasksPageContainerProps {
  children: React.ReactNode;
}

const TasksPageContainer: React.FC<TasksPageContainerProps> = ({ children }) => (
  <section className={css.TasksPageContainer}>{children}</section>
);

export default TasksPageContainer;
