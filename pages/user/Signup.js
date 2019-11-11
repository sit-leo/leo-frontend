import React from 'react';
import { connect } from 'react-redux';

import SignupPage from '../../components/user/SignupPage';

class SignupController extends React.Component {
  static async getInitialProps({
    store, query, req, res,
  }) {
    return {};
  }

  render() {
    return <SignupPage />;
  }
}

export default connect()(SignupController);
