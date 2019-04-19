import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setIsUpdateRank } from '../../store/matching/ranking';

import Button, { DangerButton } from '../base/Button';
import { TitleSmall, TextError } from '../base/Text';
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
  <TitleSmall>
    <FlexCenter className="mr-3 ml-0 flex-grow-2 flex-column">
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
  </TitleSmall>
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
            const ranked = rank.position || rank.applicantMatch;
            return (
              <RankingCard
                key={rankIndex}
                title={ranked.name}
                value={ranked.money}
                subtitle={ranked.location}
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
                  <DangerButton onClick={() => remove(rank)}>Delete</DangerButton>
                }
              />
            );
          })
          : <RankingErrorText />
      }
      <Col lg={{ size: 4, offset: 4 }}>
        <Button
          className="w-100"
          disabled={rankCounter === 0 || !isUpdateRank}
          onClick={() => toggleConfirm(!isOpenConfirm)}
        >
          Confirm Ranking
        </Button>
      </Col>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  isUpdateRank: state.ranking.isUpdateRank,
});

const mapDispatchToProps = dispatch => ({
  setIsUpdate: bindActionCreators(setIsUpdateRank, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RankingStep);
