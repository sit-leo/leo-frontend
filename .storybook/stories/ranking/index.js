import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import ApplicantRanking from '../../../components/ranking/ApplicantRanking';

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
  .add('ApplicantRanking Component', () => (
    <ApplicantRanking />
  ))