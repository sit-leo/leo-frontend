import React from 'react';
import { connect } from 'react-redux';

import { withAuth } from '../../tools/with-auth';
import withUser from '../../tools/with-user';

import AddRecruiterPage from '../../components/organization/AddRecruiterPage';

class AddRecruiterController extends React.Component {
  static async getInitialProps({
    store, query, req, res,
  }) {
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
