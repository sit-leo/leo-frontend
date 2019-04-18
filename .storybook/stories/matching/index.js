import React from 'react';
import { storiesOf } from '@storybook/react';

import ApplicantRankingPage from '../../../components/matching/ApplicantRankingPage';
import RecruiterPositionPage from '../../../components/matching/RecruiterPositionPage';
import RecruiterRankingPage from '../../../components/matching/RecruiterRankingPage';

storiesOf('Ranking', module)
  .add('ApplicantRankingPage Component', () => (
    <ApplicantRankingPage />
  ))
  .add('RecruiterPositionPage Component', () => (
    <RecruiterPositionPage />
  ))
  .add('RecruiterRankingPage Component', () => (
    <RecruiterRankingPage />
  ))