import React from 'react';
import { connect } from 'react-redux';

import { withAuth } from '../../tools/with-auth';
import { withOrganizer } from '../../tools/with-roles';
import withUser from '../../tools/with-user';


import MyOrganizationsPage from '../../components/organization/MyOrganizationsPage';

class OrganizationController extends React.Component {
  static async getInitialProps({
    store, query, req, res,
  }) {
    return {};
  }

  render() {
    return <MyOrganizationsPage />;
  }
}


export default withOrganizer(
  withUser(
    withAuth(
      connect()(OrganizationController),
    ),
  ),
);
