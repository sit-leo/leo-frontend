import React from 'react';
import { connect } from 'react-redux';

import Card from '../base/Card';
import { TitleMedium } from '../base/Text';
import Position from './Position';

const PositionList = ({ positions = [{ name: 'No Position Found', capacity: 0 }] }) => (
  <Card>
    {
        positions.map((position => <Position key={position.id} position={position} />))
    }
  </Card>
);

const mapStateToProps = state => ({
  positions: state.match.positions,
});

export default connect(mapStateToProps)(PositionList);
