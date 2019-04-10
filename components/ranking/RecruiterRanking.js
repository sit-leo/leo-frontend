import React, { useState } from 'react';
import { connect } from 'react-redux';

import Ranking from './Ranking';
import ApplicantList from './ApplicantList';
import Finish from './Finish';
import RankingList from './RankingList';

const steps = [
  'Add Ranks',
  'Order Ranks',
  'Finish',
];

export const RecruiterRanking = ({
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
      { step === 0 && (<ApplicantList />) }
      { step === 1
              && (
                <RankingList
                  ranks={ranks}
                  isOpenConfirm={isOpenConfirm}
                  toggleConfirm={toggleConfirm}
                />
              )
        }
      { step === 2 && (<Finish />) }
    </Ranking>
  );
};

const mapStateToProps = state => ({
  match: state.match.match,
  ranks: state.recruiter.ranks,
});

export default connect(mapStateToProps)(RecruiterRanking);
