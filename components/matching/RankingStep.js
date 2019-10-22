import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getApplicantInformations, getPositionInformations } from '../../tools/ranking-informations';
import { isApplicant } from '../../tools/with-roles';

import { setIsUpdateRank } from '../../store/matching/ranking';

import Button from '../base/Button';
import { Title, TitleLarge, TextError } from '../base/Text';
import { Col } from '../base/Grid';
import { FlexCenter } from '../base/Flex';
import Icon, { DeletedIcon } from '../base/Icon';

import RankingCard from './RankingCard';

function isFirstRank(rankIndex) {
  return rankIndex === 1;
}

function isLastRank(rankIndex, rankCounter) {
  return rankIndex === rankCounter;
}

const RankingButton = ({
  rankIndex,
  rankCounter,
  increaseRank,
  decreaseRank,
}) => (
  <Title className="mb-0">
    <FlexCenter className="flex-column">
      <Icon
        disabled={isFirstRank(rankIndex)}
        type="caret-up"
        theme="filled"
        onClick={
          () => !isFirstRank(rankIndex) && increaseRank()
        }
      />
      <TitleLarge className="mb-0">{rankIndex}</TitleLarge>
      <Icon
        disabled={isLastRank(rankIndex, rankCounter)}
        type="caret-down"
        theme="filled"
        onClick={
         () => !isLastRank(rankIndex, rankCounter) && decreaseRank()
        }
      />
    </FlexCenter>
  </Title>
);

const ConfirmedButton = () => (
  <Button className="w-100">
    <Icon type="check" />
    Confirmed
  </Button>
);

const RankingErrorText = () => (
  <FlexCenter>
    <TextError className="my-3">
      Please select at least 1 in previous step.
    </TextError>
  </FlexCenter>
);

const RankingStep = ({
  role,
  isConfirm,
  haveRank,
  isUpdateRank,
  setIsUpdate = () => {},

  isOpenConfirm,
  toggleConfirm = () => {},

  ranks,
  updateRank = () => {},
  removeRank = () => {},
}) => {
  const rankCounter = ranks.length;

  function increaseRank(index, rank) {
    setIsUpdate(true);
    return updateRank(index - 1, rank);
  }

  function decreaseRank(index, rank) {
    setIsUpdate(true);
    return updateRank(index + 1, rank);
  }

  function remove(rank) {
    setIsUpdate(true);
    return removeRank(rank);
  }

  function getRankedNestedValue(ranked) {
    if (ranked.educations && Array.isArray(ranked.educations)) {
      return ranked.educations[0];
    }
    return ranked.recruiter;
  }

  function getApplicantDocuments(ranked) {
    return (ranked.documents && Array.isArray(ranked.documents) && ranked.documents.length);
  }

  return (
    <React.Fragment>
      {
        (rankCounter > 0)
          ? ranks.map((rank, index) => {
            const rankIndex = index + 1;
            const ranked = (rank.applicantMatch && rank.applicantMatch.applicant) || rank.position;
            const nestedValue = getRankedNestedValue(ranked);
            const subtitle = nestedValue.educationName || `${nestedValue.major}, ${nestedValue.university}`;
            const value = (nestedValue.gpax && `GPAX ${nestedValue.gpax}`) || ranked.money;
            const capacity = getApplicantDocuments(ranked) || ranked.capacity;
            const informations = isApplicant(role) ? getPositionInformations(rank.position) : getApplicantInformations(rank.applicantMatch);
            return (
              <RankingCard
                key={ranked.id}
                title={ranked.name}
                value={value}
                subtitle={subtitle}
                capacity={capacity}
                informations={informations}
                rankingButton={
                  <DeletedIcon type="delete" theme="filled" onClick={() => remove(rank)} />
                  }
                actionButton={
                    (
                      <RankingButton
                        rankIndex={rankIndex}
                        rankCounter={rankCounter}
                        increaseRank={() => increaseRank(index, rank)}
                        decreaseRank={() => decreaseRank(index, rank)}
                      />
                    )
                  }
              />
            );
          })
          : <RankingErrorText />
      }
      <Col lg={{ size: 4, offset: 4 }}>
        {
          isConfirm ? (<ConfirmedButton />)
            : (
              <Button
                className="w-100"
                disabled={rankCounter === 0 || !isUpdateRank}
                onClick={() => toggleConfirm(!isOpenConfirm)}
              >
                {
                  !(haveRank && isUpdateRank)
                    ? 'Confirm Ranking'
                    : 'Update Ranking'
                }
              </Button>
            )
        }
      </Col>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  role: state.user.role,
  isConfirm: state.ranking.isConfirm,
  haveRank: state.ranking.haveRank,
  isUpdateRank: state.ranking.isUpdateRank,
});

const mapDispatchToProps = dispatch => ({
  setIsUpdate: bindActionCreators(setIsUpdateRank, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RankingStep);
