/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { formStyles } from '../components/styles/form';
import { CURRENT_CAMPER_QUERY } from '../components/Camper';
import Error from '../components/ErrorMessage';

const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      firstName
      lastName
      updated_at
    }
  }
`;

const Reset = () => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [resetPassword, { error, loading, called, data }] = useMutation(
    RESET_PASSWORD_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_CAMPER_QUERY }],
    }
  );

  const validateForm = () => {
    let passwordError, confirmPasswordError;

    if (!password) {
      passwordError = 'Password is required';
    }
    if (password.length > 0 && password.length < 8) {
      passwordError = 'Password must be at least 8 characters';
    }
    if (!confirmPassword) {
      confirmPasswordError = 'Confirmed password is required';
    }

    if (passwordError || confirmPasswordError) {
      setPasswordError(passwordError);
      setConfirmPasswordError(confirmPasswordError);

      return false;
    }
    setPasswordError('');
    setConfirmPasswordError('');

    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      await resetPassword({
        variables: {
          resetToken: router.query.resetToken,
          password,
          confirmPassword,
        },
      }).catch(error => {
        console.error(error);
        throw new Error('Oh no! Something went wrong.');
      });
      setTimeout(
        () =>
          router.push(
            {
              pathname: '/dashboard',
              query: { password: 'updated' },
            },
            '/dashboard'
          ),
        4000
      );
    }
  };

  return (
    <Layout>
      <div css={styles}>
        <div className="heading">
          <h2>Reset Your Password</h2>
          <form method="POST" onSubmit={handleSubmit} css={formStyles}>
            <Error error={error} />
            {/* {!error && !loading && called && (
              <div className="success">
                Your password was successfuly changed! <br />
                Please wait while we redirect you to your profile...
              </div>
            )} */}
            <fieldset>
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="inputSingle"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <span css={validationError}>{passwordError}</span>
            </fieldset>
            <fieldset>
              <label htmlFor="password">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="inputSingle"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
              <span css={validationError}>{confirmPasswordError}</span>
            </fieldset>
            <button disabled={loading || data}>
              {loading && <span className="spinner" />}
              {data && <span className="spinner" />}
              {!loading && !data && 'Submit Reset'}
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

  .spinner {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    position: relative;
    opacity: 1;

    :before,
    :after {
      content: '';
      border: 2px solid #fff;
      border-radius: 50%;
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
    }
    :before {
      transform: scale(1, 1);
      opacity: 1;
      animation: waveBefore 0.6s infinite linear;
    }
    :after {
      transform: scale(0, 0);
      opacity: 0;
      animation: waveAfter 0.6s infinite linear;
    }
    @-webkit-keyframes waveAfter {
      from {
        -webkit-transform: scale(0.5, 0.5);
        opacity: 0;
      }
      to {
        -webkit-transform: scale(1, 1);
        opacity: 1;
      }
    }
    @keyframes waveAfter {
      from {
        transform: scale(0.5, 0.5);
        opacity: 0;
      }
      to {
        transform: scale(1, 1);
        opacity: 1;
      }
    }
    @-webkit-keyframes waveBefore {
      from {
        -webkit-transform: scale(1, 1);
        opacity: 1;
      }
      to {
        -webkit-transform: scale(1.5, 1.5);
        opacity: 0;
      }
    }
    @keyframes waveBefore {
      from {
        -webkit-transform: scale(1, 1);
        opacity: 1;
      }
      to {
        -webkit-transform: scale(1.5, 1.5);
        opacity: 0;
      }
    }
  }

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
    margin-bottom: 35px;
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
    line-height: 1.6;
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

export default Reset;
