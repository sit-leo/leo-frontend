import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { initState as match } from '../../../store/match'
import { initState as ranking } from '../../../store/matching/ranking'

import ApplicantRankingPage from '../../../components/matching/ApplicantRankingPage';
import RecruiterPositionPage from '../../../components/matching/RecruiterPositionPage';
import RecruiterRankingPage from '../../../components/matching/RecruiterRankingPage';

const mockStore = configureStore();
const store = mockStore({
  match,
  ranking,
});

storiesOf('Ranking', module)
  .addDecorator(getStory => <Provider store={store}>{getStory()}</Provider>)
  .add('ApplicantRankingPage Component', () => (
    <ApplicantRankingPage />
  ))
  .add('RecruiterPositionPage Component', () => (
    <RecruiterPositionPage />
  ))
  .add('RecruiterRankingPage Component', () => (
    <RecruiterRankingPage />
  ))