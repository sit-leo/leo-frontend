import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import Match from '../../../components/matches/Match';
import RecruiterPosition from '../../../components/matches/RecruiterPosition';

const mockStore = configureStore();
const store = mockStore({
  match: {
    match: {},
  },
  recruiter: {
    positions: []
  }
});

storiesOf('Match', module)
  .addDecorator(getStory => <Provider store={store}>{getStory()}</Provider>)
  .add('Match Component', () => (
    <Match />
  ))
  .add('RecruiterPosition Component', () => (
    <RecruiterPosition />
  ))