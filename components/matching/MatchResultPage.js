import React from 'react';

import MatchingLayout from '../layouts/matching';
import { Col, Row } from '../base/Grid';
import { Title, TitlePrimary } from '../base/Text';
import Card from '../base/Card';

import RankingCard from './RankingCard';

const ResultList = ({ results = [1] }) => (
  results.map(result => <RankingCard />)
);

const MatchResultPage = () => (
  <MatchingLayout>
    <Col>
      <Card>
        <Row>
          <Col lg={{ size: 10, offset: 1 }} className="text-center">
            <TitlePrimary>CONGRATULATIONS!</TitlePrimary>
            <Title>You have matched with 3 Applicants!!!</Title>
          </Col>
          <Col lg={{ size: 10, offset: 1 }}>
            <ResultList />
          </Col>
        </Row>
      </Card>
    </Col>
  </MatchingLayout>
);

export default MatchResultPage;
