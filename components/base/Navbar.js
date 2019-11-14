import React, { Fragment } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Menu as DefaultMenu, Dropdown, Icon } from 'antd';

import color from '../../config/color';

import Flex, { FlexCenter } from './Flex';

import ContainerRow, {
  ContainerStyled, Col, Row,
} from './Grid';
import Image, { ProfileAvatar, SmallProfileAvatar } from './Image';
import { TitleSmallPrimary, TitleSmallWhite, NavSelected } from './Text';
import { SmallMainButton } from './Button';

const Menu = styled(DefaultMenu)`
  border-radius: 5px;
  box-shadow: 0 0 10px 0 ${color.shadow} !important;
`;

const NavbarContainerStyled = styled(ContainerStyled)`
  background: ${color.white};
  border: solid 0px ${color.disabled};
  border-bottom-width: 2px;
  min-height: 70px;
  .logo, .profile-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const dropdownItems = [
  { type: 'user', text: 'Profile', path: '/profile' },
  { type: 'appstore', text: 'My Matches', path: '/my-matches' },
  { type: 'shop', text: 'Organizations', path: '/organizations' },
];

const MenuItem = styled(DefaultMenu.Item)`
  ${props => (props.hide ? '' : `border-bottom: solid 0.5px ${color.disabled};`)}
  margin: 0 !important;
`;

const DropDownItem = ({ children, handleClick }) => (
  <Flex onClick={handleClick} className="h-100 p-1 align-items-center">
    {children}
  </Flex>
);

const IconItem = ({
  type, text, theme = 'outlined', handleClick = () => { }, path,
}) => (
  <DropDownItem handleClick={handleClick}>
    <a style={{ color: color.secondary }} href={path}>
      <Icon type={type} theme={theme} />
      {text}
    </a>
  </DropDownItem>
);

const MenuDropdown = ({ imageUrl, fullName, logout }) => (
  <Menu>
    <MenuItem className="h-auto">
      <Flex
        style={{
          maxWidth: '180px',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        }}
        className="p-1 align-items-center"
      >
        <SmallProfileAvatar className="h-50 w-50 rounded-circle mr-2" src={imageUrl || '/static/images/avatar.png'} />
        {fullName}
      </Flex>
    </MenuItem>
    {
      dropdownItems.map((item, index) => (
        <MenuItem
          key={item.text}
        >
          <IconItem {...item} />
        </MenuItem>
      ))
    }
    <MenuItem>
      <IconItem hide type="logout" text="Logout" handleClick={logout} />
    </MenuItem>
  </Menu>
);

const NavbarContainer = ({
  imageUrl, fullName, role, logout = () => { },
}) => (
  <NavbarContainerStyled fluid className="d-flex justify-content-center align-items-center">
    <Row className="w-100">
      <Col xs={3} md={2} className="logo text-left">
        <a href="/">
          <Image src="/static/images/leo.png" />
        </a>
      </Col>
      {
        role !== 'guest'
          ? (
            <Col xs={{ size: 3, offset: 6 }} md={{ size: 2, offset: 8 }} className="profile-avatar text-right">
              <Dropdown overlay={<MenuDropdown imageUrl={imageUrl} fullName={fullName} logout={logout} />}>
                <FlexCenter style={{ cursor: 'pointer' }} className="ant-dropdown-link" href="#">
                  <ProfileAvatar className="rounded-circle mr-2" src={imageUrl || '/static/images/avatar.png'} />
                  <b><Icon type="down" /></b>
                </FlexCenter>
              </Dropdown>
            </Col>
          )
          : (
            <Col xs={9} md={{ size: 4, offset: 6 }} className="d-flex flex-row justify-content-end align-items-center">
              <a href="/signup">
                <TitleSmallPrimary className="mr-3">
                  Register
                </TitleSmallPrimary>
              </a>
              <SmallMainButton className="px-4">
                <a href="/login">
                  <TitleSmallWhite className="mb-1">
                    Sign in
                  </TitleSmallWhite>
                </a>
              </SmallMainButton>
            </Col>
          )
      }
    </Row>
  </NavbarContainerStyled>
);

export default NavbarContainer;
