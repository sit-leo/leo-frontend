import React from 'react';
import styled from 'styled-components';
import Router from 'next/router';

import color from '../../config/color';

import { SmallCard } from '../base/Card';
import { Row, Col } from '../base/Grid';
import {
  SubTitleSmall, TitleMedium, TitlePrimary, TitleLight,
} from '../base/Text';
import { FlexCenter } from '../base/Flex';
import Button from '../base/Button';

const VerticalLine = styled.div`
  border-left: 2px solid ${color.disabled};
`;

const MatchCardSubTitle = styled(TitleMedium)`
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


const MatchCard = ({
  id,
  title,
  startDate,
}) => (
  <SmallCard className="py-4 px-4">
    <Row>
      <Col lg={4}>
        <SubTitleSmall>
          {title || '-'}
        </SubTitleSmall>
        <MatchCardSubTitle>
          {'Match date '}
          <span>{ startDate || '-' }</span>
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
      <Col lg={{ size: 3, offset: 1 }} className="d-flex align-items-center justify-content-center">
        <Button
          onClick={() => Router.push(`/matches/${id}`)}
          className="w-75"
        >
          Detail
        </Button>
      </Col>
    </Row>
  </SmallCard>
);

export default MatchCard;
