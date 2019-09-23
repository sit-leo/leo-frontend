import React from 'react';
import { Form } from 'antd';

export default Form;

export const Item = ({ children, ...props }) => (
  <Form.Item className="mb-0" {...props}>
    {children}
  </Form.Item>
);
