import { useState, useEffect } from 'react';
import App from 'next/app';
import Head from 'next/head';
import { Global } from '@emotion/core';
import { globalReset } from '../components/styles/globalReset';
import { ApolloProvider } from '@apollo/react-hooks';
import client from '../lib/apollo';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <ApolloProvider client={client}>
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
      </ApolloProvider>
    );
  }
}

export default MyApp;
