import React from 'react';

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

export default DashboardController;
