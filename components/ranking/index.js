import React, { Fragment, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  Collapse, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import { Steps } from 'antd';

import { clientInstance } from '../../tools/request';

import adapter from '../../store/match/match-adapter';
import { addRank, updateRank, removeRank } from '../../store/match/applicant';

import Container, { ContainerFluid, Col } from '../base/Grid';
import Flex, { FlexBetween, FlexCenter } from '../base/Flex';
import Text, { TitleMedium, TextSmall } from '../base/Text';

import Navbar from '../base/Navbar';
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
          <Flex>
            <TitleMedium>No Information</TitleMedium>
          </Flex>
          <FlexCenter>
            <Button type="button" onClick={() => addRanking(position)}>Add to Your Ranking</Button>
          </FlexCenter>
        </Card>
      </Collapse>
    </Fragment>
  );
};

const mapDispatchToPositionProps = dispatch => ({
  addRank: bindActionCreators(addRank, dispatch),
});

const PositionCompose = connect(null, mapDispatchToPositionProps)(Position);

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
        <Card>
          <Col>
            <Steps current={step}>
              <Step title="Add Ranks" />
              <Step title="Order Ranks" />
              <Step title="Upload Documents" />
            </Steps>
          </Col>
          <Col>
            <FlexBetween>
              <Button onClick={() => handleStep(step + 1)}>Next Step</Button>
              <TitleMedium className="text-center">
                {`${ranks.length}`}
                <br />
                {'Your Rank'}
              </TitleMedium>
            </FlexBetween>
          </Col>
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
              {
                (ranks.length > 0)
                  ? ranks.map((rank, index) => <RankCompose key={rank.id} index={index} rank={rank} rankNumber={ranks.length} />)
                  : <Text>No Ranking</Text>
              }
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

        </Card>
      </Container>
      <Modal isOpen={isOpenConfirm}>
        <ModalHeader className="text-center">Confirmation</ModalHeader>
        <ModalBody className="text-center">
          Are you sure to confirm this ranking?
          Please check the information before confirming.
        </ModalBody>
        <ModalFooter className="flex-column text-center">
          <span>
            You can edit your ranking until the match starts. We will notificate you before the match starts.
          </span>
          <FlexBetween className="w-100 mt-3 px-5">
            <DangerButton onClick={() => toggleConfirm(!isOpenConfirm)}>
            Cancel
            </DangerButton>
            <Button onClick={() => matchAdapter.postApplicantRankingByMatchId(match.id, ranks)}>
            Confirm
            </Button>
          </FlexBetween>
        </ModalFooter>
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
