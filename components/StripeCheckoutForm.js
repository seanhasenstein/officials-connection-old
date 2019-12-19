import { StripeProvider, Elements } from 'react-stripe-elements';
import InjectedCheckoutForm from '../components/InjectedCheckoutForm';

const StripeCheckoutForm = () => {
  return (
    <StripeProvider apiKey={'pk_test_UAxQ0aZr3Nla1TPkosBOAa73'}>
      <Elements>
        <InjectedCheckoutForm />
      </Elements>
    </StripeProvider>
  );
};

export default StripeCheckoutForm;
