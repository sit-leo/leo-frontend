import styled from 'styled-components';

import { Button as DefaultButton } from 'antd';

import color from '../../config/color';
import font from '../../config/font';

const DefaultButtonStyled = styled(DefaultButton)`
  text-align: center;
  border-radius: 22.5px;
  padding: 0.6em 0;
  height: auto;
  border: none;
  min-width: 50%;

  &:hover, &.ant-btn:focus, &.ant-btn:hover, &.ant-btn:active {
    border: none;
  }
  @media (min-width: 768px) {
    min-width: 25%;
  }
`;

const MainButton = styled(DefaultButtonStyled)`
  background: ${color.primary};
  color: ${color.white};
  min-width: 45%;

  &:hover, &.ant-btn:focus, &.ant-btn:hover, &.ant-btn:active {
    background: ${color.hover};
    color: ${color.white};
  }
`;

export const MainButtonLight = styled(DefaultButtonStyled)`
  background: ${color.white};
  color: ${color.primary};
  min-width: 45%;
  border: solid 2px ${color.primary};

  &:hover, &.ant-btn:focus, &.ant-btn:hover, &.ant-btn:active {
    background: ${color.hover};
    color: ${color.white};
  }
`;

export const SmallMainButton = styled(MainButton)`
  min-width: 25%;

  @media (max-width: 767px) {
    min-width: 60%;
  }
`;

export const ExtraSmallMainButton = styled(MainButton)`
  font-size: ${font.size.xsmall};
  min-width: 10%;
  
  @media (min-width: 768px) {
    min-width: 15%;
  }
  @media (max-width: 767px) {
    min-width: 30%;
  }
`;

export const SmallButton = styled(DefaultButtonStyled)`
  min-width: 25%;
  border-color: ${color.hover} !important;
  background: ${color.white};
  color: ${color.hover};
`;

export const DangerButton = styled(DefaultButtonStyled)`
  background: ${color.error};
  color: ${color.white};
  min-width: 45%;

  &:hover, &.ant-btn:focus, &.ant-btn:hover, &.ant-btn:active {
    background: ${color.error};
    color: ${color.white};
  }
`;

export const GhostDangerButton = styled(DefaultButtonStyled)`
  background: ${color.white};
  color: ${color.error};
  min-width: 45%;

  &:hover, &.ant-btn:focus, &.ant-btn:hover, &.ant-btn:active {
    text-decoration: underline;
    text-decoration-color: ${color.error};
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

export const TextButton = styled.button`
  color: ${color.primary};
  background: none;
  border: none;
`;

export const LinkButton = styled.a`
  color: ${color.primary};
  font-size: ${font.size.small};
  text-decoration: underline;
  font-weight: 100;
`;

export default MainButton;
