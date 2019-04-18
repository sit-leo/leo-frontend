import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { initState as match } from '../../../store/match'

import MatchPage from '../../../components/matches/MatchPage';

const mockStore = configureStore();
const store = mockStore({
  match,
});

storiesOf('Match', module)
  .addDecorator(getStory => <Provider store={store}>{getStory()}</Provider>)
  .add('MatchPage Component', () => (
    <MatchPage />
  ))