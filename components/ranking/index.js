import React, { Fragment, useState } from 'react';

import { connect } from 'react-redux';
import { Collapse } from 'reactstrap';

import Container, { ContainerFluid, Row, Col } from '../base/Grid';
import { FlexBetween } from '../base/Flex';
import Text, { TitleMedium } from '../base/Text';

import Navbar from '../base/Navbar';
import Hero from '../base/Hero';
import Card, { SmallCard } from '../base/Card';

const LabelText = ({ label, text }) => (
  <Text>
    <b className="mr-3">{label}</b>
    {text}
  </Text>
);

const PositionCard = ({ position, isOpen, toggle }) => (
  <SmallCard onClick={() => toggle(!isOpen)}>
    <Text><b>Company Name</b></Text>
    <FlexBetween className="mt-3">
      <Text><LabelText label="Job Position" text={`${position.name}`} /></Text>
      <Text><LabelText label="Amount" text={`${position.capacity}`} /></Text>
    </FlexBetween>
  </SmallCard>
);

const Position = ({ position }) => {
  const [isOpen, toggle] = useState(false);
  return (
    <Fragment>
      <PositionCard isOpen={isOpen} toggle={toggle} position={position} />
      <Collapse isOpen={isOpen}>
        <Card>
            Hello Position
        </Card>
      </Collapse>
    </Fragment>
  );
};

const Rank = () => (
  <Fragment>
    <div>
      Delete
      1. CompanyName
      Document
    </div>
    <div>
      Delete
      2. CompanyName
      Document
    </div>
  </Fragment>
);

export const RankingPage = ({
  ranks = [{ id: 1, name: 'No Position Found' }],
  positions = [{ name: 'No Position Found', capacity: 0 }],
}) => (
  <Fragment>
    <ContainerFluid>
      <Navbar />
      <Row>
        <Col className="px-0">
          <Hero text="Ranking Page" />
        </Col>
      </Row>
    </ContainerFluid>
    <Container>
      <Col lg={4}>
        <Card>
          <TitleMedium>Your Ranking</TitleMedium>
          {
              ranks.map((rank, index) => <Rank key={rank.id} />)
            }
        </Card>
      </Col>
      <Col lg={8}>
        <Card>
          <TitleMedium>List of Recruiters</TitleMedium>
          {
            positions.map(position => <Position key={position.id} position={position} />)
          }
        </Card>
      </Col>
    </Container>
  </Fragment>
);

const mapStateToProps = state => ({
  positions: state.match.positions,
});

export default connect(mapStateToProps)(RankingPage);
