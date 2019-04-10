import React from 'react';
import { connect } from 'react-redux';

import { serverInstance } from '../../tools/request';
import cookie from '../../tools/cookie';
import adapter from '../../store/match/match-adapter';

import { setMatch } from '../../store/match';
import { setPositions, setRanks, setIsUpdateRank } from '../../store/match/applicant';

import ApplicantRanking from '../../components/ranking/ApplicantRanking';

class ApplicantRankingPage extends React.Component {
  static async getInitialProps({ store, query, req }) {
    const matchAdapter = adapter(serverInstance(cookie.getToken(req)));
    const match = await matchAdapter.getMatchByMatchId(query.matchId);
    const positions = await matchAdapter.getMatchPositionsByMatchId(query.matchId);
    const ranks = await matchAdapter.getApplicantRankingByMatchId(query.matchId);
    await store.dispatch(setMatch(match));
    await store.dispatch(setPositions(positions));
    if (ranks && ranks.length > 0) {
      await store.dispatch(setRanks(ranks));
      await store.dispatch(setIsUpdateRank(true));
    }
    return {};
  }

  render() {
    return <ApplicantRanking />;
  }
}

export default connect()(ApplicantRankingPage);
