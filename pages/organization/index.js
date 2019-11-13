import React from 'react';
import { connect } from 'react-redux';

import { serverInstance } from '../../tools/request';
import cookie from '../../tools/cookie';

import { withAuth } from '../../tools/with-auth';
import { withOrganizer } from '../../tools/with-roles';
import withUser from '../../tools/with-user';

import profileAdapter from '../../store/profile/profile-adapter';

import { setOrganizations } from '../../store/organization';

import MyOrganizationsPage from '../../components/organization/MyOrganizationsPage';

class OrganizationController extends React.Component {
  static async getInitialProps({
    store, query, req, res,
  }) {
    const profileRequest = profileAdapter(serverInstance(cookie.getToken(req)));
    const organizations = await profileRequest.getOrganizations();

    if (!organizations.error) {
      store.dispatch(setOrganizations(organizations));
    }

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
