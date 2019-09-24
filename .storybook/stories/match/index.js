import React from 'react';
import { storiesOf } from '@storybook/react';

import MatchPage from '../../../components/matches/MatchPage';
import MyMatchesPage from '../../../components/matches/MyMatchesPage';

storiesOf('Match Management', module)
  .add('MatchPage Component', () => (
    <MatchPage />
  ))
  .add('MyMatchesPage Component', () => (
    <MyMatchesPage />
  ))