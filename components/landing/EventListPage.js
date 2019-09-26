import React, { useState, useEffect } from 'react';

import color from '../../config/color';

import { clientInstance } from '../../tools/request';

import matchAdapter from '../../store/match/match-adapter';

import WithNavbar from '../layouts/with-navbar';

import ContainerRow, { Col } from '../base/Grid';
import { Title } from '../base/Text';
import { EventCard } from '../base/Card';

const initMatch = {
  id: '0',
  name: 'Default Name',
  description: 'Default Description',
};

const MatchCard = ({ match = initMatch, ...props }) => (
  <Col lg={4}>
    <EventCard
      id={match.id}
      title={match.name || ''}
      description={match.description || ''}
      src="../../static/images/match-mockup.jpg"
      {...props}
    />
  </Col>
);

const LoadingEventCard = ({ type = 'default' }) => (
  [1, 2, 3].map((_, index) => (
    <MatchCard key={`${index}-${type}`} loading />
  ))
);

const EventListPage = () => {
  const [loading, setLoading] = useState({
    loadingLastchance: true,
    loadingPopular: true,
    loadingLastestMatch: true,
  });
  const [match, setMatch] = useState({
    lastchanceMatches: [],
    popularMatches: [],
    lastestMatches: [],
  });

  useEffect(() => {
    const matchRequest = matchAdapter(clientInstance());
    matchRequest.getLastchanceMatches(1).then((response) => {
      if (response.content) {
        setMatch(previous => ({
          ...previous,
          lastchanceMatches: response.content,
        }));
        setLoading(previous => ({
          ...previous,
          loadingLastchance: false,
        }));
      }
    });
    matchRequest.getPopularMatches(1).then((response) => {
      if (response.content) {
        setMatch(previous => ({
          ...previous,
          popularMatches: response.content,
        }));
        setLoading(previous => ({
          ...previous,
          loadingPopular: false,
        }));
      }
    });
    matchRequest.getLastestMatches(1).then((response) => {
      if (response.content) {
        setMatch(previous => ({
          ...previous,
          lastestMatches: response.content,
        }));
        setLoading(previous => ({
          ...previous,
          loadingLastestMatch: false,
        }));
      }
    });
  }, []);

  return (
    <WithNavbar>
      <ContainerRow>
        <Col lg={12} className="mt-5">
          <Title>
            Last chance to join
            <span style={{ color: color.secondary, fontSize: '16px' }}>   Don't miss the chance to join these matches.</span>
          </Title>
        </Col>
        {
          loading.loadingLastchance
            ? <LoadingEventCard type="lastchance" />
            : match.lastchanceMatches.map((lastchanceMatch, index) => (
              <MatchCard key={`${index}-lastchance`} match={lastchanceMatch} />
            ))
        }
      </ContainerRow>
      <ContainerRow>
        <Col lg={12} className="mt-5">
          <Title>Popular matching</Title>
        </Col>
        {
          loading.loadingPopular
            ? <LoadingEventCard type="popular" />
            : match.popularMatches.map((popularMatch, index) => (
              <MatchCard key={`${index}-popular`} match={popularMatch} />
            ))
        }
      </ContainerRow>
      <ContainerRow>
        <Col lg={12} className="mt-5">
          <Title>Latest matching</Title>
        </Col>
        {
          loading.loadingLastestMatch
            ? <LoadingEventCard type="lastest" />
            : match.lastestMatches.map((lastestMatch, index) => <MatchCard key={`${index}-lastest`} match={lastestMatch} />)
        }
      </ContainerRow>
    </WithNavbar>
  );
};

export default EventListPage;
