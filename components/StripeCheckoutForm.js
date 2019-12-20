import { StripeProvider, Elements } from 'react-stripe-elements';
import InjectedCheckoutForm from '../components/InjectedCheckoutForm';

class StripeCheckoutForm extends React.Component {
  constructor() {
    super();
    this.state = { stripe: null };
  }

  componentDidMount() {
    // only fires in browser/DOM environment
    this.setState({
      stripe: window.Stripe('pk_test_UAxQ0aZr3Nla1TPkosBOAa73'),
    });
  }

  render() {
    return (
      <StripeProvider stripe={this.state.stripe}>
        <Elements>
          <InjectedCheckoutForm />
        </Elements>
      </StripeProvider>
    );
  }
}

export default StripeCheckoutForm;
