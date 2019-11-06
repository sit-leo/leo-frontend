import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table } from 'antd';


import Organization from '../layouts/organization';

import color from '../../config/color';

import { Col, Row } from '../base/Grid';
import {
  TitleLargePrimary,
  TitleLargeWhite,
  SubTitleStatistic,
} from '../base/Text';
import Card from '../base/Card';
import { IconLargeWhite } from '../base/Icon';
import Tabs, { TabPane } from '../base/Tabs';
import { LinkButton } from '../base/Button';

import Chart from './Chart';

import { columns as applicantColumns } from './AddApplicantPage';
import { columns as recruiterColumns } from './AddRecruiterPage';
import { setLoading as setLoadingAction } from '../../store/global';
import { isCreateOrUpdate } from './MatchManagementPage';

const StatisticCard = styled.a`
  padding: 8px 16px;
  margin: 10px 0;
  max-height: 89px;
  min-height: 89px;
  border-radius: 4px;
  box-shadow: 0 2px 10px 0 rgba(96, 84, 84, 0.1);
  text-decoration: none !important;
  cursor: pointer;
  transition: .15s;
  background-color: ${props => props.color || color.hover};

  &:hover {
    box-shadow: 0 5px 10px 0 rgba(23, 23, 23, 0.25);
  }

  @media (min-width: 1366px) {
    max-width: 255px;
  }
`;

const Statistic = ({
  number,
  text,
  url,
  cardColor,
  onClick = () => { },
}) => (
  <StatisticCard
    href={url}
    onClick={onClick}
    className={
    `w-100 ${text ? 'd-block' : 'd-flex justify-content-center align-items-center'}`
    }
    color={cardColor}
  >
    <Row className={text ? 'mt-1' : 'mt-0 w-100'}>
      <Col xs={9}>
        <TitleLargeWhite className="mb-0">
          {number}
        </TitleLargeWhite>
        <SubTitleStatistic className="mb-0">
          {text}
        </SubTitleStatistic>
      </Col>
      <Col xs={3} className="d-flex align-items-center justify-content-center">
        <IconLargeWhite type="right-circle" />
      </Col>
    </Row>
  </StatisticCard>
);

const DashboardPage = ({
  isCurrentMatch = false,
  applicants,
  recruiters,
  setLoading,
  statistics: {
    numberOfMatches = 0,
    numberOfApplicants = 0,
    numberOfRecruiters = 0,
  },
}) => {
  const [tab, setTab] = useState('1');

  const TABS = [
    {
      index: 1,
      name: 'Applicants',
      key: 'applicants',
      props: {
        dataSource: applicants,
        columns: applicantColumns,
        rowKey: record => record.email,
      },
    },
    {
      index: 2,
      name: 'Recruiters',
      key: 'recruiters',
      props: {
        dataSource: recruiters,
        columns: recruiterColumns,
        rowKey: record => record.email,
      },
    },
  ];

  return (
    <Organization title="About Organization">
      <Col className="d-lg-flex justify-content-between">
        <Statistic url="/my-matches" number={numberOfMatches} text="Matches" cardColor="#58b0ad" />
        <Statistic url="#members" onClick={() => setTab('1')} number={numberOfApplicants} text="Applicants" cardColor="#58b09e" />
        <Statistic url="#members" onClick={() => setTab('2')} number={numberOfRecruiters} text="Recruiters" cardColor="#58b090" />
        <Statistic url="/organizations/matches/management" number={isCreateOrUpdate(isCurrentMatch)} cardColor="#58b081" />
      </Col>
      <Col>
        <Card className="my-3">
          <TitleLargePrimary>
            Statistics
            <hr />
          </TitleLargePrimary>
          <Chart />
        </Card>
      </Col>
      <Col id="members">
        <Card>
          <TitleLargePrimary>
            Members
          </TitleLargePrimary>
          <Tabs
            defaultActiveKey="1"
            activeKey={tab}
            onChange={key => setTab(key)}
            animated={false}
          >
            {
              TABS.map(({
                name, props, key, index,
              }) => (
                <TabPane tab={name} key={index}>
                  <div className="text-right mb-3">
                    <LinkButton href={`/organizations/${key}/add`}>{`+ Add more ${key}`}</LinkButton>
                  </div>
                  <Table {...props} />
                </TabPane>
              ))
            }
          </Tabs>
        </Card>
      </Col>
    </Organization>
  );
};

const mapStateToProps = state => ({
  isCurrentMatch: state.match.isCurrentMatch,
  applicants: state.organization.applicants,
  recruiters: state.organization.recruiters,
  statistics: state.organization.statistics,
});

const mapDispatchToProps = dispatch => ({
  setLoading: bindActionCreators(setLoadingAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
