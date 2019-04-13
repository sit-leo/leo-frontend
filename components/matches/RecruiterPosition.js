import React from 'react';
import { connect } from 'react-redux';

import WithNavbar from '../layouts/with-navbar';

import { Col } from '../base/Grid';
import { TitleMedium } from '../base/Text';

const Position = ({ position }) => (
  <div>{position.name}</div>
);

const PositionList = ({ positions = [] }) => (
  <div>
    {
      positions.map(position => <Position key={position.id} position={position} />)
    }
  </div>
);

const RecruiterPosition = ({ positions = [] }) => (
  <WithNavbar>
    <Col>
      <TitleMedium>
      Recruiter Position
      </TitleMedium>
      <PositionList positions={positions} />
    </Col>
  </WithNavbar>
);

const mapStateToProps = state => ({
  positions: state.recruiter.positions,
});

export default connect(mapStateToProps)(RecruiterPosition);
