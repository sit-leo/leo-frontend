import React from 'react';
import { storiesOf } from '@storybook/react';

import Navbar from '../../../components/base/Navbar';

storiesOf('Base/Navbar', module)
  .add('Navbar Component', () => (
    <React.Fragment>
      <Navbar />
      <br />
      <Navbar role='guest' />
    </React.Fragment>
  ))