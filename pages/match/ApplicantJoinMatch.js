import React from 'react';
import { connect } from 'react-redux';

import withUser from '../../tools/with-user';
import { withAuth } from '../../tools/with-auth';

import ApplicantJoinMatchPage from '../../components/matches/ApplicantJoinMatchPage';

class ApplicantJoinMatchController extends React.Component {
  static async getInitialProps({ store, req }) {
    return {};
  }

  render() {
    return (
      <ApplicantJoinMatchPage />
    );
  }
}

export default withUser(
  withAuth(
    connect()(ApplicantJoinMatchController),
  ),
);
