import styled from 'styled-components';

import { Steps as DefaultSteps } from 'antd';
import color from '../../config/color';

const Steps = styled(DefaultSteps)`
    
    .anticon {
        vertical-align: 0.075em;
    }
    .ant-steps-item-finish>.ant-steps-item-content>.ant-steps-item-title:after {
        background: ${color.primary};
    }
    .ant-steps-item-finish .ant-steps-item-icon>.ant-steps-icon {
        color: ${color.primary};
    }
    .ant-steps-item-process .ant-steps-item-icon {
        background: ${color.primary};
        border-color: ${color.primary};
    }
    .ant-steps-item-finish .ant-steps-item-icon {
        border-color: ${color.primary};
        color: ${color.primary};
    }
`;

export default Steps;
