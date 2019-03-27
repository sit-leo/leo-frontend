import 'antd/dist/antd.min.css';

import React from 'react';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import withReduxStore from '../tools/with-redux-store';

export default withReduxStore(
  class MyApp extends App {
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
