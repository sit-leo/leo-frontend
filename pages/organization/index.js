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
      res.writeHead(302, { Location: '/organizations/dashboard' });
      res.end();
    }

    return {};
  }

  render() {
    return <div>Orgainzations Controller</div>;
  }
}


export default withUser(
  withAuth(
    connect()(OrganizationController),
  ),
);
