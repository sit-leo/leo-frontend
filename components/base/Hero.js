import React from 'react';
import styled from 'styled-components';

import color from '../../config/color';
import font from '../../config/font';

import { FlexCenter } from './Flex';

const HeroContainer = styled(FlexCenter)`
  background: ${color.white};
  font-size: ${font.size.hero};
  min-height: 215px;
  box-shadow: 0 2px 50px 0 ${color.shadow};
`;

const Hero = ({ text }) => (
  <HeroContainer>
    { text }
  </HeroContainer>
);

export default Hero;
