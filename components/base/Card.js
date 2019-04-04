import React from 'react';
import styled from 'styled-components';

import colors from '../../config/color';

const CardContaier = styled.div`
  border-radius: 10px;
  box-shadow: 0 2px 50px 0 ${colors.shadow};
  background-color: ${colors.white};
  width: 100%;
  height: auto;
  padding: 1.5em;
`;

const Card = ({ children }) => (
  <CardContaier>
    {children}
  </CardContaier>
);

export const SmallCard = styled.div`
  padding: .7em 1em;
  border-radius: 10px;
  border: solid 2px ${colors.outline};
  background-color: ${colors.white};
`;

export default Card;
