import React from 'react';
import styled from 'styled-components';
import Document, { Head, Main, NextScript } from 'next/document';

const Html = styled.html``;

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <style>{'body { margin: 0 } /* custom! */'}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
