import React from 'react';
import styled from 'styled-components';

import color from '../../config/color';

import WithNavbar from './with-navbar';

import Hero from '../base/Hero';
import { FlexCenter } from '../base/Flex';
import ContainerRow, { Col } from '../base/Grid';
import { Title, SubTitleSmall, TitlePrimary } from '../base/Text';
import Icon from '../base/Icon';

const CounterBox = ({ counter = 0, text }) => (
  <FlexCenter className="flex-column">
    <TitlePrimary>{counter}</TitlePrimary>
    <SubTitleSmall>{text}</SubTitleSmall>
  </FlexCenter>
);

const VerticalLine = styled.div`
  width: 1px;
  height: 82px;
  border: solid 1px ${color.outline};
`;

const Time = () => (
  <Hero>
    <ContainerRow>
      <Col lg={6}>
        <Title className="mb-3">
          15th Matching
        </Title>
        <Title className="d-flex align-items-center">
          <Icon type="calendar" style={{ fontSize: '30px' }} className="mr-2" />
          Matching date: 15 Nov 2019
        </Title>
      </Col>
      <Col lg={4} className="d-flex justify-content-between">
        <CounterBox counter={20} text="Recruiters" />
        <VerticalLine />
        <CounterBox counter={84} text="Applicants" />
      </Col>
    </ContainerRow>
  </Hero>
);

const MatchingLayout = ({ children }) => (
  <WithNavbar>
    <Time />
    <ContainerRow className="py-5">
      {children}
    </ContainerRow>
  </WithNavbar>
);

export default MatchingLayout;
