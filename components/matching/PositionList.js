import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addRank } from '../../store/matching/applicant';

import Button from '../base/Button';

import RankingCard from './RankingCard';

const PositionList = ({
  addRank: addRanking = () => {},
  positions = [{ name: 'No Position Found', capacity: 0 }],
}) => (
  <React.Fragment>
    {
        positions.map((position => (
          <RankingCard
            key={position.id}
            title={position.name}
            value={position.money}
            subtitle={position.location}
            capacity={position.capacity}
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
  </React.Fragment>
);

const mapStateToProps = state => ({
  positions: state.applicant.positions,
});

const mapDispatchToPositionProps = dispatch => ({
  addRank: bindActionCreators(addRank, dispatch),
});


export default connect(mapStateToProps, mapDispatchToPositionProps)(PositionList);
