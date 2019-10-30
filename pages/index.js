import React from 'react';
import { connect } from 'react-redux';

import cookie from '../tools/cookie';

import LandingPage from '../components/landing';

class LandingController extends React.Component {
  static async getInitialProps({
    store, req, res,
  }) {
    const token = cookie.getToken(req);
    if (req && token) {
      res.writeHead(302, { Location: '/matches' });
      res.end();
      return { token };
    }
    return {};
  }

  render() {
    return <LandingPage />;
  }
}

export default connect()(LandingController);
