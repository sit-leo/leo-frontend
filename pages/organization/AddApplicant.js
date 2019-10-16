import React from 'react';
import { connect } from 'react-redux';

import { withAuth } from '../../tools/with-auth';
import withUser from '../../tools/with-user';

import AddApplicantPage from '../../components/organization/AddApplicantPage';

class AddApplicantController extends React.Component {
  static async getInitialProps({
    store, query, req, res,
  }) {
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
