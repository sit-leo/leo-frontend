import React from 'react';
import styled from 'styled-components';

import color from '../../config/color';

import { FlexCenter } from './Flex';

const HeroContainer = styled(FlexCenter)`
  background-color: ${color.white};
  min-height: 134px;
  box-shadow: 0 25px 50px 0 ${color.shadow};
`;

const Hero = ({ children }) => (
  <HeroContainer>
    { children }
  </HeroContainer>
);

export default Hero;
