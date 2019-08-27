import React from 'react';
import { storiesOf } from '@storybook/react';
import { InformationCollapse } from '../../../components/base/Collapse';

storiesOf('Base/Collapse', module)
  .add('InformationCollapse', () => (
    <React.Fragment>
      <InformationCollapse isOpen>
        InformationCollapse isOpen true / false (hide)
      </InformationCollapse>
    </React.Fragment>
  ))