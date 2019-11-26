import Head from 'next/head';
import Layout from '../components/Layout';
import Hero from '../components/Hero';

const Home = () => (
  <>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Layout>
      <Hero />
    </Layout>
  </>
);

export default Home;
