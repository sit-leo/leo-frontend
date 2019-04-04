import React from 'react';
import { storiesOf } from '@storybook/react';

import Hero from '../../../components/base/Hero';

storiesOf('Base/Hero', module)
  .add('Hero Component', () => (
    <Hero text="Hero Component" />
  ))