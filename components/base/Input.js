import React from 'react';
import styled from 'styled-components';
import { Label } from 'reactstrap';
import {
  Input as InputDefault,
  InputNumber as InputNumberDefault,
  Select as SelectDefault,
} from 'antd';

import Icon from './Icon';

import colors from '../../config/color';

import { Item } from './Form';

const INPUT_THEME = `
  border-radius: 10px;
  border: solid 2px ${colors.disabled};
  margin: 6px 0;
  &:hover {
    border-color: ${colors.outline};
  }
`;

const InputDefaultStyled = styled(InputDefault)`
  ${INPUT_THEME}
`;

export const Select = styled(SelectDefault)`
  ${INPUT_THEME}
  div.ant-select-selection {
    border: none !important;
    border-radius: 10px !important;
  }
`;

export const Option = styled(SelectDefault.Option)`
  ${INPUT_THEME}
`;

const Input = React.forwardRef(({ text, ...props }, ref) => (
  <InputDefaultStyled ref={ref} placeholder={text} {...props} />
));

export default Input;

export const { TextArea } = InputDefault;

export const InputNumber = styled(InputNumberDefault)`
  ${INPUT_THEME}
`;

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
            initialValue: text,
            setFieldsValue: text,
            rules: [
              {
                required: true,
                message: `Please fill "${label}".`,
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

export const Search = ({ ...props }) => (
  <InputDefault
    size="large"
    prefix={<Icon type="search" />}
    onChange={value => console.log(value)}
    onPressEnter={value => console.log(value)}
    {...props}
  />
);
