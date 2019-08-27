import React from 'react';
import { storiesOf } from '@storybook/react';
import Loading from '../../../components/base/Loading';

storiesOf('Base/Loading', module)
  .add('Loading', () => (
    <React.Fragment>
      <Loading loading />
    </React.Fragment>
  ))