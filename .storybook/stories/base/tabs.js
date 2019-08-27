import React from 'react';
import { storiesOf } from '@storybook/react';
import Tabs, { TabPane } from '../../../components/base/Tabs';

const TABS = ['Current', 'History'];

storiesOf('Base/Tabs', module)
  .add('Tabs', () => (
    <Tabs defaultActiveKey="1" onChange={() => {}} animated={false}>
        {
        TABS.map((tap, key) => (
        <TabPane tab={tap} key={`${key + 1}`}>
            {tap}
        </TabPane>
        ))
    }
    </Tabs>
  ))