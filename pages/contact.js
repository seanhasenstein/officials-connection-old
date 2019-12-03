/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useReducer } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import theme from '../components/styles/theme';
import { emailFormat } from '../utils';

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
    case 'reset':
    default:
      return INITIAL_STATE;
  }
};

const Contact = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

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
    }
  };

  return (
    <Layout>
      <Head>
        <title>Contact - Officials Connection</title>
      </Head>
      <div css={styles}>
        <div className="heading">
          <h2>Contact Us</h2>
          <p>Send us a message and we will be with you as soon as we can.</p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="name">
              Full Name
              <input
                type="text"
                id="name"
                value={state.name}
                onChange={updateFieldValue('name')}
              />
              <span css={validationError}>{state.nameError}</span>
            </label>
            <label htmlFor="email">
              Email Address
              <input
                type="text"
                id="email"
                value={state.email}
                onChange={updateFieldValue('email')}
              />
              <span css={validationError}>{state.emailError}</span>
            </label>
            <label htmlFor="phone">
              Phone Number
              <input
                type="text"
                id="phone"
                value={state.phone}
                onChange={updateFieldValue('phone')}
              />
              <span css={validationError}>{state.phoneError}</span>
            </label>
            <label htmlFor="message">
              Message
              <textarea
                value={state.message}
                onChange={updateFieldValue('message')}
              />
              <span css={validationError}>{state.messageError}</span>
            </label>
            <button>Send Message</button>
            <input
              type="text"
              name="honeypot"
              id="honeypot"
              value={state.honeypot}
              onChange={updateFieldValue('honeypot')}
              className="honey"
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
    box-shadow: 0 0 7px rgba(0, 0, 0, 0.2);
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

  label {
    display: flex;
    flex-direction: column;
    margin: 0 0 40px;
    font-size: 1.3rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1.2px;
  }

  input,
  textarea {
    width: 100%;
    margin-top: 10px;
    background: rgba(255, 255, 255, 0.25);
    border: 1px solid #cdcccf;
    border-radius: 3px;
    font-size: 1.6rem;
    letter-spacing: 0.2px;
    font-family: ${theme.fonts.default};
  }

  input {
    height: 45px;
    padding: 12px;

    &.honey {
      position: absolute;
      top: 0;
      left: 0;
      height: 1px;
      width: 1px;
      background: none;
      border: none;
      box-shadow: none;
      color: none;
      z-index: -999;
      padding: 0;
      margin: 0;
      line-height: 0;
    }
  }

  textarea {
    min-height: 200px;
    resize: vertical;
    padding: 15px;
  }

  input:focus,
  textarea:focus {
    outline: 0px;
    border-color: #403000;
  }
`;

const validationError = css`
  color: #fc2c2b;
  font-size: 1.3rem;
  letter-spacing: 0.25px;
  text-transform: none;
  margin-top: 6px;
`;

export default Contact;
