import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { Input, Icon } from 'antd';
import color from '../../config/color';

import RankingLayout from '../layouts/ranking';

import { Col, Row } from '../base/Grid';
import { FlexCenter } from '../base/Flex';
import Text, { TitleSmall } from '../base/Text';
import Card from '../base/Card';
import Button from '../base/Button';
import Steps from '../base/Step';

function checkCounter(counter) {
  return counter === 0 ? color.disabled : color.error;
}

const CounterBadge = styled(Text)`
  color: ${color.white};
  background: ${props => checkCounter(props.counter)};
  min-width: 40px;
  cursor: pointer;
`;

const CounterText = styled(Text)`
  color: ${props => checkCounter(props.counter)};
`;

const CounterBox = styled(FlexCenter)`
  top: 1.5em;
  right: 1.5em;
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

const RankStep = ({ steps = [], stepIndex }) => (
  <Steps current={stepIndex}>
    {
      steps.map(step => <Steps.Step key={step} title={step} />)
    }
  </Steps>
);

const RankingPageContainer = ({
  rankingSteps = [],
  rankCounter,
  step,
  handleStep,
  haveRank,
  isUpdateRank,
  isConfirm,
  children,
}) => {
  function decreaseStep() {
    return step > 0 && handleStep(step - 1);
  }
  function increaseStep() {
    return step < 2 && handleStep(step + 1);
  }
  return (
    <RankingLayout>
      <Col>
        <Card className="position-relative">
          <RankCouter counter={rankCounter} />
          <Col className="py-3" md={{ size: 8, offset: 2 }}>
            <RankStep steps={rankingSteps} stepIndex={step} />
          </Col>
          <hr />
          <Row>
            <Col lg={2}>
              <Button className="w-100" disabled={step === 0} onClick={decreaseStep}>
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
                  : (<TitleSmall>Your Rank</TitleSmall>)
              }
            </Col>
            <Col lg={2}>
              <Button
                className="w-100"
                disabled={
                  rankCounter === 0 || (step === 1 && (isUpdateRank && !isConfirm))
                }
                onClick={increaseStep}
              >
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
      </Col>
    </RankingLayout>
  );
};

const mapStateToProps = state => ({
  match: state.match.match,
  haveRank: state.ranking.haveRank,
  isUpdateRank: state.ranking.isUpdateRank,
  isConfirm: state.ranking.isConfirm,
});

export default connect(mapStateToProps)(RankingPageContainer);
