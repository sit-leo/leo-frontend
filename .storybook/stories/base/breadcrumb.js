import React from 'react';
import { storiesOf } from '@storybook/react';
import Breadcrumb, {
  BreadcrumbList,
} from '../../../components/base/Breadcrumb';

storiesOf('Base/Breadcrumb', module)
  .add('BreadcrumbList', () => (
    <React.Fragment>
      <BreadcrumbList items={[
        { url: '#', name: 'Matches'},
        { url: '#', name: 'Name of Match'},
        { url: '#', name: 'Joining Match'},
      ]} />
    </React.Fragment>
  ))