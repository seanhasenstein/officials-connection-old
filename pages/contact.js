/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useReducer, useRef, useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import theme from '../components/styles/theme';
import { formStyles } from '../components/styles/form';
import { emailFormat } from '../utils';
import SuccessIcon from '../components/icons/SuccessIcon';
import ErrorIcon from '../components/icons/ErrorIcon';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const NEW_MESSAGE_MUTATION = gql`
  mutation NEW_MESSAGE_MUTATION($input: NewMessageInput!) {
    newMessage(input: $input) {
      name
      email
      phone
      message
    }
  }
`;

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
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'updateField':
      return { ...state, [action.field]: action.value };
    case 'updateStatus':
      return { ...state, status: action.status };
    case 'reset':
    default:
      return INITIAL_STATE;
  }
};

const Contact = () => {
  const [
    newMessage,
    { data = {}, error: mutationError, loading: mutationLoading },
  ] = useMutation(NEW_MESSAGE_MUTATION, {
    onCompleted: data => {
      setStatus('SUCCESS');
      dispatch({ type: 'reset' });
      window.scrollTo(0, 0);
      statusBox.current.focus();
    },
    onError: error => {
      setStatus('ERROR');
      window.scrollTo(0, 0);
      statusBox.current.focus();
      console.log(error);
    },
  });
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [status, setStatus] = useState('IDLE');
  const statusBox = useRef();

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

  const handleSubmit = async e => {
    e.preventDefault();

    if (state.honeypot) {
      console.log('honeypot triggered!');
      return;
    }

    const isValid = validateForm();

    if (isValid) {
      await newMessage({
        variables: {
          input: {
            name: state.name,
            email: state.email,
            phone: state.phone,
            message: state.message,
          },
        },
      });
    }
  };

  return (
    <Layout>
      <Head>
        <title>Contact - Officials Connection</title>
      </Head>

      {status === 'ERROR' ? (
        <div css={errorMessage} ref={statusBox} tabIndex="-1">
          <ErrorIcon />
          <div className="message">
            <h3>Connection Error!</h3>
            <p>Something went wrong, please try again.</p>
          </div>
          <button onClick={() => setStatus('IDLE')} />
        </div>
      ) : null}
      {status === 'SUCCESS' ? (
        <div css={successMessage} ref={statusBox} tabIndex="-1">
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
          <p>
            Send us a message and we will get back to you as soon as we can.
          </p>
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
            {/* {mutationLoading ? <span>Loading...</span> : null} */}
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
    padding: 30px 20px;
    margin: 15px auto;
    background: #fff;
    background-image: linear-gradient(
        to right,
        rgba(255, 255, 255, 0.8) 40%,
        rgba(255, 255, 255, 0.8) 100%
      ),
      url('./images/contact.jpg');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: top left;
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

  textarea {
    min-height: 190px;
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

const errorMessage = css`
  width: calc(100% - 30px);
  margin: 5px auto;
  padding: 8px 5px;
  background: hsla(348, 31%, 97%, 1);
  background: linear-gradient(
    90deg,
    hsla(354, 53%, 96%, 1) 0%,
    hsla(11, 8%, 98%, 1) 100%
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
    width: 80px;
    fill: hsla(4, 84%, 64%, 1);
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
