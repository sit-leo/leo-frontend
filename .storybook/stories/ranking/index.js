import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { RankingPage } from '../../../components/ranking';

const mockStore = configureStore();
const store = mockStore({});

storiesOf('Ranking', module)
  .addDecorator(getStory => <Provider store={store}>{getStory()}</Provider>)
  .add('Ranking Component', () => (
    <RankingPage text="Default" />
  ))