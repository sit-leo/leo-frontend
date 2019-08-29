import React from 'react';
import styled from 'styled-components';
import { Label } from 'reactstrap';
import { Input as InputDefault } from 'antd';

import colors from '../../config/color';

const InputDefaultStyled = styled(InputDefault)`
  border-radius: 10px;
  border: solid 2px ${colors.disabled};
  margin: 6px 0;
  &:hover {
    border-color: ${colors.outline};
  }
`;

const Input = ({ text, ...props }) => (
  <InputDefaultStyled placeholder={text} {...props} />
);

export const LabelInput = ({
  name, label, text, ...props
}) => (
  <React.Fragment>
    <Label for={name} className="mb-0">{label}</Label>
    <Input id={name} value={text} {...props} />
  </React.Fragment>
);

export default Input;

export const { TextArea } = InputDefault;
