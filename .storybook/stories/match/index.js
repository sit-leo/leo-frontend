import React from 'react';
import { storiesOf } from '@storybook/react';

import MatchPage from '../../../components/matches/MatchPage';

storiesOf('Match', module)
  .add('MatchPage Component', () => (
    <MatchPage />
  ))