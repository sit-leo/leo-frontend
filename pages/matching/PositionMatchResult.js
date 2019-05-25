import React from 'react';
import { connect } from 'react-redux';

import withUser from '../../tools/with-user';
import { withAuth } from '../../tools/with-auth';
import { serverInstance } from '../../tools/request';

import { isAnnouceDate } from '../../tools/check-match-time';

import redirectError from '../../tools/redirect-error';

import cookie from '../../tools/cookie';

import matchAdapter from '../../store/match/match-adapter';
import matchingAdapter from '../../store/matching/matching-adapter';

import { setMatchResults } from '../../store/matching/ranking';

import MatchResultPage from '../../components/matching/MatchResultPage';

class MatchResultController extends React.Component {
  static async getInitialProps({
    store, req, res, query,
  }) {
    const { matchId, positionId } = query;
    const matchRequest = matchAdapter(serverInstance(cookie.getToken(req)));
    const matchingRequest = matchingAdapter(serverInstance(cookie.getToken(req)));

    const match = await matchRequest.getMatchByMatchId(matchId);

    if (match.error) {
      return redirectError({ req, res }, 'No Match Found.');
    }

    if (!isAnnouceDate(match.announceDate)) {
      return redirectError({ req, res }, 'Announce Day not started.');
    }

    const matchResults = await matchingRequest
      .getMatchResultByMatchId(matchId);
    const positionMatchResults = await matchResults
      .filter(({ position }) => position.id === +positionId);

    await store.dispatch(setMatchResults(positionMatchResults));

    return {};
  }

  render() {
    return <MatchResultPage />;
  }
}

export default withUser(
  withAuth(
    connect()(MatchResultController),
  ),
);
