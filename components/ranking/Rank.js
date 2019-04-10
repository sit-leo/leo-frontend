import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Icon } from 'antd';

import color from '../../config/color';
import font from '../../config/font';

import { updateRank, removeRank } from '../../store/match/applicant';

import { SmallCard } from '../base/Card';
import { FlexBetween, FlexCenter } from '../base/Flex';
import { TextSmall } from '../base/Text';

const DeletedIcon = styled(Icon)`
  font-size: ${font.size.medium};
  color: ${color.error};
`;

const Rank = ({
  rankNumber, rank, index,
  updateRank: updateRanking = () => {},
  removeRank: removeRanking = () => {},
}) => (
  <SmallCard className="my-3">
    <FlexBetween className="align-items-center">
      <FlexCenter className="flex-grow-2 mx-3 flex-column">
        { index > 0 && <Icon type="caret-up" theme="filled" onClick={() => updateRanking(index - 1, rank)} />}
        <span>{`${index + 1}`}</span>
        { index < rankNumber - 1 && <Icon type="caret-down" theme="filled" onClick={() => updateRanking(index - 1, rank)} />}
      </FlexCenter>
      <TextSmall className="flex-grow-1">{`${rank.name}`}</TextSmall>
      <DeletedIcon onClick={() => removeRanking(rank)} theme="filled" type="minus-circle" />
    </FlexBetween>
  </SmallCard>
);

const mapDispatchToRankProps = dispatch => ({
  updateRank: bindActionCreators(updateRank, dispatch),
  removeRank: bindActionCreators(removeRank, dispatch),
});

export default connect(null, mapDispatchToRankProps)(Rank);
