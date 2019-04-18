import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import ApplicantRankingPage from '../../../components/ranking/ApplicantRankingPage';

const mockStore = configureStore();
const store = mockStore({
  match: {
    match: {},
  },
  applicant: {
    ranks: []
  }
});

storiesOf('Ranking', module)
  .addDecorator(getStory => <Provider store={store}>{getStory()}</Provider>)
  .add('ApplicantRankingPage Component', () => (
    <ApplicantRankingPage />
  ))