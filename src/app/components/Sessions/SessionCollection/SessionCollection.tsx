import css from './SessionCollection.module.scss';

interface SessionCollectionProps {
  children: React.ReactNode;
}

const SessionCollection: React.FC<SessionCollectionProps> = ({ children }) => {
  return <ul className={css.SessionCollection}>{children}</ul>;
};

export default SessionCollection;
