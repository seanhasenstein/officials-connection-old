import Head from 'next/head';
import Brand from '../components/Brand';

const Login = () => {
  return (
    <>
      <Head>
        <title>Login - Officials Connection</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Brand />
      <main>
        <h3>Login Page</h3>
      </main>
    </>
  );
};

export default Login;
