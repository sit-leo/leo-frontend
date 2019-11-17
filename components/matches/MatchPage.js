import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Router from 'next/router';
import { Card as AntdCard, Avatar } from 'antd';
import day from 'dayjs';

import colors from '../../config/color';

import { clientInstance } from '../../tools/request';
import { isApplicant, isRecruiter, isOrganizer } from '../../tools/with-roles';
import { redirectToOrganizations } from '../../tools/redirect-orgnaizations';

import isCanJoinMatch, {
  convertDatePeriod,
  isAnnouceDate,
  getNextDay,
  isApplicantCanRanking,
  isRecruiterCanRanking,
  isRankingPeriod,
} from '../../tools/match-time';
import WithNavbar from '../layouts/with-navbar';

import organizationAdapter from '../../store/organization/organization-adapter';

import {
  TitleLarge, Title, TitleWhite, TitleSmall, TitlePrimary, TitleSmallPrimary, TitleDanger, TitleLargePrimary,
} from '../base/Text';
import Button, { GhostDangerButton } from '../base/Button';
import Card from '../base/Card';
import ContainerRow, { Row, Col } from '../base/Grid';
import { BreadcrumbList } from '../base/Breadcrumb';
import Modal from '../base/Modal';
import { setLoading } from '../../store/global';
import { FlexCenter } from '../base/Flex';
import Tabs, { TabPane } from '../base/Tabs';
import Table from '../base/Table';

import { columns as applicantColumns } from '../organization/AddApplicantPage';
import { columns as recruiterColumns } from '../organization/AddRecruiterPage';
import { ApplicantDescription, RecruiterDescription } from '../base/Description';

const TABS = ['Applicants', 'Positions'];

const Statistic = ({ number, label }) => (
  <FlexCenter className="flex-column my-3 px-4">
    <TitlePrimary className="m-0">{number}</TitlePrimary>
    <TitleSmall className="text-center">{label}</TitleSmall>
  </FlexCenter>
);

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
  const [isOpenDelete, toggleDelete] = useState(false);

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
      if (isOrganizer(role)) {
        return true;
      }
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

  function tableProps(tableType) {
    const [APPLICANTS, RECRUITERS] = TABS;

    if (tableType === APPLICANTS) {
      return ({
        expandedRowRender: ApplicantDescription,
        columns: applicantColumns,
        dataSource: [],
        rowKey: record => record.applicantId,
      });
    }

    if (tableType === RECRUITERS) {
      return ({
        expandedRowRender: RecruiterDescription,
        columns: recruiterColumns,
        dataSource: [],
        rowKey: record => record.recruiterId,
      });
    }

    return null;
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
              {
                isOrganizer(role) && isAnnouceDate(match.announceDate) && (
                  <React.Fragment>
                    <Col>
                      <Title>Statistics</Title>
                    </Col>
                    <Col lg={6}>
                      <Statistic number={28} label={'Success\nApplicants'} />
                    </Col>
                    <Col lg={6}>
                      <Statistic number={11} label={'Success\nPositions'} />
                    </Col>
                    <Col lg={6}>
                      <Statistic number={8} label={'Unmatched\nApplicants'} />
                    </Col>
                    <Col lg={6}>
                      <Statistic number={1} label={'Unmatched\nPositions'} />
                    </Col>
                  </React.Fragment>
                )
              }
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
                {
                  isOrganizer(role) && !isAnnouceDate(match.announceDate) && (
                    <GhostDangerButton
                      className="w-100 mt-2"
                      onClick={() => toggleDelete(true)}
                    >
                      <TitleDanger className="mb-0">
                        Delete Match
                      </TitleDanger>
                    </GhostDangerButton>
                  )
                }
              </Col>
            </Row>
          </Card>
        </Col>
        {
          isOrganizer(role) && (
            <Col className="my-5">
              <Card>
                <TitleLargePrimary>
                  Participants
                </TitleLargePrimary>
                <Tabs defaultActiveKey="Applicants" onChange={() => {}} animated={false}>
                  {
                      TABS.map((tab, key) => (
                        <TabPane tab={tab} key={`${key + 1}`}>
                          <Table
                            {...tableProps(tab)}
                          />
                        </TabPane>
                      ))
                    }
                </Tabs>
              </Card>
            </Col>
          )
        }
      </ContainerRow>
      {
        isOrganizer(role) && (
          <Modal
            isOpenModal={isOpenDelete}
            onClose={() => toggleDelete(false)}
            options={{
              header: 'Delete Confirmation',
              body: `Are you sure to delete this match?
              Please check the information before confirming.`,
              footer: 'You can\'t undo deleting the match after confirm.',
            }}
            onConfirm={async () => {
              toggleDelete(false);
              setLoading(true);
              const organizationRequest = organizationAdapter(clientInstance());
              await organizationRequest.deleteMatchById(match.id);
              setLoading(false);
              redirectToOrganizations();
            }}
          />
        )
      }
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
