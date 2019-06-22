import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Menu as DefaultMenu, Dropdown, Icon } from 'antd';

import color from '../../config/color';

import Flex, { FlexCenter } from './Flex';

import ContainerRow, {
  ContainerStyled, Col, Row,
} from './Grid';
import Image, { ProfileAvatar, SmallProfileAvatar } from './Image';
import { SubTitleSmall } from './Text';

const Menu = styled(DefaultMenu)`
  border-radius: 5px;
  box-shadow: 0 0 10px 0 ${color.shadow} !important;
`;

const Navbar = styled(SubTitleSmall)`
  cursor: pointer;
  color: ${color.primary};
  margin-right: 1.3em;
`;

const NavbarContainerStyled = styled(ContainerStyled)`
  background: ${color.white};
  border: solid 0px ${color.disabled};
  border-bottom-width: 2px;
  min-height: 100px;
  .logo, .profile-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const menus = [
  {
    name: 'My Matches',
    path: '/my-matches',
  },
  {
    name: 'Organizations',
    path: '/organizations',
  },
  {
    name: 'Profile',
    path: '/profile',
  },
];

const dropdownItems = [
  { type: 'user', text: 'Profile' },
  { type: 'setting', text: 'Account Setting' },
  { type: 'logout', text: 'Logout' },
];

const MenuItem = styled(DefaultMenu.Item)`
  ${props => (props.disabledLine ? '' : `border-bottom: solid 0.5px ${color.disabled};`)}
  margin-bottom: 0;
`;

const DropDownItem = ({ children }) => (
  <Flex className="h-100 p-1 align-items-center">
    {children}
  </Flex>
);

const IconItem = ({ type, text, theme = 'outlined' }) => (
  <DropDownItem>
    <Icon type={type} theme={theme} />
    {text}
  </DropDownItem>
);

const MenuDropdown = () => (
  <Menu>
    <MenuItem className="h-auto">
      <Flex className="p-1 align-items-center">
        <SmallProfileAvatar className="h-50 w-50 rounded-circle mr-2" src="/static/images/avatar.png" />
        {'Bae Joo-hyun'}
      </Flex>
    </MenuItem>
    {
      dropdownItems.map((item, index) => (
        <MenuItem key={item.type} disabledLine={(index + 1) === dropdownItems.length}>
          <IconItem {...item} />
        </MenuItem>
      ))
    }
  </Menu>
);

const NavbarContainer = () => (
  <NavbarContainerStyled fluid className="d-flex justify-content-stretch align-items-center">
    <Row className="w-100">
      <Col xs={6} lg={1} className="logo text-left">
        <Link href="/">
          <Image src="/static/images/leo.png" />
        </Link>
      </Col>
      <Col lg={10} className="d-none d-md-flex align-items-center">
        <ContainerRow>
          <Col className="d-flex">
            {
              menus.map(menu => (
                <Link key={menu.name} href={menu.path}>
                  <Navbar>{menu.name}</Navbar>
                </Link>
              ))
            }
          </Col>
        </ContainerRow>
      </Col>
      <Col xs={6} lg={1} className="profile-avatar text-right">
        <Dropdown overlay={<MenuDropdown />}>
          <FlexCenter style={{ cursor: 'pointer' }} className="ant-dropdown-link" href="#">
            <ProfileAvatar className="rounded-circle mr-2" src="/static/images/avatar.png" />
            <b><Icon type="down" /></b>
          </FlexCenter>
        </Dropdown>
      </Col>
    </Row>
  </NavbarContainerStyled>
);

export default NavbarContainer;
