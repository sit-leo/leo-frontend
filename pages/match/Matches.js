import React from 'react';
import { connect } from 'react-redux';

import { withAuth } from '../../tools/with-auth';
import withUser from '../../tools/with-user';

import EventListPage from '../../components/landing/EventListPage';
import { withOrganizer } from '../../tools/with-roles';

class LandingController extends React.Component {
  static async getInitialProps({
    store, req, res,
  }) {
    return {};
  }

  render() {
    return <EventListPage />;
  }
}

export default withOrganizer(
  withUser(
    withAuth(
      connect()(LandingController),
    ),
  ),
);
