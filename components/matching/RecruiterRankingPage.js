import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { clientInstance } from '../../tools/request';

import matchAdapter from '../../store/matching/matching-adapter';
import {
  updateRecruiterRank,
  removeRecruiterRank,
  setFinished as setFinishedAction,
} from '../../store/matching/ranking';

import RankingPageContainer from './RankingPageContainer';
import ApplicantListStep from './ApplicantListStep';
import RankingStep from './RankingStep';
import Confirmation from './Confirmation';
import FinishStep from './FinishStep';

const matchRequest = matchAdapter(clientInstance());

const RECRUITER_RANKING_STEPS = [
  'Add to rank',
  'Arrange rank',
  'Finish',
];

export const RecruiterRanking = ({
  match,
  position,
  haveRank,
  recruiterRanks = [],
  updateRank = () => {},
  removeRank = () => {},
  setFinished = () => {},
}) => {
  const [step, handleStep] = useState(0);
  const [isOpenConfirm, toggleConfirm] = useState(false);

  function handleConfirm() {
    const matchId = match.id;
    const positionId = position.id;
    if (!haveRank) {
      matchRequest.postRecruiterRankingByMatchIdAndPositionId(
        matchId, positionId, recruiterRanks,
      );
    } else {
      matchRequest.updateRecruiterRankingByMatchIdAndPositionId(
        matchId, positionId, recruiterRanks,
      );
    }
    toggleConfirm(false);
    return setFinished(true) && handleStep(2);
  }
  return (
    <RankingPageContainer
      rankingSteps={RECRUITER_RANKING_STEPS}
      ranks={recruiterRanks}
      removeRank={removeRank}
      rankCounter={recruiterRanks.length}
      step={step}
      handleStep={handleStep}
      isOpenConfirm={isOpenConfirm}
      toggleConfirm={toggleConfirm}
    >
      { step === 0 && (<ApplicantListStep />) }
      { step === 1
              && (
                <RankingStep
                  ranks={recruiterRanks}
                  isOpenConfirm={isOpenConfirm}
                  toggleConfirm={toggleConfirm}
                  updateRank={updateRank}
                  removeRank={removeRank}
                />
              )
        }
      { step === 2 && (<FinishStep />) }
      <Confirmation
        handleConfirm={handleConfirm}
        isOpenConfirm={isOpenConfirm}
        toggleConfirm={toggleConfirm}
      />
    </RankingPageContainer>
  );
};

const mapStateToProps = state => ({
  match: state.match.match,
  position: state.ranking.position,
  recruiterRanks: state.ranking.recruiterRanks,
  haveRank: state.ranking.haveRank,
});

const mapDispatchToRankProps = dispatch => ({
  updateRank: bindActionCreators(updateRecruiterRank, dispatch),
  removeRank: bindActionCreators(removeRecruiterRank, dispatch),
  setFinished: bindActionCreators(setFinishedAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToRankProps)(RecruiterRanking);
