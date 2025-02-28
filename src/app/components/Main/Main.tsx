import css from './Main.module.scss';

const Main = ({ children }: { children: React.ReactNode }) => <main className={css.Main}>{children}</main>;

export default Main;
