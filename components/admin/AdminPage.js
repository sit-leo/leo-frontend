import React from 'react';

import { message } from 'antd';
import { clientInstance } from '../../tools/request';
import cookie from '../../tools/cookie';

import WithNavbar from '../layouts/with-navbar';

import ContainerRow, { Col } from '../base/Grid';
import { TitleLargePrimary } from '../base/Text';

import OrganizationForm from './OrganizationForm';
import userAdapter from '../../store/user/user-adapter';

const AdminPage = () => (
  <WithNavbar>
    <ContainerRow>
      <Col>
        <TitleLargePrimary className="mt-3">
          Create Organization
        </TitleLargePrimary>
      </Col>
    </ContainerRow>
    <OrganizationForm
      isCreate
      submit={async (organization) => {
        const userRequest = userAdapter(clientInstance());
        const response = await userRequest.createOrganization(organization);
        if (!response.error) {
          message.success('Create organization success.');
        } else {
          message.error('Create organization failed.');
        }
      }}
    />
  </WithNavbar>
);

export default AdminPage;
