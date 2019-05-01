import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import color from '../../config/color';

import ContainerRow, {
  ContainerStyled, Col, Row,
} from './Grid';
import Image, { ProfileAvatar } from './Image';
import { SubTitleSmall } from './Text';

const Menu = styled(SubTitleSmall)`
  cursor: pointer;
  color: ${color.primary};
  margin-right: 1.3em;
`;

const NavbarContainer = styled(ContainerStyled)`
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
    name: 'All Matches',
    path: '/matches',
  },
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

const Navbar = () => (
  <NavbarContainer fluid className="d-flex justify-content-stretch align-items-center">
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
                  <Menu>{menu.name}</Menu>
                </Link>
              ))
            }
          </Col>
        </ContainerRow>
      </Col>
      <Col xs={6} lg={1} className="profile-avatar text-right">
        <ProfileAvatar className="rounded-circle" src="/static/images/avatar.png" />
      </Col>
    </Row>
  </NavbarContainer>
);

export default Navbar;
