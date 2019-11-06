import React from 'react';
import { connect } from 'react-redux';

import { serverInstance } from '../../tools/request';
import cookie from '../../tools/cookie';

import { withAuth } from '../../tools/with-auth';
import withUser from '../../tools/with-user';

import organizationAdapter from '../../store/organization/organization-adapter';

import { setRecruiters } from '../../store/organization';

import AddRecruiterPage from '../../components/organization/AddRecruiterPage';

class AddRecruiterController extends React.Component {
  static async getInitialProps({
    store, query, req, res,
  }) {
    const organizationRequest = organizationAdapter(serverInstance(cookie.getToken(req)));

    const recruiters = await organizationRequest.getNotJoinedRecruitersByOrganization();

    store.dispatch(setRecruiters(recruiters));

    return {};
  }

  render() {
    return <AddRecruiterPage />;
  }
}

export default withUser(
  withAuth(
    connect()(AddRecruiterController),
  ),
);
