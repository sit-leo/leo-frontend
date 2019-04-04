import 'antd/dist/antd.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { configure } from '@storybook/react';

function loadStories() {
  require('./stories/base/text.js');
  require('./stories/base/input.js');
  require('./stories/base/button.js');
  require('./stories/ranking/index.js');
}

configure(loadStories, module);