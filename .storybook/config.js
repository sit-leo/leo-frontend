import { configure } from '@storybook/react';
import 'antd/dist/antd.min.css';

function loadStories() {
  require('./stories/base/text.js');
  require('./stories/base/input.js');
  require('./stories/base/button.js');
  require('./stories/ranking/index.js');
}

configure(loadStories, module);