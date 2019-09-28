import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Router from 'next/router';
import { Card as AntdCard, Avatar } from 'antd';
import day from 'dayjs';

import colors from '../../config/color';

import { isApplicant } from '../../tools/with-roles';
import { convertDatePeriod, isAnnouceDate, getNextDay } from '../../tools/match-time';
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

  return (
    <WithNavbar>
      <ContainerRow className="py-5">
        <Col>
          <BreadcrumbList
            items={[
              { url: '/', name: 'Matches' },
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
                  onClick={() => {
                    if (isAnnouceDate(match.announceDate)) {
                      handleMatchResult();
                    } else if (isJoinMatch) {
                      handleRankingMatch();
                    } else {
                      handleJoinMatch();
                    }
                  }}
                >
                  <TitleWhite className="mb-0">
                    {
                       !isJoinMatch && !(isAnnouceDate(match.announceDate))
                         ? 'Join Match'
                         : 'Ranking'
                    }
                    {
                      isAnnouceDate(match.announceDate)
                        && 'Match Result'
                    }
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
  isJoinMatch: state.match.joined,
  role: state.user.role,
});

export default connect(mapStateToProps)(MatchPage);
