import React from 'react';
import { connect } from 'react-redux';

import { serverInstance } from '../../tools/request';
import cookie from '../../tools/cookie';
import adapter from '../../store/match/match-adapter';

import { setMatch } from '../../store/match';

import MatchPage from '../../components/matches/match';

class MatchSSR extends React.Component {
  static async getInitialProps({ store, query, req }) {
    const matchAdapter = adapter(serverInstance(cookie.getToken(req)));
    const match = await matchAdapter.getMatchByMatchId(query.matchId);
    await store.dispatch(setMatch(match));
    return {};
  }

  render() {
    return <MatchPage />;
  }
}

export default connect()(MatchSSR);
