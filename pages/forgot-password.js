/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Head from 'next/head';
import Layout from '../components/Layout';
import { emailFormat } from '../utils';
import { formStyles } from '../components/styles/form';
import Error from '../components/ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    resetRequest(email: $email) {
      message
    }
  }
`;

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [requestReset, { error, loading, called }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      onCompleted() {
        setEmail('');
      },
    }
  );

  const handleSubmit = async e => {
    e.preventDefault();

    if (!email) {
      setEmailError('Please include your email address');
      return;
    }
    if (email !== '' && !emailFormat(email)) {
      setEmailError('Invalid email address');
      return;
    }

    // reset emailError
    setEmailError('');

    const res = await requestReset({ variables: { email } });
    console.log(res);
  };

  return (
    <Layout>
      <Head>
        <title>Forgot Password - Officials Connection</title>
      </Head>
      <div css={styles}>
        <div className="heading">
          <h2>Forgot Your Password?</h2>
          <p>
            Please enter the email address associated with your account and we
            will email instructions on how to proceed.
          </p>
          <form method="POST" onSubmit={handleSubmit} css={formStyles}>
            <Error error={error} />
            {!error && !loading && called && (
              <div className="success">
                Success! Check your email for a reset link!
              </div>
            )}
            <fieldset>
              <label htmlFor="email">Email Address</label>
              <input
                type="text"
                id="email"
                className="inputSingle"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <span css={validationError}>{emailError}</span>
            </fieldset>
            <button disabled={loading}>
              {loading ? 'Loading...' : 'Submit Request'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

const styles = css`
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 15px 50px;
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

  p {
    margin-bottom: 50px;
  }

  .success {
    margin: 0 0 30px;
    color: #26855c;
    font-family: Barlow Condensed, sans-serif;
    letter-spacing: 0.25px;
    font-size: 1.8rem;
  }
`;

const validationError = css`
  color: #b80118;
  font-size: 1.3rem;
  letter-spacing: 0.25px;
  text-transform: none;
  margin-top: 6px;
  display: block;
`;

export default ForgotPassword;
