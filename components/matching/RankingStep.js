import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setIsUpdateRank } from '../../store/matching/ranking';

import Button, { DangerButton } from '../base/Button';
import { Title, TextError } from '../base/Text';
import { Col } from '../base/Grid';
import { FlexCenter } from '../base/Flex';
import Icon from '../base/Icon';

import RankingCard from './RankingCard';

function isNotFirstRank(rankIndex) {
  return rankIndex !== 1;
}

function isNotLastRank(rankIndex, rankCounter) {
  return rankIndex < rankCounter;
}

const RankingButton = ({
  rankIndex,
  rankCounter,
  increaseRank,
  decreaseRank,
}) => (
  <Title className="mb-0">
    <FlexCenter className="flex-column">
      { isNotFirstRank(rankIndex)
        ? <Icon type="caret-up" theme="filled" onClick={increaseRank} />
        : <br />
      }
      <span>{rankIndex}</span>
      { isNotLastRank(rankIndex, rankCounter)
        ? <Icon type="caret-down" theme="filled" onClick={decreaseRank} />
        : <br />
      }
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

  return (
    <React.Fragment>
      {
        (rankCounter > 0)
          ? ranks.map((rank, index) => {
            const rankIndex = index + 1;
            const ranked = (rank.applicantMatch && rank.applicantMatch.applicant) || rank.position;
            return (
              <RankingCard
                key={ranked.id}
                title={ranked.name}
                value={ranked.educations[0].gpax}
                subtitle={ranked.educations[0].educationName}
                capacity={ranked.capacity}
                rankingButton={(
                  <RankingButton
                    rankIndex={rankIndex}
                    rankCounter={rankCounter}
                    increaseRank={() => increaseRank(index, rank)}
                    decreaseRank={() => decreaseRank(index, rank)}
                  />
                )}
                actionButton={
                  <DangerButton className="w-75" onClick={() => remove(rank)}>Delete</DangerButton>
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
  isConfirm: state.ranking.isConfirm,
  haveRank: state.ranking.haveRank,
  isUpdateRank: state.ranking.isUpdateRank,
});

const mapDispatchToProps = dispatch => ({
  setIsUpdate: bindActionCreators(setIsUpdateRank, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RankingStep);
