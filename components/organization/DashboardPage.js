import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, Radio, DatePicker } from 'antd';

import Organization from '../layouts/organization';

import color from '../../config/color';

import { setLoading as setLoadingAction } from '../../store/global';

import ContainerRow, { Col, Row } from '../base/Grid';
import {
  TitleLargePrimary,
  TitleLargeWhite,
  SubTitleSummarize,
  TitleStatistic,
  SubTitleStatistic,
} from '../base/Text';
import Card from '../base/Card';
import { IconLargeWhite } from '../base/Icon';
import Tabs, { TabPane } from '../base/Tabs';
import { LinkButton } from '../base/Button';
import { FlexCenter } from '../base/Flex';

import Chart from './Chart';

import { columns as applicantColumns } from './AddApplicantPage';
import { columns as recruiterColumns } from './AddRecruiterPage';

const StatisticCard = styled(FlexCenter)`
  width: 100%;
  min-height: 89px;
  border-radius: 4px;
  box-shadow: 0 2px 10px 0 ${color.shadow};
  background-color: ${props => props.color || color.white};
  transition: .15s;

  &:hover {
    box-shadow: 0 5px 10px 0 rgba(23, 23, 23, 0.25);
  }
`;

const Statistic = ({
  number = 0,
  label = '-',
  color,
}) => (
  <StatisticCard
    className="flex-column"
    color={color}
  >
    <TitleStatistic>
      {number}
    </TitleStatistic>
    <SubTitleStatistic className="text-center">
      {label}
    </SubTitleStatistic>
  </StatisticCard>
);

const SummarizeCard = styled.a`
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

const Summarize = ({
  number,
  text,
  url,
  cardColor,
  onClick = () => { },
}) => (
  <SummarizeCard
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
        <SubTitleSummarize className="mb-0">
          {text}
        </SubTitleSummarize>
      </Col>
      <Col xs={3} className="d-flex align-items-center justify-content-center">
        <IconLargeWhite type="right-circle" />
      </Col>
    </Row>
  </SummarizeCard>
);

const DashboardPage = ({
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
        <Summarize url="/my-matches" number={numberOfMatches} text="Matches" cardColor="#58b0ad" />
        <Summarize url="#members" onClick={() => setTab('1')} number={numberOfApplicants} text="Applicants" cardColor="#58b09e" />
        <Summarize url="#members" onClick={() => setTab('2')} number={numberOfRecruiters} text="Recruiters" cardColor="#58b090" />
        <Summarize url="/organizations/matches/create" number="Create Match" cardColor="#58b081" />
      </Col>
      <Col>
        <Card className="my-3">
          <TitleLargePrimary>
            Statistics
            <hr />
          </TitleLargePrimary>
          <ContainerRow className="my-4">
            <Col lg={{ size: 3, offset: 1 }} className="mt-1 mb-4 d-flex justify-content-between">
              <Radio.Group className="w-100" value="Months" onChange={value => console.log(value)}>
                <Radio.Button className="w-50 text-center" value="Months">Months</Radio.Button>
                <Radio.Button className="w-50 text-center" value="Years">Years</Radio.Button>
              </Radio.Group>
            </Col>
            <Col lg={{ size: 3, offset: 4 }} className="mt-1 mb-4 d-flex justify-content-between">
              <DatePicker.MonthPicker className="w-100" onChange={e => console.log(e)} />
            </Col>
            <Col lg={{ size: 2, offset: 1 }}>
              <Statistic
                label="Matches"
                color="#ff9592"
              />
            </Col>
            <Col lg={2}>
              <Statistic
                label={'Applicants\nParticipating'}
                color="#fe9e91"
              />
            </Col>
            <Col lg={2}>
              <Statistic
                label={'Recruters\nParticipating'}
                color="#fea791"
              />
            </Col>
            <Col lg={2}>
              <Statistic
                label={'Unmatched\nApplicant'}
                color="#feb091"
              />
            </Col>
            <Col lg={2}>
              <Statistic
                label={'Unmatched\nRecruiters'}
                color="#feb991"
              />
            </Col>
            <Col className="mt-5" lg={{ size: 10, offset: 1 }}>
              <TitleLargePrimary>
                Overall Statistics
              </TitleLargePrimary>
            </Col>
            <Col>
              <Chart />
            </Col>
          </ContainerRow>
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
  applicants: state.organization.applicants,
  recruiters: state.organization.recruiters,
  statistics: state.organization.statistics,
});

const mapDispatchToProps = dispatch => ({
  setLoading: bindActionCreators(setLoadingAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
