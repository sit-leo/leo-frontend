import React from 'react';

import { setMatch, getMatchByMatchId } from '../../store/match';

import MatchPage from '../../components/matches/match';

class MatchSSR extends React.Component {
  static async getInitialProps({ store }) {
    const match = await getMatchByMatchId();
    await store.dispatch(setMatch(match));
    return { match: store.getState().match.match };
  }

  render() {
    const { match } = this.props;
    return <MatchPage match={match} />;
  }
}

export default MatchSSR;
