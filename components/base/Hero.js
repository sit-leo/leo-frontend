import React from 'react';
import styled from 'styled-components';

import color from '../../config/color';

const HeroContainer = styled.div`
  background-color: ${color.white};
  min-height: 215px;
  box-shadow: 0 25px 50px 0 ${color.shadow};
`;

const Hero = ({ children }) => (
  <HeroContainer>
    { children }
  </HeroContainer>
);

export default Hero;
