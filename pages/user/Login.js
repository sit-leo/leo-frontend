import React from 'react';
import { connect } from 'react-redux';

import LoginPage from '../../components/user/LoginPage';

class LoginController extends React.Component {
  static async getInitialProps({ store, req }) {
    return {};
  }

  render() {
    return <LoginPage />;
  }
}

export default connect()(LoginController);
