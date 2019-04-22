import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addApplicantRank, setIsUpdateRank, removeApplicantRank } from '../../store/matching/ranking';

import RankingCard from './RankingCard';
import ActionButton from './ActionButton';


function isPositionInApplicantRanks(applicantRanks, positionId) {
  return applicantRanks.findIndex(rank => rank.positionId === positionId) !== -1;
}

const PositionList = ({
  positions,
  applicantRanks,
  addRank = () => {},
  removeRank = () => {},
  setIsUpdate = () => {},
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
              <ActionButton
                isInRank={!isPositionInApplicantRanks(applicantRanks, position.positionId)}
                addRank={() => setIsUpdate(true) && addRank(position)}
                removeRank={() => setIsUpdate(true) && removeRank(position)}
              />
            )}
          />
        )))
    }
  </React.Fragment>
);

const mapStateToProps = state => ({
  positions: state.ranking.positions,
  applicantRanks: state.ranking.applicantRanks,
});

const mapDispatchToPositionProps = dispatch => ({
  addRank: bindActionCreators(addApplicantRank, dispatch),
  removeRank: bindActionCreators(removeApplicantRank, dispatch),
  setIsUpdate: bindActionCreators(setIsUpdateRank, dispatch),
});

export default connect(mapStateToProps, mapDispatchToPositionProps)(PositionList);
