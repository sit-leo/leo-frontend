import React from 'react';
import { connect } from 'react-redux';

import { withAuth } from '../../tools/with-auth';
import withUser from '../../tools/with-user';
// import { serverInstance } from '../../tools/request';
// import cookie from '../../tools/cookie';

import AdminPage from '../../components/admin/AdminPage';

class AdminController extends React.Component {
  static async getInitialProps({
    store, query, req, res,
  }) {
    return {};
  }

  render() {
    return <AdminPage />;
  }
}

export default withUser(
  withAuth(
    connect()(AdminController),
  ),
);
