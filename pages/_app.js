import 'antd/dist/antd.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { createGlobalStyle } from 'styled-components';

import withReduxStore from '../tools/with-redux-store';
import colors from '../config/color';
import font from '../config/font';


const GlobalStyle = createGlobalStyle`
  div#__next, html, body {
    background: ${colors.background};
    font-family: ${font.name}, sans-serif;
  }
`;

export default withReduxStore(
  class MyApp extends App {
    render() {
      const { Component, pageProps, store } = this.props;
      return (
        <Container>
          <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <link href="https://fonts.googleapis.com/css?family=Kanit:200,300,400,500&amp;subset=thai" rel="stylesheet" />
          </Head>
          <GlobalStyle />
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </Container>
      );
    }
  },
);
