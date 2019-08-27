import React from 'react';
import { storiesOf } from '@storybook/react';

import LoginPage from '../../../components/user/LoginPage';

storiesOf('User', module)
  .add('Login Component', () => (
    <LoginPage />
  ))