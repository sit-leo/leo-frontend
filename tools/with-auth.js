import React, { Component } from 'react';
import Router from 'next/router';

import cookie from './cookie';
import redirectToLogin from './reditect-login';


export const auth = (ctx) => {
  const token = cookie.getToken(ctx.req);

  if (ctx.req && !token) {
    redirectToLogin(ctx);
    return;
  }

  // We already checked for server. This should only happen on client.
  if (!token) {
    Router.push('/login');
  }

  return token;
};

export const withAuth = WrappedComponent => class extends Component {
  static async getInitialProps(ctx) {
    const token = auth(ctx);

    const componentProps = WrappedComponent.getInitialProps
        && (await WrappedComponent.getInitialProps(ctx));

    return { ...componentProps, token };
  }

  render() {
    return <WrappedComponent {...this.props} />;
  }
};
