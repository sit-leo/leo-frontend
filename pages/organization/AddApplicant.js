import React from 'react';
import { connect } from 'react-redux';

import { serverInstance } from '../../tools/request';
import cookie from '../../tools/cookie';

import { withAuth } from '../../tools/with-auth';
import withUser from '../../tools/with-user';

import organizationAdapter from '../../store/organization/organization-adapter';

import { setApplicants } from '../../store/organization';

import AddApplicantPage from '../../components/organization/AddApplicantPage';

class AddApplicantController extends React.Component {
  static async getInitialProps({
    store, query, req, res,
  }) {
    const organizationRequest = organizationAdapter(serverInstance(cookie.getToken(req)));

    const applicants = await organizationRequest.getNotJoinedApplicantsByOrganization();

    store.dispatch(setApplicants(applicants));

    return {};
  }

  render() {
    return <AddApplicantPage />;
  }
}

export default withUser(
  withAuth(
    connect()(AddApplicantController),
  ),
);
