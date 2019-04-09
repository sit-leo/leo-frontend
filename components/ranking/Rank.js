import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateRank, removeRank } from '../../store/match/applicant';

import { SmallCard } from '../base/Card';
import { FlexBetween } from '../base/Flex';
import { TextSmall } from '../base/Text';

const Rank = ({
  rankNumber, rank, index,
  updateRank: updateRanking = () => {},
  removeRank: removeRanking = () => {},
}) => (
  <SmallCard>
    <FlexBetween>
      { index > 0 && <button type="button" onClick={() => updateRanking(index - 1, rank)}>^</button>}
      <span>{`${index + 1}`}</span>
      { index < rankNumber - 1 && <button type="button" onClick={() => updateRanking(index + 1, rank)}>V</button>}
      <TextSmall>{`${rank.name}`}</TextSmall>
      <button type="button" onClick={() => removeRanking(rank)}>Delete</button>
    </FlexBetween>
  </SmallCard>
);

const mapDispatchToRankProps = dispatch => ({
  updateRank: bindActionCreators(updateRank, dispatch),
  removeRank: bindActionCreators(removeRank, dispatch),
});

export default connect(null, mapDispatchToRankProps)(Rank);
