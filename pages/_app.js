import 'antd/dist/antd.min.css';

import React from 'react';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import withStore from 'next-redux-wrapper';

import initialState from '../store';

export default withStore(initialState)(
  class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
      return {
        pageProps: {
          ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
        },
      };
    }

    render() {
      const { Component, pageProps, store } = this.props;
      return (
        <Container>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </Container>
      );
    }
  },
);
