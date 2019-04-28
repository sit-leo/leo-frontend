import React from 'react';
import styled from 'styled-components';

import color from '../../config/color';

import { SmallCard } from '../base/Card';
import { Row, Col } from '../base/Grid';
import {
  Title, SubTitleSmall, TitlePrimary, TitleLight,
} from '../base/Text';
import { FlexCenter } from '../base/Flex';
import Button from '../base/Button';

const VerticalLine = styled.div`
  border-left: 2px solid ${color.disabled};
`;

const MatchCardSubTitle = styled(SubTitleSmall)`
  span {
    color: ${color.primary};
  }
`;


const CounterBox = ({ count, badgeText }) => (
  <FlexCenter className="flex-column">
    <TitlePrimary>
      {count}
    </TitlePrimary>
    <TitleLight>
      {badgeText}
    </TitleLight>
  </FlexCenter>
);


const MatchCard = () => (
  <SmallCard className="py-2 px-4">
    <Row>
      <Col lg={5}>
        <Title>
          {'Programmer matching'}
        </Title>
        <MatchCardSubTitle>
          {'Match date '}
          <span>18 Aug 2019</span>
        </MatchCardSubTitle>
        <MatchCardSubTitle>
          {'Organization '}
          <span>SIT, KMUTT</span>
        </MatchCardSubTitle>
      </Col>
      <Col lg={4} className="d-flex justify-content-center">
        <CounterBox count={19} badgeText="Recruiters" />
        <VerticalLine className="mx-3" />
        <CounterBox count={102} badgeText="Applicants" />
      </Col>
      <Col lg={3} className="d-flex align-items-center justify-content-center">
        <Button className="w-75">Rank</Button>
      </Col>
    </Row>
  </SmallCard>
);

export default MatchCard;
