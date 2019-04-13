import React from 'react';
import { connect } from 'react-redux';

import { redirectToRecruiterRanking } from '../../store/match/match-adapter';

import WithNavbar from '../layouts/with-navbar';

import { Col } from '../base/Grid';
import { TitleMedium } from '../base/Text';
import Button from '../base/Button';

const Position = ({ match, position }) => (
  <Button className="my-3" onClick={() => redirectToRecruiterRanking(match.id, position.id)}>{position.name}</Button>
);

const PositionList = ({ match, positions = [] }) => (
  <div className="d-flex flex-column">
    {
      positions.map(position => <Position key={position.id} match={match} position={position} />)
    }
  </div>
);

const RecruiterPosition = ({ match, positions = [] }) => (
  <WithNavbar>
    <Col>
      <TitleMedium>
      Recruiter Position
      </TitleMedium>
      <PositionList match={match} positions={positions} />
    </Col>
  </WithNavbar>
);

const mapStateToProps = state => ({
  match: state.match.match,
  positions: state.recruiter.positions,
});

export default connect(mapStateToProps)(RecruiterPosition);
