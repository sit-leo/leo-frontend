import React from 'react';
import styled from 'styled-components';

import colors from '../../config/color';

const Text = styled.span`
  color: ${colors.text.main};
`;

export default Text;

export const TitlePrimary = styled.h1`
  color: ${colors.primary};
`;

export const Paragraph = styled.p`
  color: ${colors.text.paragraph};
`;

export const TextError = styled(Text)`
  color: ${colors.error};
`;
