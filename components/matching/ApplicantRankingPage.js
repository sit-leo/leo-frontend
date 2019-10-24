import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { clientInstance } from '../../tools/request';
import { mapFilesToPositions } from '../../tools/ranking-utils';

import matchingAdapter from '../../store/matching/matching-adapter';

import {
  updateApplicantRank,
  removeApplicantRank,
  setApplicantRanks as setApplicantRanksAction,
} from '../../store/matching/ranking';

import RankingPageContainer from './RankingPageContainer';
import PositionListStep from './PositionListStep';
import RankingStep from './RankingStep';
import Confirmation from './Confirmation';
import DocumentStep from './DocumentStep';

const matchingRequest = matchingAdapter(clientInstance());

const APPLICANT_RANKING_STEPS = [
  'Add to rank',
  'Arrange rank',
  'Upload documents',
];

export const ApplicantRanking = ({
  match,
  haveRank,
  files = [],
  applicantRanks = [],
  updateRank = () => {},
  removeRank = () => {},
  setApplicantRanks = () => {},
}) => {
  const [step, handleStep] = useState(0);
  const [isOpenConfirm, toggleConfirm] = useState(false);

  function handleConfirm() {
    const matchId = match.id;
    if (!haveRank) {
      matchingRequest.postApplicantRankingByMatchId(
        matchId, applicantRanks,
      );
    } else {
      matchingRequest.updateApplicantRankingByMatchId(
        matchId, applicantRanks,
      );
    }
    toggleConfirm(false);
    setApplicantRanks(mapFilesToPositions(applicantRanks, files));
  }
  return (
    <RankingPageContainer
      rankingSteps={APPLICANT_RANKING_STEPS}
      ranks={applicantRanks}
      removeRank={removeRank}
      rankCounter={applicantRanks.length}
      step={step}
      handleStep={handleStep}
      isOpenConfirm={isOpenConfirm}
      toggleConfirm={toggleConfirm}
    >
      { step === 0 && (<PositionListStep />) }
      { step === 1
              && (
                <RankingStep
                  ranks={applicantRanks}
                  isOpenConfirm={isOpenConfirm}
                  toggleConfirm={toggleConfirm}
                  updateRank={updateRank}
                  removeRank={removeRank}
                />
              )
            }
      { step === 2 && (<DocumentStep />) }
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
  applicantRanks: state.ranking.applicantRanks,
  haveRank: state.ranking.haveRank,
  files: state.profile.files,
});

const mapDispatchToRankProps = dispatch => ({
  updateRank: bindActionCreators(updateApplicantRank, dispatch),
  removeRank: bindActionCreators(removeApplicantRank, dispatch),
  setApplicantRanks: bindActionCreators(setApplicantRanksAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToRankProps)(ApplicantRanking);
