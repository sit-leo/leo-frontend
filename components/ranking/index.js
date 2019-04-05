import React from 'react';
import { connect } from 'react-redux';

import { ContainerFluid, Row, Col } from '../base/Grid';
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

const Position = ({ position }) => (
  <SmallCard>
    <Text><b>Company Name</b></Text>
    <FlexBetween className="mt-3">
      <Text><LabelText label="Job Position" text={`${position.name}`} /></Text>
      <Text><LabelText label="Amount" text={`${position.capacity}`} /></Text>
    </FlexBetween>
  </SmallCard>
);

export const RankingPage = ({ positions = [{ name: 'No Position Found' }] }) => (
  <ContainerFluid>
    <Navbar />
    <Row>
      <Col className="px-0">
        <Hero text="Ranking Page" />
      </Col>
    </Row>
    <Row className="py-4 px-5">
      <Col lg={4}>
        <Card>
          <TitleMedium>Your Ranking</TitleMedium>
          Your Ranking
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
    </Row>
  </ContainerFluid>
);

const mapStateToProps = state => ({
  positions: state.match.positions,
});

export default connect(mapStateToProps)(RankingPage);
