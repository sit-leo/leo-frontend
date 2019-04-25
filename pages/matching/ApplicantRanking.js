import React from 'react';
import { connect } from 'react-redux';

import { withAuth } from '../../tools/with-auth';
import { serverInstance } from '../../tools/request';
import cookie from '../../tools/cookie';

import matchAdapter from '../../store/match/match-adapter';
import matchingAdapter from '../../store/matching/matching-adapter';

import { setMatch } from '../../store/match';
import {
  setHaveRank,
  setPositions,
  setApplicantRanks,
} from '../../store/matching/ranking';

import ApplicantRankingPage from '../../components/matching/ApplicantRankingPage';

class ApplicantRankingController extends React.Component {
  static async getInitialProps({ store, query, req }) {
    const matchRequest = matchAdapter(serverInstance(cookie.getToken(req)));
    const matchingRequest = matchingAdapter(serverInstance(cookie.getToken(req)));

    const { matchId } = query;
    const match = await matchRequest.getMatchByMatchId(matchId);
    const positions = await matchingRequest.getMatchPositionsByMatchId(matchId);
    const ranks = await matchingRequest.getApplicantRankingByMatchId(matchId);

    await store.dispatch(setMatch(match));
    await store.dispatch(setPositions(positions));
    if (ranks && ranks.length > 0) {
      await store.dispatch(setApplicantRanks(ranks));
      await store.dispatch(setHaveRank(true));
    }
    return {};
  }

  render() {
    return <ApplicantRankingPage />;
  }
}

export default withAuth(
  connect()(ApplicantRankingController),
);
