import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addRank } from '../../store/match/applicant';

import { Col } from '../base/Grid';
import Button from '../base/Button';

import Position from './Position';

const PositionList = ({
  addRank: addRanking = () => {},
  positions = [{ name: 'No Position Found', capacity: 0 }],
}) => (
  <Col>
    {
        positions.map((position => (
          <Position
            key={position.id}
            position={position}
            actionButton={(
              <Button
                className="mt-2"
                type="button"
                onClick={() => addRanking(position)}
              >
                Add to rank
              </Button>
            )}
          />
        )))
    }
  </Col>
);

const mapStateToProps = state => ({
  positions: state.applicant.positions,
});

const mapDispatchToPositionProps = dispatch => ({
  addRank: bindActionCreators(addRank, dispatch),
});


export default connect(mapStateToProps, mapDispatchToPositionProps)(PositionList);
