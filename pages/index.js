import React from 'react';
import { connect } from 'react-redux';

import cookie from '../tools/cookie';
import withUser from '../tools/with-user';

import LandingPage from '../components/landing';
import EventListPage from '../components/landing/EventListPage';

class LandingController extends React.Component {
  static async getInitialProps({
    store, req, user, ...props
  }) {
    const token = cookie.getToken(req);
    if (req && token) {
      return { isLoggedIn: true, token };
    }
    return { isLoggedIn: false };
  }

  render() {
    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      return <EventListPage />;
    }
    return <LandingPage />;
  }
}

export default withUser(
  connect()(LandingController),
);
