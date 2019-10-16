import React from 'react';

import WithNavbar from './with-navbar';

import { TitleLargePrimary } from '../base/Text';
import ContainerRow, { Col } from '../base/Grid';

const Organization = ({ children, title }) => (
  <WithNavbar>
    <ContainerRow>
      <Col>
        <TitleLargePrimary className="my-3">
          {title}
        </TitleLargePrimary>
      </Col>
      {children}
    </ContainerRow>
  </WithNavbar>
);

export default Organization;
