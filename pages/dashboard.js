import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Router from 'next/router';
import Layout from '../components/Layout';
import Login from './login';
import {
  useCamper,
  CURRENT_CAMPER_QUERY,
  CAMPER_LOGOUT_MUTATION,
} from '../components/Camper';

const Dashboard = () => {
  const [camperLogout] = useMutation(CAMPER_LOGOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_CAMPER_QUERY }],
  });
  const { loading, error, data } = useQuery(CURRENT_CAMPER_QUERY);

  const handleLogout = async () => {
    const result = await camperLogout();
    Router.push('/login');
  };

  if (loading) return <div>Loading...</div>;

  const { camper } = data;

  return (
    <>
      {!camper ? <Login /> : null}
      {camper && (
        <Layout>
          <h2>Hello, {camper.firstName},</h2>
          <button onClick={handleLogout}>Logout</button>
        </Layout>
      )}
    </>
  );
};

export default Dashboard;
