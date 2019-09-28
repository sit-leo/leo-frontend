import React from 'react';
import { storiesOf } from '@storybook/react';

import { Profile } from '../../../components/profile/ProfilePage';

storiesOf('Profile', module)
  .add('Applicant - ProfilePage Component', () => (
    <Profile
      role='applicant'
      form={{
        getFieldDecorator:(a, b)=> (c) => c
      }}
    />
  ))
  .add('Recruiter - ProfilePage Component', () => (
    <Profile
      role='recruiter'
      form={{
        getFieldDecorator:(a, b)=> (c) => c
      }}
    />
  ))