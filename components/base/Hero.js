import React from 'react';
import styled from 'styled-components';

import colors from '../../config/color';
import font from '../../config/font';

import { FlexCenter } from './Flex';

const HeroContainer = styled(FlexCenter)`
  background-image: linear-gradient(to bottom, ${colors.dark}, ${colors.primary});
  font-size: ${fonts.size.hero};
  color: ${colors.disabled};
  min-height: 300px;
`;

const Hero = ({ text }) => (
  <HeroContainer>
    { text }
  </HeroContainer>
);

export default Hero;
