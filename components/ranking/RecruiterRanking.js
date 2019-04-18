import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { clientInstance } from '../../tools/request';

import adapter from '../../store/match/match-adapter';
import { updateRank, removeRank } from '../../store/match/recruiter';

import RankingCompose from './Ranking';
import ApplicantList from './ApplicantList';
import FinishStep from './FinishStep';
import RankingList from './RankingList';
import Confirmation from './Confirmation';

const matchAdapter = adapter(clientInstance());

const steps = [
  'Add to rank',
  'Arrange rank',
  'Finish',
];

export const RecruiterRanking = ({
  match, position, isUpdateRank, ranks = [],
  updateRank: updateRanking = () => {},
  removeRank: removeRanking = () => {},
}) => {
  const [step, handleStep] = useState(0);
  const [isOpenConfirm, toggleConfirm] = useState(false);

  function handleConfirm() {
    if (!isUpdateRank) {
      matchAdapter.postRecruiterRankingByMatchIdAndPositionId(match.id, position.id, ranks);
    } else {
      matchAdapter.updateRecruiterRankingByMatchIdAndPositionId(match.id, position.id, ranks);
    }
    toggleConfirm(false);
  }
  return (
    <RankingCompose
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
                  updateRanking={updateRanking}
                  removeRanking={removeRanking}
                />
              )
        }
      { step === 2 && (<FinishStep />) }
      <Confirmation
        handleConfirm={handleConfirm}
        isOpenConfirm={isOpenConfirm}
        toggleConfirm={toggleConfirm}
      />
    </RankingCompose>
  );
};

const mapStateToProps = state => ({
  match: state.match.match,
  position: state.recruiter.position,
  ranks: state.recruiter.ranks,
  isUpdateRank: state.recruiter.isUpdateRank,
});

const mapDispatchToRankProps = dispatch => ({
  updateRank: bindActionCreators(updateRank, dispatch),
  removeRank: bindActionCreators(removeRank, dispatch),
});

export default connect(mapStateToProps, mapDispatchToRankProps)(RecruiterRanking);
