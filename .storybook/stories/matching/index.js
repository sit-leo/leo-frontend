import React from 'react';
import { storiesOf } from '@storybook/react';

import ApplicantRankingPage from '../../../components/matching/ApplicantRankingPage';
import RecruiterPositionPage from '../../../components/matching/RecruiterPositionPage';
import RecruiterRankingPage from '../../../components/matching/RecruiterRankingPage';
import ApplicantJoinMatchPage from '../../../components/matching/ApplicantJoinMatchPage';
import RecruiterJoinMatchPage from '../../../components/matching/RecruiterJoinMatchPage';

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
  .add('ApplicantJoinMatchPage Component', () => (
    <ApplicantJoinMatchPage />
  ))
  .add('RecruiterJoinMatchPage Component', () => (
    <RecruiterJoinMatchPage />
  ))