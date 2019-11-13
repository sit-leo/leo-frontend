import React from 'react';
import { storiesOf } from '@storybook/react';

import LoginPage from '../../../components/user/LoginPage';
import SignupPage from '../../../components/user/SignupPage';

storiesOf('User', module)
  .add('Login Component', () => (
    <LoginPage />
  ))
  .add('Signup Component', () => (
    <SignupPage />
  ))