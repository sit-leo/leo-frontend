import React from 'react';

import { Button as DefaultButton } from 'antd';

const Button = ({ text, ...props }) => (
  <DefaultButton {...props}>{text}</DefaultButton>
);

export default Button;
