import { Button, ButtonsList } from './components';

const HomePage: React.FC = () => {
  return (
    <>
      <h1>Main page</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt necessitatibus molestias voluptates facere
        cumque, harum id autem vitae ad quasi eius excepturi reprehenderit iste, pariatur cum quod veniam quibusdam in.
      </p>
      <ButtonsList>
        <Button href="/login">Login</Button>
        <Button href="/create-new-project">Create New Project</Button>
      </ButtonsList>
    </>
  );
};

export default HomePage;
