import React, { useState } from 'react';
import styled from 'styled-components';
import { Table } from 'antd';

import Organization from '../layouts/organization';

import { Col, Row } from '../base/Grid';
import {
  TitleLargePrimary,
  TitleLargeWhite,
  SubTitleStatistic,
} from '../base/Text';
import Card from '../base/Card';
import { IconLargeWhite } from '../base/Icon';
import color from '../../config/color';
import Tabs, { TabPane } from '../base/Tabs';

import { columns as applicantColumns, dataSource as stubApplicants } from './AddApplicantPage';
import { columns as recruiterColumns, dataSource as stubRecruiters } from './AddRecruiterPage';

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
  <StatisticCard href={url} onClick={onClick} className="d-block w-100" color={cardColor}>
    <Row className={text ? 'mt-2' : 'mt-1'}>
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
  applicants,
  recruiters,
}) => {
  const TABS = [
    {
      name: 'Applicants',
      props: {
        dataSource: applicants || stubApplicants,
        columns: applicantColumns,
      },
    },
    {
      name: 'Recruiters',
      props: {
        dataSource: recruiters || stubRecruiters,
        columns: recruiterColumns,
      },
    },
  ];

  const [tab, setTab] = useState('1');

  return (
    <Organization title="About Organization">
      <Col className="d-lg-flex justify-content-between">
        <Statistic url="/my-matches" number={5} text="Matches" cardColor="#58b0ad" />
        <Statistic url="#members" onClick={() => setTab('1')} number={439} text="Applicants" cardColor="#58b09e" />
        <Statistic url="#members" onClick={() => setTab('2')} number={19} text="Recruiters" cardColor="#58b090" />
        <Statistic url="/organizations/matches/create" number="Create Match" cardColor="#58b081" />
      </Col>
      <Col>
        <Card className="my-3">
          <TitleLargePrimary>
            Statistics
            <hr />
          </TitleLargePrimary>
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
              TABS.map(({ name, props }, key) => (
                <TabPane tab={name} key={`${key + 1}`}>
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

export default DashboardPage;
