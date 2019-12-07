/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useReducer, useEffect, useRef } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import theme from '../components/styles/theme';
import { formStyles } from '../components/styles/form';
import { emailFormat } from '../utils';
import SuccessIcon from '../components/icons/SuccessIcon';

const INITIAL_STATE = {
  name: '',
  email: '',
  phone: '',
  message: '',
  honeypot: '',
  nameError: '',
  emailError: '',
  phoneError: '',
  messageError: '',
  status: 'IDLE',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'updateField':
      return { ...state, [action.field]: action.value };
    case 'updateStatus':
      return { ...state, status: action.status };
    case 'resetFormData':
      return { ...INITIAL_STATE, status: 'SUCCESS' };
    case 'reset':
    default:
      return INITIAL_STATE;
  }
};

const Contact = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const successBox = useRef();

  useEffect(() => {
    if (state.status === 'SUCCESS') {
      window.scrollTo(0, 0);
      successBox.current.focus();
      console.log(document.activeElement);
    }
    // clean up the function and allow scrolling again
    return () => (document.body.style.overflow = 'unset');
  });

  const setStatus = status => dispatch({ type: 'updateStatus', status });

  const updateFieldValue = field => event => {
    dispatch({
      type: 'updateField',
      field,
      value: event.target.value,
    });
  };

  const updateErrorValue = (field, value) => {
    dispatch({
      type: 'updateField',
      field,
      value,
    });
  };

  const validateForm = () => {
    let nameError, emailError, phoneError, messageError;

    if (!state.name) {
      nameError = 'Please include your name';
    }
    if (!state.email) emailError = 'Please include your email';
    if (state.email !== '' && !emailFormat(state.email))
      emailError = 'Your email is incomplete';
    if (!state.phone) phoneError = 'Please include your phone number';
    if (state.phone.split('').length < 10) {
      phoneError = 'Your phone number is incomplete';
    }
    if (!state.message) messageError = 'Please include your message';

    if (nameError || emailError || phoneError || messageError) {
      updateErrorValue('nameError', nameError);
      updateErrorValue('emailError', emailError);
      updateErrorValue('phoneError', phoneError);
      updateErrorValue('messageError', messageError);

      return false;
    }

    return true;
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (state.honeypot) {
      console.log('honeypot triggered!');
      return;
    }

    const isValid = validateForm();

    if (isValid) {
      console.log('Everything looks good, submitting the form!', state);

      // send api request to send contact form data
      // if error then setStatus('ERROR')
      // if success then setStatus('SUCCESS')
      setStatus('SUCCESS');
      dispatch({ type: 'resetFormData' });
      // TODO: set focus to success button?
    }
  };

  return (
    <Layout>
      <Head>
        <title>Contact - Officials Connection</title>
      </Head>
      {state.status === 'SUCCESS' ? (
        <div css={successMessage} ref={successBox} tabIndex="-1">
          <SuccessIcon />
          <div className="message">
            <h3>Message Receieved!</h3>
            <p>We will be with you shortly.</p>
          </div>
          <button onClick={() => setStatus('IDLE')} />
        </div>
      ) : null}
      <div css={styles}>
        <div className="heading">
          <h2>Contact Us</h2>
          <p>Send us a message and we will be with you as soon as we can.</p>
          <form onSubmit={handleSubmit} css={formStyles}>
            <fieldset>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={state.name}
                onChange={updateFieldValue('name')}
                className="inputSingle"
              />
              <span css={validationError}>{state.nameError}</span>
            </fieldset>
            <fieldset>
              <label htmlFor="email">Email Address</label>
              <input
                type="text"
                id="email"
                value={state.email}
                onChange={updateFieldValue('email')}
                className="inputSingle"
              />
              <span css={validationError}>{state.emailError}</span>
            </fieldset>
            <fieldset>
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                id="phone"
                value={state.phone}
                onChange={updateFieldValue('phone')}
                className="inputSingle"
              />
              <span css={validationError}>{state.phoneError}</span>
            </fieldset>
            <fieldset>
              <label htmlFor="message">Message</label>
              <textarea
                value={state.message}
                onChange={updateFieldValue('message')}
                className="inputSingle"
              />
              <span css={validationError}>{state.messageError}</span>
            </fieldset>
            <button>Send Message</button>
            <input
              type="text"
              name="honeypot"
              id="honeypot"
              value={state.honeypot}
              onChange={updateFieldValue('honeypot')}
              className="honeypot"
              tabIndex="-1"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

const styles = css`
  max-width: 600px;
  margin: 0 auto;
  padding: 0 15px;
  position: relative;

  .heading {
    background: #f6f6f6;
    padding: 30px 20px;
    margin: 15px auto;
    background-image: linear-gradient(
        to right,
        rgba(245, 245, 245, 0.8) 40%,
        rgba(245, 245, 245, 0.8) 100%
      ),
      url('./images/contact.jpg');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: top left;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    border-radius: 6px;
  }

  h2 {
    margin: 0 0 30px;
    font-size: 3rem;
    font-weight: 400;
    text-transform: uppercase;
  }

  p {
    font-size: 1.8rem;
    font-weight: 400;
    color: #333;
    margin-bottom: 50px;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const validationError = css`
  color: #fc2c2b;
  font-size: 1.3rem;
  letter-spacing: 0.25px;
  text-transform: none;
  margin-top: 6px;
`;

const successMessage = css`
  width: calc(100% - 30px);
  margin: 5px auto;
  padding: 8px 5px;
  background: rgb(241, 253, 242);
  background: linear-gradient(
    90deg,
    rgba(241, 253, 242, 1) 0%,
    rgba(249, 249, 249, 1) 100%
  );
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  position: relative;
  outline: none;

  svg {
    width: 76px;
    fill: #51d098;
    margin: 0 10px 0 0;
  }

  h3,
  p {
    color: ${theme.colors.darkGrey};
  }

  h3 {
    font-size: 2.4rem;
    font-weight: 400;
    margin: 0 0 3px;
  }

  p {
    font-size: 1.6rem;
    margin: 0;
  }

  button {
    padding: 0;
    position: absolute;
    top: 12px;
    right: 13px;
    display: inline-block;
    width: 18px;
    height: 18px;
    background: none;
    overflow: hidden;

    &:hover {
      &::before,
      &::after {
        background: ${theme.colors.mediumGrey};
      }
    }

    &::before,
    &::after {
      content: '';
      position: absolute;
      height: 2px;
      width: 100%;
      top: 50%;
      left: 0;
      margin-top: -1px;
      background: #ababab;
      border-radius: 8px;
    }
    &::before {
      transform: rotate(45deg);
    }
    &::after {
      transform: rotate(-45deg);
    }
  }
`;

export default Contact;
