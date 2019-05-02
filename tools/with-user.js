import React, { Component } from 'react';
import { serverInstance } from './request';

import userAdapter from '../store/user/user-adapter';

import { setId, setRole } from '../store/user';

const withUser = WrappedComponent => class extends Component {
  static async getInitialProps(ctx) {
    const props = WrappedComponent.getInitialProps
          && (await WrappedComponent.getInitialProps(ctx));

    const userRequest = userAdapter(serverInstance(props.token));
    const user = await userRequest.getUser();
    await ctx.store.dispatch(setId(user.id));
    await ctx.store.dispatch(setRole(user.role));

    return { ...props, user };
  }

  render() {
    return <WrappedComponent {...this.props} />;
  }
};

export default withUser;
