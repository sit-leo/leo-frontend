import React from 'react';
import { storiesOf } from '@storybook/react';

import Card, { SmallCard } from '../../../components/base/Card';

storiesOf('Base/Card', module)
  .add('Card Component', () => (
    <Card>Example Card</Card>
  ))
  .add('Small Card Component', () => (
    <SmallCard>Example Small Card</SmallCard>
  ))