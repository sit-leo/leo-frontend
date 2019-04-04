import React from 'react';
import { storiesOf } from '@storybook/react';

import RankingPage from '../../../components/ranking';

storiesOf('Ranking', module)
  .add('Ranking Component', () => (
    <RankingPage text="Default" />
  ))