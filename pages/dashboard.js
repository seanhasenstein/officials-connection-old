import Head from 'next/head';
import { useMutation } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import gql from 'graphql-tag';
import Authenticated from '../components/Authenticated';
import { CURRENT_CAMPER_QUERY } from '../components/CurrentCamper';

const CAMPER_LOGOUT_MUTATION = gql`
  mutation CAMPER_LOGOUT_MUTATION {
    camperLogout {
      message
    }
  }
`;

const Dashboard = () => {
  const router = useRouter();
  const [camperLogout] = useMutation(CAMPER_LOGOUT_MUTATION, {
    onCompleted() {
      if (typeof window !== 'undefined') router.push('/login');
    },
  });

  const handleLogout = () => {
    camperLogout();
  };

  return (
    <Authenticated>
      <Head>
        <title>Dashboard - Officials Connection</title>
      </Head>
      <h3>This will be the admin dashboard logged in page...</h3>
      <button onClick={handleLogout}>Logout</button>
    </Authenticated>
  );
};

export default Dashboard;
