import React from 'react';
import {
  Breadcrumb,
} from 'antd';

import WithNavbar from './with-navbar';

import ContainerRow, { Col } from '../base/Grid';

const JoinMatch = ({ children }) => (
  <WithNavbar>
    <ContainerRow className="my-3">
      <Col>
        <Breadcrumb>
          <Breadcrumb.Item>
            Matchings
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            Junior Programmer Match
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            Join Matching
          </Breadcrumb.Item>
        </Breadcrumb>
      </Col>
      {children}
    </ContainerRow>
  </WithNavbar>
);

export default JoinMatch;
