import React from 'react';
import { connect } from 'react-redux';

import { withAuth } from '../../tools/with-auth';
import withUser from '../../tools/with-user';
import { serverInstance } from '../../tools/request';
import cookie from '../../tools/cookie';
import redirectToError from '../../tools/redirect-error';

import adapter from '../../store/match/match-adapter';
import userAdapter from '../../store/user/user-adapter';

import { setRole, setId } from '../../store/user';
import { setMatch } from '../../store/match';

import MatchPage from '../../components/matches/MatchPage';

class MatchController extends React.Component {
  static async getInitialProps({
    store, query, req, res,
  }) {
    const matchAdapter = adapter(serverInstance(cookie.getToken(req)));
    const match = await matchAdapter.getMatchByMatchId(query.matchId);

    if (match.error) {
      return redirectToError({ req, res }, 'No Match Found.');
    }

    await store.dispatch(setMatch(match));
    return {};
  }

  render() {
    return <MatchPage />;
  }
}

export default withUser(
  withAuth(
    connect()(MatchController),
  ),
);
