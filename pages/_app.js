import 'antd/dist/antd.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import { createGlobalStyle } from 'styled-components';

import withReduxStore from '../tools/with-redux-store';
import colors from '../config/color';


const GlobalStyle = createGlobalStyle`
  div#__next, html, body {
    background: ${colors.background};
  }
`;

export default withReduxStore(
  class MyApp extends App {
    render() {
      const { Component, pageProps, store } = this.props;
      return (
        <Container>
          <GlobalStyle />
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </Container>
      );
    }
  },
);
