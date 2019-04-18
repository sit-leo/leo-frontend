import 'antd/dist/antd.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './font.css';

import { configure } from '@storybook/react';

const stories = require.context('./stories', true, /.js$/);

function loadStories() {
  stories.keys().forEach(filename => stories(filename));
}

configure(loadStories, module);