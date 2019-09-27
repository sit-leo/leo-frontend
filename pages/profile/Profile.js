import React from 'react';
import { connect } from 'react-redux';

import { withAuth } from '../../tools/with-auth';
import withUser from '../../tools/with-user';

import ProfilePage from '../../components/user/ProfilePage';

class ProfileController extends React.Component {
  static async getInitialProps({ store, req }) {
    return {};
  }

  render() {
    return <ProfilePage />;
  }
}

export default withUser(
  withAuth(
    connect()(ProfileController),
  ),
);
