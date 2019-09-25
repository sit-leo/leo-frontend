import React from 'react';
import { storiesOf } from '@storybook/react';

import LandingPage from '../../../components/landing';
import EventListPage from '../../../components/landing/EventListPage';

storiesOf('Landing', module)
  .add('LandingPage Component', () => (
    <LandingPage />
  ))
  .add('EventListPage Component', () => (
    <EventListPage />
  ))