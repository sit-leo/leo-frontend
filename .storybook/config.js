import { configure } from '@storybook/react';
import 'antd/dist/antd.min.css';

function loadStories() {
  require('./stories/text.js');
  require('./stories/button.js');
}

configure(loadStories, module);