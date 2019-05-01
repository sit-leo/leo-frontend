import styled from 'styled-components';
import { Tabs as DefaultTabs } from 'antd';

import font from '../../config/font';
import color from '../../config/color';

const { TabPane: DefaultTabPane } = DefaultTabs;

const Tabs = styled(DefaultTabs)`
    .ant-tabs-ink-bar {
        background-color: ${color.primary};
    }
    .ant-tabs-nav .ant-tabs-tab {
        font-size: ${font.size.small};
        font-weight: ${font.weight.light};
    }
    
    .ant-tabs-nav .ant-tabs-tab:hover,
    .ant-tabs-nav .ant-tabs-tab-active,
    .ant-tabs-nav .ant-tabs-tab-active:active,
    .ant-tabs-nav .ant-tabs-tab-active:hover {
        color: ${color.primary};
    }
`;

export default Tabs;

export const TabPane = styled(DefaultTabPane)`

`;
