import React from 'react';

import {
  LabelInput,
} from '../base/Input';
import { Col } from '../base/Grid';

const ApplicantForm = ({
  form: { getFieldDecorator },
}) => (
  <React.Fragment>
    <Col lg={{ size: 4, offset: 2 }}>
      <LabelInput
        label="Firstname"
        name="firstName"
        getFieldDecorator={getFieldDecorator}
      />
    </Col>
    <Col lg={4}>
      <LabelInput
        label="Lastname"
        name="lastName"
        getFieldDecorator={getFieldDecorator}
      />
    </Col>
  </React.Fragment>
);

export default ApplicantForm;
