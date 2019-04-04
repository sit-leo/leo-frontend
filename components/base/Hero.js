import React from 'react';
import styled from 'styled-components';

import colors from '../../config/color';
import fonts from '../../config/font';

const HeroContainer = styled.div`
  background-image: linear-gradient(to bottom, ${colors.dark}, ${colors.primary});
  font-size: ${fonts.size.hero};
  color: ${colors.disabled};
  min-height: 300px;
`;

const Hero = ({ text }) => (
  <HeroContainer className="d-flex justify-content-center align-items-center">
    { text }
  </HeroContainer>
);

export default Hero;
