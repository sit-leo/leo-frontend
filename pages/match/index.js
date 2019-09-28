import React from 'react';
import { connect } from 'react-redux';

import { withAuth } from '../../tools/with-auth';
import withUser from '../../tools/with-user';
import { serverInstance } from '../../tools/request';
import cookie from '../../tools/cookie';
import redirectToError from '../../tools/redirect-error';

import adapter from '../../store/match/match-adapter';
import matchingAdapter from '../../store/matching/matching-adapter';

import { setMatch } from '../../store/match';
import { setJoined } from '../../store/matching/join';

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
    const matchingRequest = matchingAdapter(serverInstance(cookie.getToken(req)));

    const isJoined = await matchingRequest.isJoined(query.matchId);

    await store.dispatch(setMatch(match));
    await store.dispatch(setJoined(isJoined.joined));
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
