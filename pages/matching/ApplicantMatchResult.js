import React from 'react';
import { connect } from 'react-redux';

import withUser from '../../tools/with-user';
import { withAuth } from '../../tools/with-auth';
import withRole, { isApplicant } from '../../tools/with-roles';
import withJoinMatch from '../../tools/with-join-match';

import { serverInstance } from '../../tools/request';

import { isAnnouceDate } from '../../tools/match-time';

import redirectError from '../../tools/redirect-error';

import cookie from '../../tools/cookie';

import matchAdapter from '../../store/match/match-adapter';
import matchingAdapter from '../../store/matching/matching-adapter';

import { setMatchResults } from '../../store/matching/ranking';
import { setMatch } from '../../store/match';

import MatchResultPage from '../../components/matching/MatchResultPage';

class MatchResultController extends React.Component {
  static async getInitialProps({
    store, req, res, query,
  }) {
    const { matchId } = query;
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

    const matchResults = await matchingRequest.getMatchResultByMatchId(matchId);

    await store.dispatch(setMatch(match));
    await store.dispatch(setMatchResults(matchResults));
    return {};
  }

  render() {
    return <MatchResultPage />;
  }
}


export default withJoinMatch(
  withRole(isApplicant)(
    withUser(
      withAuth(
        connect()(MatchResultController),
      ),
    ),
  ),
);
