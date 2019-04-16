import React from 'react';

import Card from '../base/Card';
import Button from '../base/Button';
import Text, { TitleMedium } from '../base/Text';

import Rank from './Rank';
import { FlexCenter } from '../base/Flex';

const RankingList = ({
  ranks,
  isOpenConfirm,
  toggleConfirm = () => {},
  updateRanking = () => {},
  removeRanking = () => {},
}) => (
  <React.Fragment>
    {
      (ranks.length > 0)
        ? ranks.map((rank, index) => (
          <Rank
            key={`${JSON.stringify(rank)}-${index + 1}`}
            index={index}
            rank={rank}
            rankNumber={ranks.length}
            updateRanking={updateRanking}
            removeRanking={removeRanking}
          />
        ))
        : <FlexCenter><Text className="my-3">Please select at least 1 in previous step.</Text></FlexCenter>
    }
    <FlexCenter>
      <Button
        disabled={ranks.length <= 0}
        onClick={() => toggleConfirm(!isOpenConfirm)}
      >
    Confirm Ranking
      </Button>
    </FlexCenter>
  </React.Fragment>
);

export default RankingList;
