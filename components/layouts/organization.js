import React from 'react';

import WithNavbar from './with-navbar';

import { TitleLargePrimary } from '../base/Text';
import ContainerRow, { Col } from '../base/Grid';
import { BreadcrumbList } from '../base/Breadcrumb';

const Organization = ({
  children, title, url,
}) => {
  let items = [
    { url: '/organizations', name: 'Organization' },
    { url: '/organizations/dashboard', name: 'Dashboard' },
  ];

  if (url) {
    items = [...items, { name: title, url }];
  }

  return (
    <WithNavbar>
      <ContainerRow>
        <Col className="mt-3">
          <BreadcrumbList items={items} />
        </Col>
        <Col>
          <TitleLargePrimary className="mb-3">
            {title}
          </TitleLargePrimary>
        </Col>
        {children}
      </ContainerRow>
    </WithNavbar>
  );
};

export default Organization;
