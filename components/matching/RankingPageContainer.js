import React from 'react';
import styled, { css } from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Input, Popover } from 'antd';

import { setIsUpdateRank } from '../../store/matching/ranking';

import color from '../../config/color';

import RankingLayout from '../layouts/ranking';

import { Col, Row } from '../base/Grid';
import { FlexCenter } from '../base/Flex';
import Icon, { DeletedIcon } from '../base/Icon';
import Text, { Title, ExtraSmallTextLight, EmptyInformationText } from '../base/Text';
import Card from '../base/Card';
import Button from '../base/Button';
import Steps from '../base/Step';

function checkCounter(counter) {
  return counter === 0 ? color.disabled : color.error;
}

const CounterBox = styled(FlexCenter)`
  top: .5em;
  right: 1.5em;
`;

const CounterBadge = styled(Text)`
  color: ${color.white};
  background: ${props => checkCounter(props.counter)};
  min-width: 30px;
  cursor: pointer;
  transition: .2s;

  &:hover {
    transform: scale(1.3);
  }
`;

const CounterText = styled(ExtraSmallTextLight)`
  cursor: pointer;
  ${props => props.counter > 0 && css`
    color: ${color.error};
    text-decoration: underline;
  `}
`;

const SmallRankingBox = ({ ranks, removeRank }) => (
  <div>
    <SmallRankingList ranks={ranks} removeRank={removeRank} />
    <hr />
    <ExtraSmallTextLight>You can rearrange the rank in the next step.</ExtraSmallTextLight>
  </div>
);

const SmallRankingList = ({ ranks = [{ name: 'No rank.' }], removeRank }) => (
  ranks.length > 0
    ? ranks.map((rank, index) => {
      const ranked = (rank.applicantMatch && rank.applicantMatch.applicant) || rank.position;
      return (
        <Text key={ranked.id} className="d-flex align-items-center">
          <DeletedIcon onClick={() => removeRank(rank)} className="mr-3" type="minus-circle" theme="filled" />
          {`${index + 1}. ${ranked.name || '-'}`}
        </Text>
      );
    })
    : <EmptyInformationText>No rank found, please add rank.</EmptyInformationText>
);

const RankCouter = ({ counter, ranks, removeRank }) => (
  <CounterBox className="position-absolute text-center flex-column">
    <Popover
      className="d-flex flex-column align-items-center justify-content-center"
      placement="bottomRight"
      content={
        <SmallRankingBox ranks={ranks} removeRank={removeRank} />
      }
    >
      <CounterBadge counter={counter} className="rounded-circle">
        {`${counter}`}
      </CounterBadge>
      <CounterText counter={counter}>
        Your Rank
      </CounterText>
    </Popover>
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
  rankingSteps,

  ranks,
  removeRank,

  rankCounter,

  step,
  handleStep,

  isUpdateRank,
  setIsUpdate,

  isConfirm,
  children,
}) => {
  function decreaseStep() {
    return step > 0 && handleStep(step - 1);
  }
  function increaseStep() {
    return step < 2 && handleStep(step + 1);
  }
  function remove(rank) {
    setIsUpdate(true);
    return removeRank(rank);
  }

  return (
    <RankingLayout>
      <Col>
        <Card>
          <Row className="sticky-top bg-white pb-3">
            <RankCouter counter={rankCounter} ranks={ranks} removeRank={remove} />
            <Col className="py-3" md={{ size: 8, offset: 2 }}>
              <RankStep steps={rankingSteps} stepIndex={step} />
            </Col>
            <Col><hr /></Col>
            <Col lg={{ size: 2, offset: 1 }}>
              <Button className="w-100" disabled={step === 0} onClick={decreaseStep}>
                Previous
              </Button>
            </Col>
            <Col lg={6} className="d-flex justify-content-center">
              {
                step === 0
                  ? (
                    <Input
                      prefix={<Icon type="search" />}
                      type="text"
                      className="w-50"
                    />
                  )
                  : (<Title>Your Rank</Title>)
              }
            </Col>
            <Col lg={2}>
              <Button
                className="w-100"
                disabled={
                  step === 2 || rankCounter === 0 || (step === 1 && (isUpdateRank && !isConfirm))
                }
                onClick={increaseStep}
              >
                Next
              </Button>
            </Col>
          </Row>
          <Row>
            <Col lg={{ size: 10, offset: 1 }}>
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


const mapDispatchToProps = dispatch => ({
  setIsUpdate: bindActionCreators(setIsUpdateRank, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RankingPageContainer);
