import React from 'react';

import WithNavbar from './with-navbar';

import { TitleLargePrimary } from '../base/Text';
import Card from '../base/Card';
import ContainerRow, { Col } from '../base/Grid';

const Organization = ({ children, title }) => (
  <WithNavbar>
    <ContainerRow>
      <Col>
        <TitleLargePrimary className="my-3">
          {title}
        </TitleLargePrimary>
      </Col>
      <Col>
        <Card>
          {children}
        </Card>
      </Col>
    </ContainerRow>
  </WithNavbar>
);

export default Organization;
