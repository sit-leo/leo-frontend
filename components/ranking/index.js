import React from 'react';
import { connect } from 'react-redux';

import { ContainerFluid, Row, Col } from '../base/Grid';
import Navbar from '../base/Navbar';
import Hero from '../base/Hero';
import Card, { SmallCard } from '../base/Card';
import { TitleMedium } from '../base/Text';

const Position = ({ position }) => (
  <SmallCard>
    {
      position.name
    }
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
