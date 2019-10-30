import React from 'react';
import { connect } from 'react-redux';

import cookie from '../tools/cookie';

import LandingPage from '../components/landing';
import { setLoading } from '../store/global';

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
    store.dispatch(setLoading(false));
    return {};
  }

  render() {
    return <LandingPage />;
  }
}

export default connect()(LandingController);
