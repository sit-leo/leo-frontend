import React from 'react';
import { connect } from 'react-redux';

import { serverInstance } from '../../tools/request';
import cookie from '../../tools/cookie';
import adapter from '../../store/match/match-adapter';

import { setMatch } from '../../store/match';
import { setApplicants, setRanks, setIsUpdateRank } from '../../store/match/recruiter';

import RecruiterRanking from '../../components/ranking/RecruiterRanking';

class RecruiterRankingPage extends React.Component {
  static async getInitialProps({ store, query, req }) {
    const matchAdapter = adapter(serverInstance(cookie.getToken(req)));
    const match = await matchAdapter.getMatchByMatchId(query.matchId);
    const applicants = await matchAdapter.getApplicantsByMatchId(query.matchId);
    const ranks = await matchAdapter.getRecruiterRankingByMatchIdAndPositionId(query.matchId);
    await store.dispatch(setMatch(match));
    await store.dispatch(setApplicants(applicants));
    if (ranks && ranks.length > 0) {
      await store.dispatch(setRanks(ranks));
      await store.dispatch(setIsUpdateRank(true));
    }
    return {};
  }

  render() {
    return <RecruiterRanking />;
  }
}

export default connect()(RecruiterRankingPage);
