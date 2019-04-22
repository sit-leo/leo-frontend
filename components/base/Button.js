import styled from 'styled-components';

import { Button as DefaultButton } from 'antd';

import color from '../../config/color';

const DefaultButtonStyled = styled(DefaultButton)`
  text-align: center;
  border-radius: 10px;
  padding: 0.6em 0;
  height: auto;
  border: none;

  &:hover, &.ant-btn:focus, &.ant-btn:hover, &.ant-btn:active {
    border: none;
  }
`;

const MainButton = styled(DefaultButtonStyled)`
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

export const CardButton = styled.button`
  width: 100%;
  border-color: ${color.disabled};
  border-style: solid;
  border-radius: 0 0 10px 10px;
  border-width: 1px 0 0 0;

  &:focus {
    outline: none;
  }
`;

export default MainButton;
