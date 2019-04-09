import React, { Fragment, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Collapse, Modal } from 'reactstrap';
import { Steps } from 'antd';

import { clientInstance } from '../../tools/request';

import adapter from '../../store/match/match-adapter';
import { addRank, removeRank } from '../../store/match/applicant';

import Container, { ContainerFluid, Row, Col } from '../base/Grid';
import { FlexBetween } from '../base/Flex';
import Text, { TitleMedium } from '../base/Text';

import Navbar from '../base/Navbar';
import Hero from '../base/Hero';
import Card, { SmallCard } from '../base/Card';
import Button, { DangerButton } from '../base/Button';

const Step = Steps.Step;

const matchAdapter = adapter(clientInstance());

const LabelText = ({ label, text }) => (
  <Text>
    <b className="mr-3">{label}</b>
    {text}
  </Text>
);

const PositionCard = ({ position, isOpen, toggle }) => (
  <SmallCard className="my-3" onClick={() => toggle(!isOpen)}>
    <Text><b>Company Name</b></Text>
    <FlexBetween className="mt-3">
      <Text><LabelText label="Job Position" text={`${position.name}`} /></Text>
      <Text><LabelText label="Amount" text={`${position.capacity}`} /></Text>
    </FlexBetween>
  </SmallCard>
);


const Position = ({ position, addRank: addRanking = () => {} }) => {
  const [isOpen, toggle] = useState(false);
  return (
    <Fragment>
      <PositionCard isOpen={isOpen} toggle={toggle} position={position} />
      <Collapse isOpen={isOpen}>
        <Card>
          <TitleMedium>No Information</TitleMedium>
          <button type="button" onClick={() => addRanking(position)}>Add to Your Ranking</button>
        </Card>
      </Collapse>
    </Fragment>
  );
};

const mapDispatchToPositionProps = dispatch => ({
  addRank: bindActionCreators(addRank, dispatch),
});

const PositionCompose = connect(null, mapDispatchToPositionProps)(Position);

const Rank = ({ rank, index, removeRank: removeRanking = () => {} }) => (
  <div>
    <button type="button" onClick={() => removeRanking(rank)}>Delete</button>
    {`${index + 1} ${rank.name}`}
    <button type="button">Document</button>
  </div>
);


const mapDispatchToRankProps = dispatch => ({
  removeRank: bindActionCreators(removeRank, dispatch),
});

const RankCompose = connect(null, mapDispatchToRankProps)(Rank);

export const RankingPage = ({
  match = { id: 0 },
  ranks = [],
  positions = [{ name: 'No Position Found', capacity: 0 }],
}) => {
  const [step, handleStep] = useState(0);
  const [isOpenConfirm, toggleConfirm] = useState(false);

  return (
    <Fragment>
      <ContainerFluid>
        <Navbar />
      </ContainerFluid>
      <Container className="py-5">
        <Col>
          <Steps current={step}>
            <Step />
            <Step />
            <Step />
          </Steps>
        </Col>
        <Button onClick={() => handleStep(step + 1)}>Next Step</Button>
        { step === 0 && (
        <Col>
          <Card>
            <TitleMedium>List of Recruiters</TitleMedium>
            {
              positions.map((position => <PositionCompose key={position.id} position={position} />))
            }
          </Card>
        </Col>
        ) }

        { step === 1 && (
        <Col>
          <Card>
            <TitleMedium>Your Ranking</TitleMedium>
            <div>
              {
                (ranks.length > 0)
                  ? ranks.map((rank, index) => <RankCompose key={rank.id} index={index} rank={rank} />)
                  : <Text>No Ranking</Text>
              }
            </div>
            <Button
              disabled={ranks.length <= 0}
              onClick={() => toggleConfirm(!isOpenConfirm)}
            >
              Confirm Ranking
            </Button>
          </Card>
        </Col>
        ) }

        { step === 2 && (
        <Col>
          <Card>
            <TitleMedium>Upload Document</TitleMedium>
          </Card>
        </Col>
        ) }
      </Container>
      <Modal isOpen={isOpenConfirm}>
        Confirm
        <DangerButton onClick={() => toggleConfirm(!isOpenConfirm)}>
          Cancel
        </DangerButton>
        <Button onClick={() => matchAdapter.postApplicantRankingByMatchId(match.id, ranks)}>
          Confirm
        </Button>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  match: state.match.match,
  ranks: state.applicant.ranks,
  positions: state.match.positions,
});

export default connect(mapStateToProps)(RankingPage);
