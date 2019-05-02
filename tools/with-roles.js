import React, { Component } from 'react';

import { serverInstance } from './request';

import userAdapter from '../store/user/user-adapter';

export const ROLE_APPLICANT = 'applicant';
export const ROLE_RECRUITER = 'recruiter';

export function isApplicant(userRole) {
  return userRole === ROLE_APPLICANT;
}

export function isRecruiter(userRole) {
  return userRole === ROLE_RECRUITER;
}

function redirectToRoot(res) {
  if (res) {
    res.writeHead(302, { Location: '/' });
    res.end();
  } else {
    document.location.pathname = '/';
  }
}

const withRole = checkRole => WrappedComponent => class extends Component {
  static async getInitialProps(ctx) {
    const props = WrappedComponent.getInitialProps
        && (await WrappedComponent.getInitialProps(ctx));

    const userRequest = userAdapter(serverInstance(props.token));
    const user = await userRequest.getUser();

    if (!checkRole(user.role)) {
      redirectToRoot(ctx.res);
    }

    return { ...props, user };
  }

  render() {
    return <WrappedComponent {...this.props} />;
  }
};

export default withRole;
