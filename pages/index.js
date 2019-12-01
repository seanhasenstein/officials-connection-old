import Layout from '../components/Layout';
import Hero from '../components/Hero';
import CampDetails from '../components/CampDetails';
import FeaturesDropdown from '../components/FeaturesDropdown';

const Home = () => (
  <>
    <Layout>
      <Hero />
      <CampDetails />
      <FeaturesDropdown />
    </Layout>
  </>
);

export default Home;
