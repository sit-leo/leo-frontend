import React from 'react';
import { connect } from 'react-redux';

import { serverInstance } from '../../tools/request';
import cookie from '../../tools/cookie';

import withUser from '../../tools/with-user';
import withRole, { isRecruiter } from '../../tools/with-roles';
import { withAuth } from '../../tools/with-auth';

import redirectError from '../../tools/redirect-error';

import { isAnnouceDate } from '../../tools/match-time';


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

    const { joined } = await matchingRequest.isJoined(matchId);

    if (!joined) {
      return redirectError({ req, res }, 'You are not joined this match.');
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

export default withRole(isRecruiter)(
  withUser(
    withAuth(
      connect()(MatchResultController),
    ),
  ),
);
