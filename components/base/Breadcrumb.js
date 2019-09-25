import React from 'react';
import { Breadcrumb } from 'antd';

export default Breadcrumb;

export const BreadcrumbList = ({ items }) => (
  <Breadcrumb>
    {
      items.map(item => (
        <Breadcrumb.Item key={item.name}>
          <a href={item.url || '#'}>
            {item.name}
          </a>
        </Breadcrumb.Item>
      ))
    }
  </Breadcrumb>
);
