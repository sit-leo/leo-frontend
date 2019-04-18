import React from 'react';
import styled from 'styled-components';

import colors from '../../config/color';
import font from '../../config/font';

const Text = styled.span`
  font-weight: 300;
  font-size: ${font.size.small};
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

export const TitleLight = styled(Title)`
  font-weight: 300;
`;

export const TitleSmall = styled.h2`
  font-size: ${font.size.small};
  color: ${colors.text.main};
`;

export const SubTitleSmall = styled.h2`
  font-size: ${font.size.small};
  color: ${colors.text.main};
  font-weight: 300;
`;


export const Paragraph = styled.p`
  font-size: ${font.size.small};
  color: ${colors.text.paragraph};
  margin: 0;
`;

export const TextError = styled(Text)`
  color: ${colors.error};
`;

export const EmptyInformationText = styled(Text)`
  color: ${colors.secondary};
  font-style: italic;
`;
