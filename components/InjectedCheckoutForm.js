/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { injectStripe, CardElement } from 'react-stripe-elements';
import { formStyles } from './styles/form';

const InjectedCheckoutForm = () => (
  <fieldset>
    <div className="divider">
      <hr />
      <span>Payment Information</span>
    </div>
    <CardElement />
  </fieldset>
);

export default injectStripe(InjectedCheckoutForm);
