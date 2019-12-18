import { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import { CURRENT_CAMPER_QUERY } from './CurrentCamper';

const Authenticated = ({ children }) => {
  const { loading, error, data } = useQuery(CURRENT_CAMPER_QUERY);
  const router = useRouter();

  if (loading) return <div>Loading...</div>;
  if (!data.camper) {
    if (typeof window !== 'undefined') router.push('/login');
  }

  return children;
};

export default Authenticated;
