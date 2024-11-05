import { redirect } from 'next/navigation';

const Home = () => {
  // NOTE: this page.tsx is kept in order to later load unauthenticated content.
  redirect('/projects');
};

export default Home;
