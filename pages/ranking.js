import React from 'react';
import { connect } from 'react-redux';

import { setPositions, getPositionsByMatchId } from '../store/match';

import RankingPage from '../components/ranking';

class Ranking extends React.Component {
  static async getInitialProps({ store, query }) {
    const positions = await getPositionsByMatchId(query.matchId);
    await store.dispatch(setPositions(positions));
    return {};
  }

  render() {
    return <RankingPage />;
  }
}


export default connect()(Ranking);
