import React from 'react';
import { Form as DefaultForm } from 'antd';
import ContainerRow from './Grid';

export default DefaultForm;

export const FormContainer = ({ children, ...props }) => (
  <DefaultForm className="w-100" {...props}>
    <ContainerRow>
      {children}
    </ContainerRow>
  </DefaultForm>
);

export const Item = ({ children, ...props }) => (
  <DefaultForm.Item className="mb-0" {...props}>
    {children}
  </DefaultForm.Item>
);
