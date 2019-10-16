import React, { Component } from 'react';
import { connect } from 'react-redux';

export const ROLE_APPLICANT = 'applicant';
export const ROLE_RECRUITER = 'recruiter';
export const ROLE_ORGANIZER = 'organizer';

export function isApplicant(userRole) {
  return userRole === ROLE_APPLICANT;
}

export function isRecruiter(userRole) {
  return userRole === ROLE_RECRUITER;
}

export function isOrganizer(userRole) {
  return userRole === ROLE_ORGANIZER;
}

function redirectToRoot(res) {
  if (res) {
    res.writeHead(302, { Location: '/' });
    res.end();
  } else {
    document.location.pathname = '/';
  }
}

const withRole = checkRole => WrappedComponent => connect()(
  class extends Component {
    static async getInitialProps(ctx) {
      const props = WrappedComponent.getInitialProps
        && (await WrappedComponent.getInitialProps(ctx));

      if (!checkRole(props.user.role)) {
        redirectToRoot(ctx.res);
      }

      return { ...props };
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  },
);

export default withRole;
