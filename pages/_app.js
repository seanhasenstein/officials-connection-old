import App from 'next/app';
import Head from 'next/head';
import { Global } from '@emotion/core';
import { ApolloProvider } from '@apollo/react-hooks';
import { globalReset } from '../components/styles/globalReset';
import withData from '../lib/apollo';

class MyApp extends App {
  render() {
    const { Component, pageProps, apollo } = this.props;

    return (
      <>
        <Global styles={globalReset} />
        <Head>
          <title>
            Officials Connection - Wisconsin Basketball Yearbook Officials Camps
          </title>
          <script src="https://js.stripe.com/v3/" />
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css?family=Barlow+Condensed:400,500|Montserrat:300,400&display=swap"
            rel="stylesheet"
          />
        </Head>
        <ApolloProvider client={apollo}>
          <Component {...pageProps} />
        </ApolloProvider>
      </>
    );
  }
}

export default withData(MyApp);
