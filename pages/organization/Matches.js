import React from 'react';
import { connect } from 'react-redux';

import { withAuth } from '../../tools/with-auth';
import withUser from '../../tools/with-user';

import MatchesPage from '../../components/organization/MatchesPage';

class MatchesController extends React.Component {
  static async getInitialProps({
    store, query, req, res,
  }) {
    return {};
  }

  render() {
    return <MatchesPage />;
  }
}


export default withUser(
  withAuth(
    connect()(MatchesController),
  ),
);
