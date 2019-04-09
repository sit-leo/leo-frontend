import React from 'react';

import Card from '../base/Card';
import Button from '../base/Button';
import Text, { TitleMedium } from '../base/Text';

import Rank from './Rank';

const RankingList = ({ ranks, isOpenConfirm, toggleConfirm = () => {} }) => (

  <Card>
    <TitleMedium>Your Ranking</TitleMedium>
    {
      (ranks.length > 0)
        ? ranks.map((rank, index) => <Rank key={rank.id} index={index} rank={rank} rankNumber={ranks.length} />)
        : <Text>No Ranking</Text>
    }
    <Button
      disabled={ranks.length <= 0}
      onClick={() => toggleConfirm(!isOpenConfirm)}
    >
    Confirm Ranking
    </Button>
  </Card>
);

export default RankingList;
