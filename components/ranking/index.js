import React, { Fragment, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Collapse } from 'reactstrap';

import { addRank, removeRank } from '../../store/match';

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


const Position = ({ position, addRank: addRanking }) => {
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

const Rank = ({ rank, index, removeRank: removeRanking }) => (
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
  ranks = [],
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
    <Container className="py-5">
      <Col lg={4}>
        <Card>
          <TitleMedium>Your Ranking</TitleMedium>
          {
            (ranks.length > 0)
              ? ranks.map((rank, index) => <RankCompose key={rank.id} index={index} rank={rank} />)
              : <Text>No Ranking</Text>
          }
        </Card>
      </Col>
      <Col lg={8}>
        <Card>
          <TitleMedium>List of Recruiters</TitleMedium>
          {
            positions.map((position => <PositionCompose key={position.id} position={position} />))
          }
        </Card>
      </Col>
    </Container>
  </Fragment>
);

const mapStateToProps = state => ({
  ranks: state.match.ranks,
  positions: state.match.positions,
});

export default connect(mapStateToProps)(RankingPage);
