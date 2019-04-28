import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import WithNavbar from '../layouts/with-navbar';
import ContainerRow, { Col, Row } from '../base/Grid';

import Card from '../base/Card';
import MatchCard from './MatchCard';
import Tabs, { TabPane } from '../base/Tabs';


const MatchList = ({ matches = [] }) => (
  matches.map(match => (
    <MatchCard key={match.name} />
  ))
);

const MyMatchPage = ({ matches }) => (
  <WithNavbar>
    <ContainerRow className="py-5">
      <Card className="px-0">
        <Row>
          <Col lg={{ size: 10, offset: 1 }}>
            <Tabs defaultActiveKey="1" animated={false}>
              <TabPane tab="Current" key="1">
                <MatchList matches={matches} />
              </TabPane>
              <TabPane tab="History" key="2">
                <MatchList matches={matches} />
              </TabPane>
              <TabPane tab="Result" key="3">
                <MatchList matches={matches} />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Card>
    </ContainerRow>
  </WithNavbar>
);

const mapStateToProps = state => ({
  matches: state.match.matches,
});

export default connect(mapStateToProps)(MyMatchPage);
