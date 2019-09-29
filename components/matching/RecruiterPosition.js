import React from 'react';

import { Input } from 'antd';

import MatchingLayout from '../layouts/matching';

import { Col, Row } from '../base/Grid';
import { TitleSmall } from '../base/Text';
import Card from '../base/Card';
import MainButton from '../base/Button';

import RankingCard from './RankingCard';

const PositionList = ({ match, positions, redirect }) => (
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
            <MainButton className="w-75" onClick={() => redirect(match.id, position.id)}>
              Select
            </MainButton>
          )}
        />
      ))
    }
  </div>
);

const RecruiterPosition = ({
  match,
  positions = [],
  textAction = 'Choose position to rank',
  redirect = () => {},
}) => (
  <MatchingLayout match={match}>
    <Col>
      <Card>
        <Row>
          <Col lg={{ offset: 1, size: 6 }}>
            <TitleSmall>{textAction}</TitleSmall>
          </Col>
          <Col lg={4}>
            <Input />
          </Col>
          <Col lg={{ size: 10, offset: 1 }}>
            <PositionList match={match} positions={positions} redirect={redirect} />
          </Col>
        </Row>
      </Card>
    </Col>
  </MatchingLayout>
);

export default RecruiterPosition;
