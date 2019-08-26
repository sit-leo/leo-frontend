import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Router from 'next/router';
import { Breadcrumb, Card as AntdCard, Avatar } from 'antd';

import colors from '../../config/color';

import WithNavbar from '../layouts/with-navbar';


import {
  TitleLarge, Title, TitleWhite, TitleSmall, TitlePrimary,
} from '../base/Text';
import Button from '../base/Button';
import Card from '../base/Card';
import ContainerRow, { Row, Col } from '../base/Grid';

import { ROLE_APPLICANT } from '../../tools/with-roles';

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
    title={<TitleSmall className="m-0">{title}</TitleSmall>}
    description={<TitleSmall>{date}</TitleSmall>}
  />
);

const NumberLabel = ({ description, number }) => (
  <LabelCard>
    <TitlePrimary className="m-0">{number}</TitlePrimary>
    <TitleSmall>{description}</TitleSmall>
  </LabelCard>
);

const MatchPage = ({ match, role }) => {
  function handleMatchResult() {
    if (role === ROLE_APPLICANT) {
      return Router.push(`/matches/${match.id}/result`);
    }
    return Router.push(`/matches/${match.id}/result/positions`);
  }
  return (
    <WithNavbar>
      <ContainerRow className="py-5">
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/matches">Matches</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              Junior Programmer Match
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col lg={7} className="text-left">
          <TitleLarge>Junior Programmer Match</TitleLarge>
          <img className="w-100" src="/static/images/match-mockup.jpg" alt="match-mockup" />
          <hr />
          {
            'This matching is only for Junior Programmer. Join to apply the work and recruit the great employee, rank them by yourself.'
          }
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
                  date="15 - 21 November 2019 (end at 00:00)"
                />
              </Col>
              <Col>
                <DateLabel
                  title="Applicant Rank"
                  date="22 - 24 November 2019 (end at 00:00)"
                />
              </Col>
              <Col>
                <DateLabel
                  title="Recruiter Rank"
                  date="25 - 27 November 2019 (end at 00:00)"
                />
              </Col>
              <Col>
                <DateLabel
                  title="Result"
                  date="28 November 2019 (at 9:00)"
                />
              </Col>
              <hr className="w-100" />
              <Col lg={6}>
                <NumberLabel description="Applicants" number="58" />
              </Col>
              <Col lg={6}>
                <NumberLabel description="Recruiters" number="12" />
              </Col>
              <Col className="text-center">
                <Button className="w-100" onClick={null}>
                  <TitleWhite className="mb-0">Join Match</TitleWhite>
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col className="text-center">
          <hr className="w-100" />
          <Button onClick={handleMatchResult}>
            Match Result
          </Button>
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
  role: state.user.role,
});

export default connect(mapStateToProps)(MatchPage);
