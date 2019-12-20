import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const CURRENT_CAMPER_QUERY = gql`
  query {
    camper {
      id
      firstName
      lastName
      email
      phone
      address {
        street1
        street2
        city
        state
        zipcode
      }
      wiaaNumber
      wiaaClassification
      foodAllergies
      emergencyContact {
        name
        phone
      }
    }
  }
`;

const CAMPER_LOGOUT_MUTATION = gql`
  mutation CAMPER_LOGOUT_MUTATION {
    camperLogout {
      message
    }
  }
`;

const useCamper = () => {
  const { data } = useQuery(CURRENT_CAMPER_QUERY);
  if (data) return data.camper;
};

export default <p>Hey</p>;
export { useCamper, CURRENT_CAMPER_QUERY, CAMPER_LOGOUT_MUTATION };
