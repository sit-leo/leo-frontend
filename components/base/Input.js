import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Label } from 'reactstrap';
import {
  Input as InputDefault,
  InputNumber as InputNumberDefault,
  Select as SelectDefault,
  DatePicker as DefaultDatePicker,
} from 'antd';

import Icon from './Icon';

import colors from '../../config/color';

import { Item } from './Form';

const { RangePicker } = DefaultDatePicker;

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

const Password = styled(InputDefaultStyled.Password)`
  input {
    ${INPUT_THEME}
  }
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

const Input = React.forwardRef(({ text, ...props }, ref) => (props.type !== 'password'
  ? (<InputDefaultStyled ref={ref} placeholder={text} {...props} />)
  : <Password ref={ref} placeholder={text} {...props} />));

export default Input;

export const TextArea = styled(InputDefault.TextArea)`
  ${INPUT_THEME}
`;

export const InputNumber = styled(InputNumberDefault)`
  ${INPUT_THEME}
`;

export const LabelInput = ({
  name, label, text, getFieldDecorator, validator, ...props
}) => {
  let rules = [{
    required: true,
    message: `Please fill "${label}".`,
  }];
  if (validator) {
    rules = [...rules, { validator }];
  }
  return (
    <React.Fragment>
      <Label for={name} className="mb-0">{label}</Label>
      <Item>
        {
          getFieldDecorator
            ? getFieldDecorator(name, {
              initialValue: text,
              setFieldsValue: text,
              rules,
            })(
              <Input id={name} name={name} {...props} />,
            )
            : <Input id={name} name={name} value={text} {...props} />
        }
      </Item>
    </React.Fragment>
  );
};

export const Search = ({ ...props }) => (
  <InputDefault
    size="large"
    style={{ visibility: 'hidden' }}
    prefix={<Icon type="search" />}
    onChange={value => console.log(value)}
    onPressEnter={value => console.log(value)}
    {...props}
  />
);

export const DateRangePicker = ({
  label,
  name,
  value,
  getFieldDecorator = () => { },
  onChange = () => { },
}) => (
  <React.Fragment>
      <Label for={name} className="mb-0">{label}</Label>
      <Item>
        {
          getFieldDecorator(name, {
            initialValue: [moment(value.startJoiningDate), moment(value.endJoiningDate)],
            rules: [
              {
                type: 'array',
                required: true,
                message: `Please fill "${label}".`,
              },
            ],
          })(
            <RangePicker className="w-100" onChange={onChange} />,
          )
        }
      </Item>
    </React.Fragment>
);

export const DatePicker = ({
  label,
  name,
  value,
  onChange = () => { },
  getFieldDecorator = () => { },
  validator,
}) => {
  const rules = [
    {
      required: true,
      message: `Please fill "${label}".`,
    },
    {
      validator,
    }];
  if (validator) {
    rules.push({ validator });
  }
  return (

    <React.Fragment>
      <Label for={name} className="mb-0">{label}</Label>
      <Item>
        {
          getFieldDecorator(name, {
            initialValue: moment(value),
            rules,
          })(
            <DefaultDatePicker
              className="w-100"
              onChange={onChange}
            />,
          )
        }
      </Item>
    </React.Fragment>
  );
};
