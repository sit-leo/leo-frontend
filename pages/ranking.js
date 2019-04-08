import React from 'react';
import { connect } from 'react-redux';

import request, { serverInstance } from '../tools/request';
import cookie from '../tools/cookie';
import adapter from '../store/match/match-adapter';

import { setMatch, setPositions } from '../store/match';

import RankingPage from '../components/ranking';

class Ranking extends React.Component {
  static async getInitialProps({ store, query, req }) {
    const matchAdapter = adapter(request(serverInstance(cookie.getToken(req))));
    const match = await matchAdapter.getMatchByMatchId(query.matchId);
    const positions = await matchAdapter.getPositionsByMatchId(query.matchId);
    await store.dispatch(setMatch(match));
    await store.dispatch(setPositions(positions));
    return {};
  }

  render() {
    return <RankingPage />;
  }
}

export default connect()(Ranking);
