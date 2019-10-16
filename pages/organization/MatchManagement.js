import React from 'react';
import { connect } from 'react-redux';

import { withAuth } from '../../tools/with-auth';
import withUser from '../../tools/with-user';

import MatchManagementPage from '../../components/organization/MatchManagementPage';

class MatchManagementController extends React.Component {
  static async getInitialProps({
    store, query, req, res,
  }) {
    return {};
  }

  render() {
    return <MatchManagementPage />;
  }
}


export default withUser(
  withAuth(
    connect()(MatchManagementController),
  ),
);
