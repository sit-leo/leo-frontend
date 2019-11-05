import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import day from 'dayjs';

import { clientInstance } from '../../tools/request';
import { isOrganizer } from '../../tools/with-roles';

import matchAdapter from '../../store/match/match-adapter';

import { setLoading as setLoadingAction } from '../../store/global';
import { setMatches as setMatchesAction } from '../../store/match';

import WithLoading from '../layouts/with-loading';
import WithNavbar from '../layouts/with-navbar';

import ContainerRow, { Col, Row } from '../base/Grid';
import Tabs, { TabPane } from '../base/Tabs';
import Card from '../base/Card';
import { TitleSmall, TitleLargePrimary } from '../base/Text';

import MatchCard from './MatchCard';
import MainButton from '../base/Button';

const matchRequest = matchAdapter(clientInstance());

const NoMatch = ({ role }) => (
  <Col className="text-center">
    <span>
      There is no current match.
    </span>
    {
      isOrganizer(role) && (
        <React.Fragment>
          <span>Click below button to create match.</span>
          <br />
          <a href="/organizations/matches/management">
            <MainButton className="my-3">
              Create Match
            </MainButton>
          </a>
        </React.Fragment>
      )
    }
  </Col>
);

const MatchList = ({ matches = [], role }) => (
  matches.length > 0
    ? matches.map(match => (
      <MatchCard
        key={match.id}
        id={match.id}
        title={match.name}
        numOfApplicant={match.numOfApplicant}
        numOfRecruiter={match.numOfRecruiter}
        startDate={day(match.announceDate).format('DD MMM YYYY')}
      />
    ))
    : <NoMatch role={role} />
);

const TABS = ['Current', 'History'];

const MyMatchPage = ({
  role, matches, setMatches, setLoading,
}) => {
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
        <ContainerRow>
          <Col lg={3}>
            <TitleLargePrimary className="mt-3">
              My Matches
            </TitleLargePrimary>
          </Col>
        </ContainerRow>
        <ContainerRow className="py-5">
          <Card className="px-lg-0">
            <Row>
              <Col lg={{ size: 10, offset: 1 }}>
                <Tabs defaultActiveKey="1" onChange={key => setTab(key)} animated={false}>
                  {
                    TABS.map((tap, key) => (
                      <TabPane tab={tap} key={`${key + 1}`}>
                        <MatchList matches={matches} role={role} />
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
  role: state.user.role,
  matches: state.match.matches,
});

const mapDispatchToProps = dispatch => ({
  setLoading: bindActionCreators(setLoadingAction, dispatch),
  setMatches: bindActionCreators(setMatchesAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyMatchPage);
