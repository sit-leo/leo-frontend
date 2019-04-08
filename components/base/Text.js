import React from 'react';
import styled from 'styled-components';

import colors from '../../config/color';
import font from '../../config/font';

const Text = styled.span`
  font-size: ${font.size.paragraph};
  color: ${colors.text.paragraph};
`;

export default Text;

export const Title = styled.h1`
  font-size: ${font.size.large};
  color: ${colors.text.main};
`;

export const TitlePrimary = styled(Title)`
  color: ${colors.primary};
`;

export const TitleMedium = styled.h2`
  font-size: ${font.size.medium};
  color: ${colors.text.main};
`;

export const TextSmall = styled.h4`
  font-size: ${font.size.small};
  color: ${colors.text.paragraph};
  font-weight: normal;
`;

export const TitleSmall = styled(TextSmall)`
  font-weight: 600;
`;

export const Paragraph = styled.p`
  font-size: ${font.size.paragraph};
  color: ${colors.text.paragraph};
`;

export const TextError = styled(Text)`
  color: ${colors.error};
`;
