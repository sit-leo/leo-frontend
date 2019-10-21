

import styled from 'styled-components';

import { Icon } from 'antd';

import color from '../../config/color';
import font from '../../config/font';

export default styled(Icon)`
    ${props => props.disabled && `
        color: ${color.disabled};
        cursor: not-allowed;
    `}
`;

export const DeletedIcon = styled(Icon)`
    font-size: ${font.size.medium};
    color: ${color.error};
    cursor: pointer;
`;

export const IconLargeWhite = styled(Icon)`
    font-size: ${font.size.large};
    color: ${color.white};
`;

export const IconCircle = styled(Icon)`
    background-color: ${color.primary};
    color: ${color.white};
    padding: .5em;
`;
