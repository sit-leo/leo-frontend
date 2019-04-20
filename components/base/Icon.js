

import styled from 'styled-components';

import { Icon } from 'antd';

import color from '../../config/color';
import font from '../../config/font';

export default Icon;

export const DeletedIcon = styled(Icon)`
    font-size: ${font.size.medium};
    color: ${color.error};
    cursor: pointer;
`;
