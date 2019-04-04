import React from 'react';
import { storiesOf } from '@storybook/react';

import Card from '../../../components/base/Card';

storiesOf('Base/Card', module)
  .add('Card Component', () => (
    <Card>Example Card</Card>
  ))