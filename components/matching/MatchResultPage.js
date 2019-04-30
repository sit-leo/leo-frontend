import React from 'react';
import { connect } from 'react-redux';

import MatchingLayout from '../layouts/matching';

import { Col, Row } from '../base/Grid';
import { Title, TitlePrimary } from '../base/Text';
import Card from '../base/Card';

import RankingCard from './RankingCard';

function getApplicant(result) {
  return null;
  // const { applicant: { applicant } } = result;
  // if (applicant) {
  //   if (applicant.educations.length === 0) {
  //     applicant.educations = [{ gpax: '-', educationName: '-' }];
  //   }
  //   return applicant;
  // }
  // return null;
}

function getPosition(result) {
  const { position } = result;
  if (position) {
    return position;
  }
  return null;
}

const ResultList = ({ matchResults = [] }) => (
  matchResults.map((result) => {
    const title = getApplicant(result)
      ? getApplicant(result).name
      : getPosition(result).name;
    const value = getApplicant(result)
      ? getApplicant(result).educations[0].gpax
      : getPosition(result).money;
    const subtitle = getApplicant(result)
      ? getApplicant(result).educations[0].educationName
      : getPosition(result).recruiter.location;
    return (
      <RankingCard
        key={result.matchResultId}
        title={title}
        value={value}
        subtitle={subtitle}
      />
    );
  })
);

const MatchResultPage = ({
  matchResults,
}) => (
  <MatchingLayout>
    <Col>
      <Card>
        <Row>
          <Col lg={{ size: 10, offset: 1 }} className="text-center">
            <TitlePrimary>CONGRATULATIONS!</TitlePrimary>
            <Title>You have matched with 3 Applicants!!!</Title>
          </Col>
          <Col lg={{ size: 10, offset: 1 }}>
            <ResultList matchResults={matchResults} />
          </Col>
        </Row>
      </Card>
    </Col>
  </MatchingLayout>
);

const mapStateToProps = state => ({
  match: state.match.match,
  matchResults: state.ranking.matchResults,
});

export default connect(mapStateToProps)(MatchResultPage);
