import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { clientInstance } from '../../tools/request';

import matchAdapter from '../../store/match/match-adapter';

import { setLoading as setLoadingAction } from '../../store/global';
import { setMatches as setMatchesAction } from '../../store/match';

import WithLoading from '../layouts/with-loading';
import WithNavbar from '../layouts/with-navbar';

import ContainerRow, { Col, Row } from '../base/Grid';
import Tabs, { TabPane } from '../base/Tabs';
import Card from '../base/Card';
import { TitleSmall } from '../base/Text';

import MatchCard from './MatchCard';

const matchRequest = matchAdapter(clientInstance());

const MatchList = ({ matches = [] }) => (
  matches.length > 0
    ? matches.map(match => (
      <MatchCard key={match.name} />
    ))
    : <TitleSmall className="text-center">No Matches Found.</TitleSmall>
);

const TABS = ['Current', 'History'];

const MyMatchPage = ({ matches, setMatches, setLoading }) => {
  const [tab, setTab] = useState('1');
  useEffect(() => {
    setLoading(true);
    if (tab === '1') {
      matchRequest.getCurrentMatches().then((newMatches) => {
        setMatches(newMatches);
        setLoading(false);
      });
    } else {
      matchRequest.getEndedMatches().then((newMatches) => {
        setMatches(newMatches);
        setLoading(false);
      });
    }
  }, [tab]);
  return (
    <WithLoading>
      <WithNavbar>
        <ContainerRow className="py-5">
          <Card className="px-0">
            <Row>
              <Col lg={{ size: 10, offset: 1 }}>
                <Tabs defaultActiveKey="1" onChange={key => setTab(key)} animated={false}>
                  {
                  TABS.map((tap, key) => (
                    <TabPane tab={tap} key={`${key + 1}`}>
                      <MatchList matches={matches} />
                    </TabPane>
                  ))
                }
                </Tabs>
              </Col>
            </Row>
          </Card>
        </ContainerRow>
      </WithNavbar>
    </WithLoading>
  );
};

const mapStateToProps = state => ({
  matches: state.match.matches,
});

const mapDispatchToProps = dispatch => ({
  setLoading: bindActionCreators(setLoadingAction, dispatch),
  setMatches: bindActionCreators(setMatchesAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyMatchPage);
