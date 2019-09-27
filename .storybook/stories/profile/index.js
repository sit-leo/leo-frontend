import React from 'react';
import { storiesOf } from '@storybook/react';

import { ProfilePage } from '../../../components/profile/ProfilePage';

storiesOf('Profile', module)
  .add('Applicant - ProfilePage Component', () => (
    <ProfilePage
      role='applicant'
      form={{
        getFieldDecorator:(a, b)=> (c) => c
      }}
    />
  ))
  .add('Recruiter - ProfilePage Component', () => (
    <ProfilePage
      role='recruiter'
      form={{
        getFieldDecorator:(a, b)=> (c) => c
      }}
    />
  ))