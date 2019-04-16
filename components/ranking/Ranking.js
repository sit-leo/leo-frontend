import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { Input, Icon } from 'antd';
import color from '../../config/color';

import WithNavbar from '../layouts/with-navbar';

import ContainerRow, { Col, Row } from '../base/Grid';
import { FlexCenter } from '../base/Flex';
import Text, { TextSmall, TitleMedium } from '../base/Text';
import Card from '../base/Card';
import Button from '../base/Button';

import RankingStep from './RankingStep';
import Hero from '../base/Hero';

const CounterBadge = styled(TextSmall)`
  color: ${color.white};
  background: ${props => (props.counter === 0 ? color.disabled : color.error)};
  min-width: 40px;
  cursor: pointer;
`;

const CounterBox = styled(FlexCenter)`
  top: 1.5em;
  right: 1.5em;
`;

const CounterText = styled(Text)`
  color: ${props => (props.counter === 0 ? color.disabled : color.error)};
`;

const RankCouter = ({ counter }) => (
  <CounterBox className="position-absolute text-center flex-column">
    <CounterBadge counter={counter} className="rounded-circle">
      {`${counter}`}
    </CounterBadge>
    <CounterText counter={counter}>
      <u>Your Rank</u>
    </CounterText>
  </CounterBox>
);

export const Ranking = ({
  steps = [], step, handleStep,
  ranks = [],
  children,
}) => {
  function increaseStep() {
    return step > 0 && handleStep(step - 1);
  }
  function decreaseStep() {
    return step < 2 && handleStep(step + 1);
  }
  return (
    <WithNavbar>
      <Hero>Hero</Hero>
      <ContainerRow className="py-5">
        <Card className="position-relative">
          <RankCouter counter={ranks.length} />
          <Col className="py-3" md={{ size: 8, offset: 2 }}>
            <RankingStep steps={steps} step={step} />
          </Col>
          <hr />
          <Row>
            <Col lg={2}>
              <Button disabled={step === 0} onClick={increaseStep}>
                Previous
              </Button>
            </Col>
            <Col lg={8} className="d-flex justify-content-center">
              {
                step === 0
                  ? (
                    <Input
                      prefix={<Icon type="search" />}
                      type="text"
                      className="w-50"
                    />
                  )
                  : (<TitleMedium>Your Rank</TitleMedium>)
              }
            </Col>
            <Col lg={2}>
              <Button disabled={ranks.length === 0} onClick={decreaseStep}>
                Next
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              { children }
            </Col>
          </Row>
        </Card>
      </ContainerRow>
    </WithNavbar>
  );
};

const mapStateToProps = state => ({
  match: state.match.match,
});

export default connect(mapStateToProps)(Ranking);
