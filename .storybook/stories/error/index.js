import React from 'react';
import { storiesOf } from '@storybook/react';

import ErrorPage from '../../../pages/_error';

storiesOf('Error', module)
  .add('Error 404 Component', () => (
    <React.Fragment>
      <ErrorPage statusCode={404} query={{message: ''}} />
    </React.Fragment>
  ))
  .add('Error 404 Custom Message Component', () => (
    <React.Fragment>
      <ErrorPage statusCode={404} query={{message: 'Custom Message'}} />
    </React.Fragment>
  ))
  .add('Error 500 Component', () => (
    <React.Fragment>
      <ErrorPage statusCode={500} query={{message: ''}} />
    </React.Fragment>
  ))
  .add('Error 500 Custom Message Component', () => (
    <React.Fragment>
      <ErrorPage statusCode={500} query={{message: 'Custom Message'}} />
    </React.Fragment>
  ))
