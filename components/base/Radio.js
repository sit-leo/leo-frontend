import React from 'react';
import styled from 'styled-components';
import { Radio } from 'antd';

import color from '../../config/color';

const RadioGroup = styled(Radio.Group)`

`;

const RadioButton = styled(Radio.Button)`
  &.ant-radio-button-wrapper-checked,
  &.ant-radio-button-wrapper:hover {
    color: ${color.primary} !important;
    box-shadow: -1px 0 0 0 ${color.primary} !important;
  }
  &.ant-radio-button-wrapper-checked {
    border-color: ${color.primary} !important;
  }
`;

export default {
  Group: RadioGroup,
  Button: RadioButton,
};
