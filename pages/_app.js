import App from 'next/app';
import Head from 'next/head';
import { Global } from '@emotion/core';
import { globalReset } from '../components/styles/globalReset';

class MyApp extends App {
  render() {
    const { Component } = this.props;

    return (
      <>
        <Global styles={globalReset} />
        <Head>
          <title>
            Officials Connection - Wisconsin Basketball Yearbook Officials Camps
          </title>
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css?family=Barlow+Condensed:300,400,400i,500&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <Component />
      </>
    );
  }
}

export default MyApp;
