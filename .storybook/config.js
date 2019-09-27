import 'antd/dist/antd.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './font.css';

import { configure, addDecorator } from '@storybook/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { initState as global } from '../store/global'
import { initState as user } from '../store/user'
import { initState as match } from '../store/match'
import { initState as ranking } from '../store/matching/ranking'
import { initState as join } from '../store/matching/join'
import { initState as profile } from '../store/profile'

const stories = require.context('./stories', true, /.js$/);

function loadStories() {
  stories.keys().forEach(filename => stories(filename));
}

const mockStore = configureStore();
const store = mockStore({
  global,
  user,
  match,
  ranking,
  join,
  profile,
});
addDecorator(getStory => <Provider store={store}>{getStory()}</Provider>)

configure(loadStories, module);