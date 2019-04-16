import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { Input, Icon } from 'antd';
import color from '../../config/color';

import WithNavbar from '../layouts/with-navbar';

import Container, { Col } from '../base/Grid';
import { FlexBetween, FlexCenter } from '../base/Flex';
import { TextSmall, TextError } from '../base/Text';
import Card from '../base/Card';
import Button from '../base/Button';

import RankingStep from './RankingStep';
import Hero from '../base/Hero';

const CounterBadge = styled(TextSmall)`
  color: ${color.white};
  background: ${color.error};
  min-width: 40px;
  cursor: pointer;
`;

const CounterBox = styled(FlexCenter)`
  top: 1.5em;
  right: 1.5em;
`;

const RankCouter = ({ counter }) => (
  <CounterBox className="position-absolute text-center flex-column">
    <CounterBadge className="rounded-circle">
      {`${counter}`}
    </CounterBadge>
    <TextError>
      <u>Your Rank</u>
    </TextError>
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
      <Container className="py-5">
        <Card className="position-relative">
          <RankCouter counter={ranks.length} />
          <Col className="py-3" md={{ size: 8, offset: 2 }}>
            <RankingStep steps={steps} step={step} />
          </Col>
          <hr />
          <Col className="py-2">
            <FlexBetween>
              <Button
                type="button"
                disabled={step === 0}
                onClick={increaseStep}
              >
                Previous
              </Button>
              <Input
                prefix={<Icon type="search" />}
                className="mx-3"
                type="text"
              />
              <Button
                type="button"
                disabled={ranks.length === 0}
                onClick={decreaseStep}
              >
                Next
              </Button>
            </FlexBetween>
          </Col>
          <Col>
            {
              children
            }
          </Col>
        </Card>
      </Container>
    </WithNavbar>
  );
};

const mapStateToProps = state => ({
  match: state.match.match,
});

export default connect(mapStateToProps)(Ranking);
