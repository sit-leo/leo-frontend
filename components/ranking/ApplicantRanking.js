import React, { useState } from 'react';
import { connect } from 'react-redux';

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

export default connect(mapStateToProps)(ApplicantRanking);
