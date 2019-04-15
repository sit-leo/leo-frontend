import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateRank, removeRank } from '../../store/match/applicant';

import Upload from './Upload';
import RankingList from './RankingList';
import PositionList from './PositionList';
import Ranking from './Ranking';

const steps = [
  'Add Ranks',
  'Order Ranks',
  'Upload Documents',
];

export const ApplicantRanking = ({
  ranks = [],
  updateRank: updateRanking = () => {},
  removeRank: removeRanking = () => {},
}) => {
  const [step, handleStep] = useState(0);
  const [isOpenConfirm, toggleConfirm] = useState(false);
  return (
    <Ranking
      ranks={ranks}
      steps={steps}
      step={step}
      handleStep={handleStep}
      isOpenConfirm={isOpenConfirm}
      toggleConfirm={toggleConfirm}
    >
      { step === 0 && (<PositionList />) }
      { step === 1
              && (
                <RankingList
                  ranks={ranks}
                  isOpenConfirm={isOpenConfirm}
                  toggleConfirm={toggleConfirm}
                  updateRanking={updateRanking}
                  removeRanking={removeRanking}
                />
              )
            }
      { step === 2 && (<Upload />) }
    </Ranking>
  );
};

const mapStateToProps = state => ({
  match: state.match.match,
  ranks: state.applicant.ranks,
});

const mapDispatchToRankProps = dispatch => ({
  updateRank: bindActionCreators(updateRank, dispatch),
  removeRank: bindActionCreators(removeRank, dispatch),
});

export default connect(mapStateToProps, mapDispatchToRankProps)(ApplicantRanking);
