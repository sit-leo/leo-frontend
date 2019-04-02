import React from 'react';
import styled from 'styled-components';
import { Input as InputDefault } from 'antd';

import colors from '../../config/color';

const InputDefaultStyled = styled(InputDefault)`
  border-radius: 10px;
  border: solid 2px ${colors.outline};
`;

const Input = ({ text, ...props }) => (
  <InputDefaultStyled placeholder={text} {...props} />
);

export default Input;
