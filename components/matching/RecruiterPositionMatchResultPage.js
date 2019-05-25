import React from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';

import RecruiterPosition from './RecruiterPosition';

function redirectToMatchResult(matchId, positionId) {
  return Router.push(`/matches/${matchId}/positions/${positionId}/result`);
}

const RecruiterPositionMatchResultPage = ({
  match,
  positions = [],
}) => (
  <RecruiterPosition
    match={match}
    positions={positions}
    redirect={redirectToMatchResult}
    textAction="Choose position to see match result"
  />
);

const mapStateToProps = state => ({
  match: state.match.match,
  positions: state.ranking.positions,
});

export default connect(mapStateToProps)(RecruiterPositionMatchResultPage);
