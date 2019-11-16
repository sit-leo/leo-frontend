import React, { Component } from 'react';
import { serverInstance } from './request';

import matchingAdapter from '../store/matching/matching-adapter';
import redirectToLogin from './redirect-login';
import redirectToError from './redirect-error';

const withJoinMatch = WrappedComponent => class extends Component {
  static async getInitialProps(ctx) {
    const props = WrappedComponent.getInitialProps
          && (await WrappedComponent.getInitialProps(ctx));

    const matchingRequest = matchingAdapter(serverInstance(props.token));

    const { matchId } = ctx.query;
    const isJoined = await matchingRequest.isJoined(matchId);

    if (isJoined.error) {
      redirectToLogin(ctx);
      return {};
    }

    if (!isJoined.joined) {
      redirectToError(ctx, "You're not joining this match.");
      return {};
    }

    return { ...props };
  }

  render() {
    return <WrappedComponent {...this.props} />;
  }
};

export default withJoinMatch;
