import React from 'react';
import { connect } from 'react-redux';

import Card from '../base/Card';
import Position from './Position';

const PositionList = ({ positions = [{ name: 'No Position Found', capacity: 0 }] }) => (
  <React.Fragment>
    {
        positions.map((position => <Position key={position.id} position={position} />))
    }
  </React.Fragment>
);

const mapStateToProps = state => ({
  positions: state.applicant.positions,
});

export default connect(mapStateToProps)(PositionList);
