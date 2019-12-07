/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { formStyles } from '../components/styles/form';
import theme from '../components/styles/theme';
import Layout from '../components/Layout';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log({ username, password });
  };

  return (
    <Layout>
      <Head>
        <title>Login - Officials Connection</title>
      </Head>
      <main css={pageStyles}>
        <h3>Sign in to your Account</h3>
        <form css={formStyles} onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="inputSingle"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="inputSingle"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </fieldset>
          <button>Sign In</button>
        </form>
        <Link href="/forgot-password">
          <a>Forgot your password?</a>
        </Link>
      </main>
    </Layout>
  );
};

const pageStyles = css`
  max-width: 380px;
  width: calc(100% - 40px);
  min-height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;

  h3 {
    margin: 0 0 50px;
    text-align: center;
    font-size: 2.8rem;
    font-weight: 500;
  }

  a {
    display: block;
    margin: 30px 0 0;
    text-align: center;
    font-size: 1.6rem;
    color: ${theme.colors.mediumGrey};

    &:hover {
      color: ${theme.colors.darkGrey};
    }
  }
`;

export default Login;
