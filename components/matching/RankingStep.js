import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setIsUpdateRank } from '../../store/matching/ranking';

import Button, { DangerButton } from '../base/Button';
import Text, { TitleSmall } from '../base/Text';
import { Col } from '../base/Grid';
import { FlexCenter } from '../base/Flex';
import Icon from '../base/Icon';

import RankingCard from './RankingCard';

const RankingErrorText = () => (
  <FlexCenter>
    <Text className="my-3">
    Please select at least 1 in previous step.
    </Text>
  </FlexCenter>
);

const RankingStep = ({
  isUpdateRank,
  ranks,
  isOpenConfirm,
  toggleConfirm = () => {},
  updateRank = () => {},
  removeRank = () => {},
  setIsUpdate = () => {},
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
            const ranker = rank.position || rank.applicantMatch;
            return (
              <RankingCard
                key={rankIndex}
                title={ranker.name}
                value={ranker.money}
                subtitle={ranker.location}
                capacity={ranker.capacity}
                rankingButton={(
                  <TitleSmall>
                    <FlexCenter className="mr-3 ml-0 flex-grow-2 flex-column">
                      { index > 0
                        ? <Icon type="caret-up" theme="filled" onClick={() => increaseRank(index, rank)} />
                        : <br />
                    }
                      <span>{rankIndex}</span>
                      { index < rankCounter - 1
                        ? <Icon type="caret-down" theme="filled" onClick={() => decreaseRank(index, rank)} />
                        : <br />
                    }
                    </FlexCenter>
                  </TitleSmall>
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
