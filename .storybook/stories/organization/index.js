import React from 'react';
import { storiesOf } from '@storybook/react';

import MyOrganizationsPage from '../../../components/organization/MyOrganizationsPage';
import DashboardPage from '../../../components/organization/DashboardPage';
import MatchManagementPage from '../../../components/organization/MatchManagementPage';
import AddRecruiterPage from '../../../components/organization/AddRecruiterPage';
import AddApplicantPage from '../../../components/organization/AddApplicantPage';

storiesOf('Organization', module)
  .add('My Organization Component', () => (
    <MyOrganizationsPage />
  ))
  .add('Dashboard Component', () => (
    <DashboardPage />
  ))
  .add('Match Management Component', () => (
    <MatchManagementPage />
  ))
  .add('Add Recruiter Component', () => (
    <AddRecruiterPage />
  ))
  .add('Add Applicant Component', () => (
    <AddApplicantPage />
  ))