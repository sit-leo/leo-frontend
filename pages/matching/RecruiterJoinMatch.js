import React from 'react';
import { connect } from 'react-redux';

import withUser from '../../tools/with-user';
import { withAuth } from '../../tools/with-auth';

import RecruiterJoinMatchPage from '../../components/matching/RecruiterJoinMatchPage';

class RecruiterJoinMatchController extends React.Component {
  static async getInitialProps({ store, req }) {
    return {};
  }

  render() {
    return (
      <RecruiterJoinMatchPage />
    );
  }
}

export default withUser(
  withAuth(
    connect()(RecruiterJoinMatchController),
  ),
);
