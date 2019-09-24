import React from 'react';
import styled from 'styled-components';
import { Label } from 'reactstrap';
import { Input as InputDefault } from 'antd';

import colors from '../../config/color';

import { Item } from './Form';

const InputDefaultStyled = styled(InputDefault)`
  border-radius: 10px;
  border: solid 2px ${colors.disabled};
  margin: 6px 0;
  &:hover {
    border-color: ${colors.outline};
  }
`;

const Input = React.forwardRef(({ text, ...props }, ref) => (
  <InputDefaultStyled ref={ref} placeholder={text} {...props} />
));

export const LabelInput = ({
  name, label, text, getFieldDecorator, ...props
}) => (
  <React.Fragment>
    <Label for={name} className="mb-0">{label}</Label>
    <Item>
      {
        getFieldDecorator
          ? getFieldDecorator(name, {
            validateTrigger: ['onBlur'],
            rules: [
              {
                required: true,
                message: `Please fill "${label}".`,
                setFieldsValue: text,
              },
            ],
          })(
            <Input id={name} name={name} {...props} />,
          )
          : <Input id={name} name={name} value={text} {...props} />
      }
    </Item>
  </React.Fragment>
);

export default Input;

export const { TextArea } = InputDefault;
