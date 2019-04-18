import React from 'react';
import { connect } from 'react-redux';

import { Input } from 'antd';
import { redirectToRecruiterRanking } from '../../store/matching/matching-adapter';

import RankingLayout from '../layouts/ranking';

import { Col, Row } from '../base/Grid';
import { TitleSmall } from '../base/Text';
import Card from '../base/Card';
import RankingCard from './RankingCard';
import MainButton from '../base/Button';

const PositionList = ({ match, positions = [] }) => (
  <div className="d-flex flex-column">
    {
      positions.map(position => (
        <RankingCard
          key={position.name}
          title={position.name}
          value={position.money}
          subtitle={position.location}
          capacity={position.capacity}
          actionButton={(
            <MainButton className="my-3" onClick={() => redirectToRecruiterRanking(match.id, position.id)}>
              Select
            </MainButton>
          )}
        />
      ))
    }
  </div>
);

const RecruiterPosition = ({ match, positions = [] }) => (
  <RankingLayout>
    <Col>
      <Card>
        <Row>
          <Col lg={7}>
            <TitleSmall>Choose position to rank</TitleSmall>
          </Col>
          <Col lg={5}>
            <Input />
          </Col>
        </Row>
        <PositionList match={match} positions={positions} />
      </Card>
    </Col>
  </RankingLayout>
);

const mapStateToProps = state => ({
  match: state.match.match,
  positions: state.recruiter.positions,
});

export default connect(mapStateToProps)(RecruiterPosition);
