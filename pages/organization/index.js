import React from 'react';
import { connect } from 'react-redux';

import { withAuth } from '../../tools/with-auth';
import withUser from '../../tools/with-user';

class OrganizationController extends React.Component {
  static async getInitialProps({
    store, query, req, res,
  }) {
    const isAdmin = true;

    if (isAdmin) {
      res.writeHead(302, { Location: '/organization/dashboard' });
      res.end();
      return {};
    }

    res.writeHead(302, { Location: '/organization/matches' });
    res.end();
    return {};
  }
}


export default withUser(
  withAuth(
    connect()(OrganizationController),
  ),
);
