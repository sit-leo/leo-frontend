import React from 'react';
import { connect } from 'react-redux';

import color from '../../config/color';

import { ROLE_APPLICANT, ROLE_RECRUITER, isApplicant } from '../../tools/with-roles';

import MatchingLayout from '../layouts/matching';

import { Col, Row } from '../base/Grid';
import {
  Title, TitleLight, TitlePrimary, TitleError,
} from '../base/Text';
import Card from '../base/Card';
import Icon from '../base/Icon';

import RankingCard from './RankingCard';
import { getPositionInformations, getApplicantInformations } from '../../tools/ranking-informations';

function getApplicant(result) {
  const { applicant: { applicant } } = result;
  if (applicant) {
    if (applicant.educations.length === 0) {
      applicant.educations = [{ gpax: '-', educationName: '-' }];
    }
    return applicant;
  }
  return null;
}

function getPosition(result) {
  const { position } = result;
  if (position) {
    return position;
  }
  return null;
}

function getCardInformationByRole(result, role) {
  if (role === ROLE_APPLICANT) {
    const position = getPosition(result);
    return {
      title: position.name,
      value: position.money,
      subtitle: position.recruiter.location,
      informations: getPositionInformations(result.position),
    };
  }
  if (role === ROLE_RECRUITER) {
    const applicant = getApplicant(result);
    return {
      title: applicant.name,
      value: applicant.educations[0].gpax,
      subtitle: applicant.educations[0].educationName,
      informations: getApplicantInformations(result),
    };
  }
  return null;
}

const ResultList = ({ role, matchResults = [] }) => (
  matchResults.map((result) => {
    const {
      title, value, subtitle, informations,
    } = getCardInformationByRole(result, role);
    return (
      <RankingCard
        key={result.matchResultId}
        title={title}
        value={value}
        subtitle={subtitle}
        informations={informations}
      />
    );
  })
);

const MatchResultPage = ({
  match,
  role,
  matchResults = [],
}) => {
  const resultCount = matchResults.length;
  return (
    <MatchingLayout match={match}>
      <Col>
        <Card>
          <Row>
            {
              resultCount > 0
                ? (
                  <React.Fragment>
                    <Col lg={{ size: 10, offset: 1 }} className="text-center">
                      <TitlePrimary>CONGRATULATIONS!</TitlePrimary>
                      <Title>
                        {'You have matched with '}
                        {
                          (role === ROLE_APPLICANT)
                            ? 'this position'
                            : `${resultCount} Applicants`
                        }
                      </Title>
                    </Col>
                    <Col lg={{ size: 10, offset: 1 }}>
                      <ResultList role={role} matchResults={matchResults} />
                    </Col>
                  </React.Fragment>
                )
                : (
                  <Col lg={{ size: 10, offset: 1 }} className="text-center">
                    <Icon className="mb-3" type="frown" style={{ color: color.error, fontSize: '60px' }} />
                    <TitleError>SORRY…</TitleError>
                    <TitleLight>
                      You have not matched with anyone.
                      Join another match to get new opportunity!
                    </TitleLight>
                  </Col>
                )
            }
          </Row>
        </Card>
      </Col>
    </MatchingLayout>
  );
};

const mapStateToProps = state => ({
  role: state.user.role,
  match: state.match.match,
  matchResults: state.ranking.matchResults,
});

export default connect(mapStateToProps)(MatchResultPage);
