import { userQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const CURRENT_CAMPER_QUERY = gql`
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

const CurrentCamper = props => {
  const { loading, error, data } = useQuery(CURRENT_CAMPER_QUERY);

  return <div>...</div>;
};

export default CurrentCamper;
