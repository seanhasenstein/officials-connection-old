/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState, useEffect, useReducer } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  StripeProvider,
  Elements,
  CardElement,
  injectStripe,
} from 'react-stripe-elements';
import gql from 'graphql-tag';
import Head from 'next/head';
import Router from 'next/router';
import Layout from '../components/Layout';
import { formStyles } from '../components/styles/form';
import { formatRegFormDate } from '../utils';
import theme from '../components/styles/theme';
import StateSelectOptions from '../components/StateSelectOptions';
import SelectArrowIcon from '../components/icons/SelectArrowIcon';
import CheckIcon from '../components/icons/CheckIcon';

const INITIAL_STATE = {
  firstName: 'Sean',
  lastName: 'Hasenstein',
  email: 'seanhasenstein@gmail.com',
  phone: '(920) 207-5984',
  street1: '3705 N 50th St',
  street2: '123',
  city: 'Sheboygan',
  state: 'WI',
  zipcode: '53083',
  wiaaNumber: '1234567890',
  wiaaClassification: 'MASTER',
  foodAllergies: 'Gluten',
  emergencyContactName: 'Nate Hasenstein',
  emergencyContactPhone: '(920) 123-4567',
  notes: 'This is my note for you...',
  liabilityAgreement: true,
  password: 'password1234',
};

const reducer = (state, action) => {
  switch (action.type) {
    // case 'updateTotal':
    //   return {...state, total: total }
    case 'updateField':
      return { ...state, [action.field]: action.value };
    case 'reset':
    default:
      return INITIAL_STATE;
  }
};

const CAMP_SESSION_QUERY = gql`
  query CAMP_SESSIONS_QUERY($id: ID!) {
    camp(id: $id) {
      id
      sessions {
        id
        price
        attributes {
          competitionLevel
          wiaaClassifications
          dates
          timeFrames
          mechanics
        }
      }
    }
  }
`;

const CREATE_REGISTRATION_MUTATION = gql`
  mutation CREATE_REGISTRATION_MUTATION($input: NewRegistrationInput!) {
    createRegistration(input: $input) {
      id
      charge
      total
      notes
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
      sessions {
        id
        price
      }
      liabilityAgreement
      created_at
      updated_at
    }
  }
`;

const InjectedRegistrationForm = props => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState('IDLE');
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { loading, error, data } = useQuery(CAMP_SESSION_QUERY, {
    variables: { id: 'prod_GKSrwzHaMOWHvJ' },
  });
  const [createRegistration, { data: mutationData }] = useMutation(
    CREATE_REGISTRATION_MUTATION,
    {
      onCompleted() {
        setStatus('SUCCESS');
        Router.replace('/register', '/register-success', { shallow: true });
      },
      onError() {
        setStatus('ERROR');
      },
    }
  );

  const updateFieldValue = field => event => {
    dispatch({
      type: 'updateField',
      field,
      value: event.target.value,
    });
  };

  const handleCheckboxChange = e => {
    const value = e.target.checked;
    const name = e.target.name.split('-');
    const id = name[1];
    const price = Number(name[2]);

    // if checked is now true, add to cart array
    if (value === true) {
      // add price to the total
      setTotal(total + price);
      // add the item to the cart
      setCart([...cart, { id, price }]);
    }
    // if checked is now false, remove from cart array
    if (value === false) {
      // subtract value from total
      setTotal(total - price);
      // find index that needs to be removed
      const index = cart.findIndex(el => el.id === id);
      // copy the cart array
      const copy = [...cart];
      // remove index in copied array
      copy.splice(index, 1);
      // set cart state with copied array
      setCart(copy);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { token } = await props.stripe.createToken();

    const sessions = cart.map(item => item.id);

    const result = await createRegistration({
      variables: {
        input: {
          token: token.id,
          total,
          sessions,
          notes: state.notes,
          liabilityAgreement: state.liabilityAgreement,
          firstName: state.firstName,
          lastName: state.lastName,
          email: state.email,
          phone: state.phone,
          street1: state.street1,
          street2: state.street2,
          city: state.city,
          state: state.state,
          zipcode: state.zipcode,
          wiaaNumber: state.wiaaNumber,
          wiaaClassification: state.wiaaClassification,
          emergencyContactName: state.emergencyContactName,
          emergencyContactPhone: state.emergencyContactPhone,
          password: state.password,
        },
      },
    }).catch(error => console.error(error));
  };

  if (status === 'SUCCESS') {
    // const { sessions, total, id } = mutationData.createRegistration;
    // const {
    //   firstName,
    //   lastName,
    //   email,
    //   phone,
    // } = mutationData.createRegistration.camper;
    return (
      <Layout>
        <Head>
          <title>Successful Registration - Officials Connection</title>
        </Head>
        <div>
          <h2>You're successfully registered!</h2>
          <p>Hi Sean,</p>
          <p>
            This is your receipt for your 2020 WBYOC Registration. Below are the
            details of your payment.
          </p>
          <p>
            You should receive a confirmation email at seanhasenstein@gmail.com.
          </p>
          <ul>
            <li>
              <h3>Date</h3>
              <span>Jan. 20, 2020</span>
            </li>
            <li>
              <h3>Registration Total</h3>
              <span>$255.00</span>
            </li>
            <li>
              <h3>Sessions</h3>
              <ul>
                <li>Kaukauna Camp</li>
                <li>Women's College</li>
                <li>6/19 and 6/20</li>
              </ul>
              <ul>
                <li>Plymouth Camp</li>
                <li>High School</li>
                <li>7/12</li>
              </ul>
            </li>
          </ul>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Register - Officials Connection</title>
        <script src="https://js.stripe.com/v3/"></script>
      </Head>
      <div css={styles} className="checkout">
        <h2>2020 Camper Registration</h2>
        <p>
          Fill out the following form to register for either of our 2020 camps.
        </p>
        <form onSubmit={handleSubmit} css={formStyles}>
          {/* CHOOSE SESSIONS SECTION */}
          <div className="divider">
            <hr />
            <span>Choose Your Session(s)</span>
          </div>
          <fieldset>
            <label htmlFor="camp1">Kaukauna Camp</label>
            <div className="checkbox-list">
              {loading ? <div>Loading...</div> : null}
              {data
                ? data.camp.sessions.map(session => (
                    <div key={session.id}>
                      <input
                        type="checkbox"
                        id={`session-${session.id}`}
                        name={`session-${session.id}-${session.price}`}
                        checked={cart[session.id]}
                        onChange={handleCheckboxChange}
                      />
                      <label
                        htmlFor={`session-${session.id}`}
                        className="session"
                      >
                        <CheckIcon />
                        <ul>
                          <li>
                            {session.attributes.competitionLevel ===
                            'HIGHSCHOOL'
                              ? 'High School'
                              : null}
                            {session.attributes.competitionLevel ===
                            'MENSCOLLEGE'
                              ? "Men's College"
                              : null}
                            {session.attributes.competitionLevel ===
                            'WOMENSCOLLEGE'
                              ? "Women's College"
                              : null}
                            {session.attributes.wiaaClassifications[0] !==
                            'NOTAPPLICABLE'
                              ? ` (${session.attributes.wiaaClassifications
                                  .map((c, i, a) => {
                                    if (c === 'MASTER') c = 'Master';
                                    if (c === 'ALLLEVELS') c = 'All Levels';
                                    if (i === 0) return c;
                                    if (a.length === 2) {
                                      if (i === 1) return ` & ${c}`;
                                    }
                                    if (a.length === 3) {
                                      if (i === 1) return `, ${c}, `;
                                      if (i === 2) return ` & ${c}`;
                                    }
                                  })
                                  .join('')})`
                              : null}
                          </li>
                          <li>
                            {session.attributes.dates.map((d, i) => {
                              const date = formatRegFormDate(d);
                              if (i === 0) return date;
                              if (i === 1) return ` & ${date}`;
                            })}
                          </li>
                          <li>${session.price / 100}</li>
                          <li>{session.attributes.mechanics}</li>
                        </ul>
                      </label>
                    </div>
                  ))
                : null}
            </div>
          </fieldset>

          {/* CAMPER INFORMATION */}
          <div className="divider">
            <hr />
            <span>Camper Information</span>
          </div>
          {/* CAMPER CONTACT INFORMATION */}
          <fieldset>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              className="inputTop"
              value={state.firstName}
              onChange={updateFieldValue('firstName')}
            />
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              className="inputBottom"
              value={state.lastName}
              onChange={updateFieldValue('lastName')}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="inputSingle"
              value={state.email}
              onChange={updateFieldValue('email')}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              id="phone"
              id="phone"
              className="inputSingle"
              value={state.phone}
              onChange={updateFieldValue('phone')}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="address">Home Address</label>
            <input
              type="text"
              id="street1"
              name="street1"
              placeholder="Street Address"
              className="inputTop"
              value={state.street1}
              onChange={updateFieldValue('street1')}
            />
            <input
              type="text"
              id="street2"
              name="street2"
              placeholder="Apt. #"
              value={state.street2}
              onChange={updateFieldValue('street2')}
            />
            <input
              type="text"
              id="city"
              name="city"
              placeholder="City"
              value={state.city}
              onChange={updateFieldValue('city')}
            />
            <div className="select">
              <select value={state.state} onChange={updateFieldValue('state')}>
                <StateSelectOptions />
              </select>
              <SelectArrowIcon />
            </div>
            <input
              type="text"
              id="zipcode"
              name="zipcode"
              placeholder="Zip Code"
              className="inputBottom"
              value={state.zipcode}
              onChange={updateFieldValue('zipcode')}
            />
          </fieldset>

          {/* WIAA INFORMATION */}
          {/* Setup useReducer and if sessions selected includes hs then show these 2 fields */}
          <fieldset>
            <label htmlFor="wiaaNumber">WIAA Information</label>
            <div className="select">
              <select
                className="inputTop"
                value={state.wiaaClassification}
                onChange={updateFieldValue('wiaaClassification')}
              >
                <option>Select Your Classification</option>
                <option value="MASTER">Master</option>
                <option value="L5">L5</option>
                <option value="L4">L4</option>
                <option value="L3">L3</option>
                <option value="L2">L2</option>
                <option value="L1">L1</option>
                <option value="NEWOFFICIAL">New Official</option>
              </select>
              <SelectArrowIcon />
            </div>
            <input
              type="text"
              id="wiaaNumber"
              name="wiaaNumber"
              placeholder="WIAA Number"
              className="inputBottom"
              value={state.wiaaNumber}
              onChange={updateFieldValue('wiaaNumber')}
            />
          </fieldset>

          {/* FOOD ALLERGIES */}
          <fieldset>
            <label htmlFor="foodAllergies">Food Allergies</label>
            <textarea
              className="inputSingle"
              placeholder="Please list any food allergies that you have."
              value={state.foodAllergies}
              onChange={updateFieldValue('foodAllergies')}
            />
          </fieldset>

          {/* EMERGENCY CONTACT */}
          <fieldset>
            <label htmlFor="emergencyContact">Emergency Contact</label>
            <input
              type="text"
              id="ec-name"
              name="ec-name"
              placeholder="Name"
              className="inputTop"
              value={state.emergencyContactName}
              onChange={updateFieldValue('emergencyContactName')}
            />
            <input
              type="text"
              id="ec-number"
              name="ec-number"
              placeholder="Phone Number"
              className="inputBottom"
              value={state.emergencyContactPhone}
              onChange={updateFieldValue('emergencyContactPhone')}
            />
          </fieldset>

          <fieldset>
            <label htmlFor="notes">Registration Notes</label>
            <textarea
              className="inputSingle"
              placeholder="Please list any notes or questions that you may have regarding your camp registration..."
              value={state.notes}
              onChange={updateFieldValue('notes')}
            />
          </fieldset>

          {/* LIABILITY AGREEMENT */}
          <fieldset>
            <label htmlFor="agreement">Liability Agreement</label>
            <p>
              By clicking this box you agree to release the WBYOC from all
              liablity for injuries and illness while attending camp.
            </p>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  id="agreement"
                  name="agreement"
                  checked={state.liabilityAgreement}
                  onChange={updateFieldValue('liabilityAgreement')}
                />
                I agree to these terms.
              </label>
            </div>

            {/* STRIPE CC INFO */}
          </fieldset>
          <fieldset>
            <div className="divider">
              <hr />
              <span>Payment Information</span>
            </div>
            <CardElement />
          </fieldset>

          <button>Submit Registration</button>
        </form>
      </div>
    </Layout>
  );
};

// PAGE STYLES
const styles = css`
  width: calc(100% - 20px);
  margin: 50px auto;
  max-width: 450px;

  h2 {
    font-size: 2.4rem;
    font-weight: 400;
    margin-bottom: 30px;
  }

  p {
    margin-bottom: 30px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
  }

  .checkbox-list {
    label {
      padding: 15px 15px 18px;
      background: #fff;
      border-radius: 6px;
      border: 2px solid #eee;
      cursor: pointer;
      position: relative;
      /* box-shadow: 0 0 0 1px #e4e7eb, 0 2px 4px 0 rgba(0, 0, 0, 0.07),
        0 1px 1.5px 0 rgba(0, 0, 0, 0.05); */

      ul {
        position: relative;
      }

      li {
        color: #515151;
        position: relative;
        font-size: 1.5rem;
        letter-spacing: 0;

        &:first-of-type {
          font-weight: 600;
          letter-spacing: 0;
          margin-bottom: 9px;
          color: #222;
        }

        &:nth-of-type(2) {
          margin-bottom: 23px;
          color: hsla(215, 12%, 59%, 1);
        }

        &:nth-of-type(3),
        &:last-of-type {
          width: 50%;
          display: inline-block;
          margin-bottom: 0;
        }

        &:last-of-type {
          font-weight: 600;
          color: hsla(215, 12%, 59%, 1);
          text-align: right;
        }
      }
    }

    input {
      opacity: 0;
      width: 1px;
      height: 0;
      outline: none;
      box-shadow: none;
      border: 0;
      color: transparent;
      background: none;
      margin: 0;
      padding: 0;

      &:focus + label {
        outline: none;
        box-shadow: ${theme.outline.boxShadow};
      }

      &:checked:focus + label {
        box-shadow: none;
      }

      &:checked + label {
        background: hsla(166, 76%, 98%, 1);
        border-color: hsla(159, 47%, 50%, 1);

        li {
          color: hsla(175, 45%, 17%, 1);

          &:first-of-type {
            color: hsla(177, 36%, 30%, 1);
          }

          &:last-of-type {
            color: hsla(163, 43%, 32%, 0.85);
          }
        }

        svg.icon-check {
          display: block;
        }
      }
    }
  }

  svg.icon-check {
    width: 30px;
    position: absolute;
    top: 10px;
    right: 10px;
    display: none;

    .primary {
      fill: hsla(165, 51%, 77%, 1);
    }
    .secondary {
      fill: hsla(163, 77%, 20%, 1);
    }
  }
`;

// Wrapping component in StripeProvider
const RegistrationForm = injectStripe(InjectedRegistrationForm);

const Register = () => {
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    // if on the server...
    if (typeof window === 'undefined') return;

    // if on the client...
    if (window.Stripe) {
      setStripe(Stripe('pk_test_UAxQ0aZr3Nla1TPkosBOAa73'));
    }
  }, []);

  return (
    <StripeProvider stripe={stripe}>
      <Elements>
        <RegistrationForm />
      </Elements>
    </StripeProvider>
  );
};

export default Register;
