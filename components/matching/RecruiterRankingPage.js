import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { message } from 'antd';

import { clientInstance } from '../../tools/request';
import { sortRanks } from '../../tools/ranking-utils';

import matchAdapter from '../../store/matching/matching-adapter';
import {
  setLoading as setLoadingAction,
} from '../../store/global';
import {
  updateRecruiterRank,
  removeRecruiterRank,
  setFinished as setFinishedAction,
  setRecruiterRanks as setRecruiterRanksAction,
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
  setLoading = () => {},
  setRecruiterRanks = () => {},
}) => {
  const [step, handleStep] = useState(0);
  const [isOpenConfirm, toggleConfirm] = useState(false);

  async function handleConfirm() {
    const matchId = match.id;
    const positionId = position.id;
    setLoading(true);
    if (!haveRank) {
      await matchRequest.postRecruiterRankingByMatchIdAndPositionId(
        matchId, positionId, recruiterRanks,
      );
    } else {
      await matchRequest.updateRecruiterRankingByMatchIdAndPositionId(
        matchId, positionId, recruiterRanks,
      );
    }
    const sortedRecruiterRanks = recruiterRanks.sort(sortRanks);
    setRecruiterRanks(sortedRecruiterRanks);
    toggleConfirm(false);
    setLoading(false);
    setFinished(true);
    handleStep(2);
    message.success('Confirm ranking success.');
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
  setLoading: bindActionCreators(setLoadingAction, dispatch),
  setRecruiterRanks: bindActionCreators(setRecruiterRanksAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToRankProps)(RecruiterRanking);
