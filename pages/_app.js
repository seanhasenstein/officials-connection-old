import App from 'next/app';
import { Global } from '@emotion/core';
import { globalReset } from '../components/styles/globalReset';

class MyApp extends App {
  render() {
    const { Component } = this.props;

    return (
      <>
        <Global styles={globalReset} />
        <Component />
      </>
    );
  }
}

export default MyApp;
