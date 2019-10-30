import React, { useState, useEffect } from 'react';

import { clientInstance } from '../../tools/request';

import matchAdapter from '../../store/match/match-adapter';

import WithNavbar from '../layouts/with-navbar';

import ContainerRow, { Col } from '../base/Grid';
import { Title, NoteText } from '../base/Text';
import { EventCard } from '../base/Card';
import { MainButtonLight } from '../base/Button';

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
      numOfRecruiter={match.numOfRecruiter || 0}
      numOfApplicant={match.numOfApplicant || 0}
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
  const matchRequest = matchAdapter(clientInstance());

  const [lastestPage, setLastestPage] = useState(1);

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

  function handleResponse(attributeType, loadingType) {
    return (response) => {
      if (response.content) {
        setMatch(previous => ({
          ...previous,
          [attributeType]: response.content,
        }));
        setLoading(previous => ({
          ...previous,
          [loadingType]: false,
        }));
      }
    };
  }

  function loadMoreLastestMatches() {
    const newPage = lastestPage + 1;

    matchRequest.getLastestMatches(newPage).then(
      (response) => {
        if (response.content.length > 0) {
          setMatch(previous => ({
            ...previous,
            lastestMatches: [
              ...previous.lastestMatches,
              ...response.content,
            ],
          }));
          setLoading(previous => ({
            ...previous,
            loadingLastestMatch: false,
          }));

          setLastestPage(newPage);
        }
      },
    );
  }

  useEffect(() => {
    matchRequest.getLastchanceMatches(1).then(
      handleResponse('lastchanceMatches', 'loadingLastchance'),
    );
    matchRequest.getPopularMatches(1).then(
      handleResponse('popularMatches', 'loadingPopular'),
    );
    matchRequest.getLastestMatches(1).then(
      handleResponse('lastestMatches', 'loadingLastestMatch'),
    );
  }, []);

  return (
    <WithNavbar>
      <ContainerRow>
        <Col lg={12} className="mt-5">
          <Title>
            Last chance to join
            <NoteText>   Don't miss the chance to join these matches.</NoteText>
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
      <ContainerRow>
        <Col className="text-center mt-3 mb-5">
          <MainButtonLight onClick={loadMoreLastestMatches}>
          Load more
          </MainButtonLight>
        </Col>
      </ContainerRow>
    </WithNavbar>
  );
};

export default EventListPage;
