import React from 'react';
import { connect } from 'react-redux';

import { serverInstance } from '../../tools/request';
import cookie from '../../tools/cookie';

import { withAuth } from '../../tools/with-auth';
import withUser from '../../tools/with-user';

import matchAdapter from '../../store/match/match-adapter';

import { setMatch } from '../../store/match';

import MatchManagementPage from '../../components/organization/MatchManagementPage';

class MatchManagementController extends React.Component {
  static async getInitialProps({
    store, query, req, res,
  }) {
    const matchRequest = matchAdapter(serverInstance(cookie.getToken(req)));

    const match = await matchRequest.getCurrentMatchByOrganization();

    if (!match.error) {
      store.dispatch(setMatch(match));
    }

    return {};
  }

  render() {
    return <MatchManagementPage />;
  }
}


export default withUser(
  withAuth(
    connect()(MatchManagementController),
  ),
);
