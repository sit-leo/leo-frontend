import React from 'react';
import styled from 'styled-components';

import color from '../../config/color';

const NavbarContainer = styled.div`
  background: ${color.white};
  min-height: 132px;
`;

const Navbar = () => (
  <NavbarContainer>
    Navbar
  </NavbarContainer>
);

export default Navbar;
