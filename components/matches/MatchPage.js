import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Router from 'next/router';
import { Card as AntdCard, Avatar } from 'antd';
import day from 'dayjs';

import colors from '../../config/color';

import { isApplicant, isRecruiter, isOrganizer } from '../../tools/with-roles';
import isCanJoinMatch, {
  convertDatePeriod,
  isAnnouceDate,
  getNextDay,
  isApplicantCanRanking,
  isRecruiterCanRanking,
  isRankingPeriod,
} from '../../tools/match-time';
import WithNavbar from '../layouts/with-navbar';


import {
  TitleLarge, Title, TitleWhite, TitleSmall, TitlePrimary, TitleSmallPrimary,
} from '../base/Text';
import Button from '../base/Button';
import Card from '../base/Card';
import ContainerRow, { Row, Col } from '../base/Grid';
import { BreadcrumbList } from '../base/Breadcrumb';


const Meta = styled(AntdCard.Meta)`
  .ant-card-meta-title {
    margin: 0 !important;
  }
`;

const LabelCard = styled.div`
  border-radius: 2px;
  border: solid 1px ${colors.primary};
  text-align: center;
  padding: 0.5em;
  margin-bottom: 1em;
`;

const DateLabel = ({ title, date }) => (
  <Meta
    className="my-3"
    avatar={<Avatar shape="square" src="/static/images/calendar.png" />}
    title={<TitleSmallPrimary className="m-0">{title}</TitleSmallPrimary>}
    description={<TitleSmall>{date}</TitleSmall>}
  />
);

const NumberLabel = ({ description, number }) => (
  <LabelCard>
    <TitlePrimary className="m-0">{number}</TitlePrimary>
    <TitleSmall>{description}</TitleSmall>
  </LabelCard>
);
const MatchPage = ({ match, isJoinMatch, role }) => {
  function getButtonText() {
    if (isOrganizer(role)) {
      return 'Update Match';
    }

    if (!isAnnouceDate(match.announceDate)) {
      if (!isJoinMatch) {
        return 'Join Match';
      }
      return 'Ranking';
    }

    return 'Match Result';
  }

  function handleMatchResult() {
    if (isApplicant(role)) {
      return Router.push(`/matches/${match.id}/result`);
    }
    return Router.push(`/matches/${match.id}/result/positions`);
  }

  function handleRankingMatch() {
    if (isApplicant(role)) {
      return Router.push(`/matches/${match.id}/applicants/ranking`);
    }
    return Router.push(`/matches/${match.id}/recruiters/positions`);
  }

  function handleJoinMatch() {
    if (isApplicant(role)) {
      return Router.push(`/matches/${match.id}/applicants/join`);
    }
    return Router.push(`/matches/${match.id}/recruiters/join`);
  }

  function handleUpdateMatch() {
    return Router.push(`/organizations/matches/${match.id}`);
  }

  function isDisabled() {
    if (isAnnouceDate(match.announceDate)) {
      return false;
    }

    if (!isJoinMatch && isCanJoinMatch(match.startJoiningDate, match.endJoiningDate)) {
      return false;
    }

    if (isJoinMatch && isRankingPeriod(match.endJoiningDate, match.recruiterRankingEndDate)) {
      if (isApplicant(role)
        && isApplicantCanRanking(match.endJoiningDate, match.applicantRankingEndDate)
      ) {
        return false;
      }
      if (isRecruiter(role)
        && isRecruiterCanRanking(match.applicantRankingEndDate, match.recruiterRankingEndDate)
      ) {
        return false;
      }
    }

    return true;
  }

  function handleClick() {
    if (isOrganizer(role)) {
      return handleUpdateMatch();
    }

    if (isAnnouceDate(match.announceDate)) {
      return handleMatchResult();
    }

    if (!isJoinMatch
      && isCanJoinMatch(match.startJoiningDate, match.endJoiningDate)) {
      return handleJoinMatch();
    }

    if (isJoinMatch
      && isRankingPeriod(match.endJoiningDate, match.recruiterRankingEndDate)) {
      return handleRankingMatch();
    }

    return console.error('Failed to handle button match detail.');
  }

  return (
    <WithNavbar>
      <ContainerRow className="py-5">
        <Col>
          <BreadcrumbList
            items={[
              { url: '/matches', name: 'Matches' },
              { name: match.name || 'Default Match Name' },
            ]}
          />
        </Col>
        <Col lg={7} className="text-left">
          <TitleLarge>
            {match.name || 'Default Match Name'}
          </TitleLarge>
          <img className="w-100" src="/static/images/match-mockup.jpg" alt="match-mockup" />
          <hr />
          <p className="mb-3">
            {match.description || 'Default Match Description'}
          </p>
        </Col>
        <Col lg={5}>
          <Card>
            <Row>
              <Col>
                <Title>Match Details</Title>
              </Col>
              <Col>
                <DateLabel
                  title="Join Period"
                  date={convertDatePeriod(day(match.startJoiningDate), day(match.endJoiningDate))}
                />
              </Col>
              <Col>
                <DateLabel
                  title="Applicant Rank"
                  date={convertDatePeriod(getNextDay(match.endJoiningDate), day(match.applicantRankingEndDate))}
                />
              </Col>
              <Col>
                <DateLabel
                  title="Recruiter Rank"
                  date={convertDatePeriod(getNextDay(match.applicantRankingEndDate), day(match.recruiterRankingEndDate))}
                />
              </Col>
              <Col>
                <DateLabel
                  title="Result"
                  date={day(match.announceDate).format('DD MMMM YYYY')}
                />
              </Col>
              <hr className="w-100" />
              <Col lg={6}>
                <NumberLabel description="Recruiters" number={match.numOfRecruiter || '0'} />
              </Col>
              <Col lg={6}>
                <NumberLabel description="Applicants" number={match.numOfApplicant || '0'} />
              </Col>
              <Col className="text-center">
                <Button
                  className="w-100"
                  onClick={handleClick}
                  disabled={isDisabled()}
                >
                  <TitleWhite className="mb-0">
                    {getButtonText()}
                  </TitleWhite>
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </ContainerRow>
    </WithNavbar>
  );
};

MatchPage.propTypes = {
  match: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = state => ({
  match: state.match.match,
  isJoinMatch: state.join.joined,
  role: state.user.role,
});

export default connect(mapStateToProps)(MatchPage);
