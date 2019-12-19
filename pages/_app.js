import App from 'next/app';
import Head from 'next/head';
import { Global } from '@emotion/core';
import { globalReset } from '../components/styles/globalReset';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Global styles={globalReset} />
        <Head>
          <title>
            Officials Connection - Wisconsin Basketball Yearbook Officials Camps
          </title>
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css?family=Barlow+Condensed:400,500|Montserrat:300,400&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Component {...pageProps} />
      </>
    );
  }
}

export default MyApp;
