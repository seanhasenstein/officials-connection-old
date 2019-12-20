import { useQuery } from '@apollo/react-hooks';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import CampDetails from '../components/CampDetails';
import Features from '../components/Features';
import { CURRENT_CAMPER_QUERY } from '../components/Camper';

const Home = () => {
  const { loading, error, data } = useQuery(CURRENT_CAMPER_QUERY);

  return (
    <>
      <Layout>
        <Hero />
        <CampDetails />
        <Features />
      </Layout>
    </>
  );
};

export default Home;
