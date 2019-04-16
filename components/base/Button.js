import React from 'react';
import styled from 'styled-components';

import { Button as DefaultButton } from 'antd';

import color from '../../config/color';
import font from '../../config/font';

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
  transition: 0s;
  background: ${color.primary};
  color: ${color.white};

  &:hover, &.ant-btn:focus, &.ant-btn:hover, &.ant-btn:active {
    background: ${color.hover};
    color: ${color.white};
  }
`;

export const DangerButton = styled(DefaultButtonStyled)`
  background: ${color.error};
  color: ${color.white};

  &:hover, &.ant-btn:focus, &.ant-btn:hover, &.ant-btn:active {
    background: ${color.error};
    color: ${color.white};
  }
`;

export default MainButton;
