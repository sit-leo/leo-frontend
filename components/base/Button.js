import React from 'react';
import styled from 'styled-components';

import { Button as DefaultButton } from 'antd';

import colors from '../../config/color';
import fonts from '../../config/font';

const DefaultButtonStyled = styled(DefaultButton)`
  border-radius: 10px;
  padding: 0.6em 3em;
  height: auto;
  border: none;

  &:hover, &.ant-btn:focus, &.ant-btn:hover, &.ant-btn:active {
    border: none;
  }
`;

const MainButton = styled(DefaultButtonStyled)`
  background: ${colors.primary};
  color: ${colors.white};

  &:hover, &.ant-btn:focus, &.ant-btn:hover, &.ant-btn:active {
    background: ${colors.hover};
    color: ${colors.white};
  }
`;

export const DangerButton = styled(DefaultButtonStyled)`
  background: ${colors.error};
  color: ${colors.white};

  &:hover, &.ant-btn:focus, &.ant-btn:hover, &.ant-btn:active {
    background: ${colors.error};
    color: ${colors.white};
  }
`;

export default MainButton;
