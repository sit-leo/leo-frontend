import React from 'react';

import Button, { DangerButton } from '../base/Button';
import Text, { TitleSmall } from '../base/Text';
import { Col } from '../base/Grid';
import { FlexCenter } from '../base/Flex';
import Icon from '../base/Icon';

import RankingCard from './RankingCard';

const RankingStep = ({
  ranks,
  isOpenConfirm,
  toggleConfirm = () => {},
  updateRanking = () => {},
  removeRanking = () => {},
}) => {
  function increaseRank(index, rank) {
    return updateRanking(index - 1, rank);
  }
  function decreaseRank(index, rank) {
    return updateRanking(index + 1, rank);
  }
  function remove(rank) {
    return removeRanking(rank);
  }
  return (
    <React.Fragment>
      <Col>
        {
          (ranks.length > 0)
            ? ranks.map((rank, index) => {
              const ranking = index + 1;
              const ranker = rank.position || rank.applicantMatch;
              return (
                <RankingCard
                  key={`${JSON.stringify(rank)}-${ranking}`}
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
                        <span>{ranking}</span>
                        { index < ranks.length - 1
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
            : <FlexCenter><Text className="my-3">Please select at least 1 in previous step.</Text></FlexCenter>
        }
      </Col>
      <Col lg={{ size: 4, offset: 4 }}>
        <Button
          className="w-100"
          disabled={ranks.length <= 0}
          onClick={() => toggleConfirm(!isOpenConfirm)}
        >
          Confirm Ranking
        </Button>
      </Col>
    </React.Fragment>
  );
};

export default RankingStep;
