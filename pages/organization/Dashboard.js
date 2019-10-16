import React from 'react';
import { connect } from 'react-redux';

import { withAuth } from '../../tools/with-auth';
import withUser from '../../tools/with-user';

import DashboardPage from '../../components/organization/DashboardPage';

class DashboardController extends React.Component {
  static async getInitialProps({
    store, query, req, res,
  }) {
    return {};
  }

  render() {
    return <DashboardPage />;
  }
}

export default withUser(
  withAuth(
    connect()(DashboardController),
  ),
);
