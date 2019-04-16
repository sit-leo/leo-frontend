import React from 'react';

import Button, { DangerButton } from '../base/Button';
import Text, { TitleMedium } from '../base/Text';
import { Col } from '../base/Grid';
import { FlexCenter } from '../base/Flex';
import Icon from '../base/Icon';

import Position from './Position';

const RankingList = ({
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
              return (
                <Position
                  key={`${JSON.stringify(rank)}-${ranking}`}
                  position={rank.position}
                  rankingButton={(
                    <TitleMedium>
                      <FlexCenter className="flex-grow-2 mx-3 flex-column">
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
                    </TitleMedium>
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

export default RankingList;
