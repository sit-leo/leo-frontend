import React from 'react';
import { connect } from 'react-redux';

import { redirectToRecruiterRanking } from '../../store/matching/matching-adapter';

import RecruiterPosition from './RecruiterPosition';

const RecruiterPositionPage = ({
  match,
  positions = [],
}) => (
  <RecruiterPosition match={match} positions={positions} redirect={redirectToRecruiterRanking} />
);

const mapStateToProps = state => ({
  match: state.match.match,
  positions: state.ranking.positions,
});

export default connect(mapStateToProps)(RecruiterPositionPage);
