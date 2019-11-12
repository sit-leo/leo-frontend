import React from 'react';

import {
  LabelInput,
} from '../base/Input';
import { Col } from '../base/Grid';

const RecruiterForm = ({
  form: { getFieldDecorator },
}) => (
  <React.Fragment>
    <Col lg={{ offset: 2, size: 8 }}>
      <LabelInput
        label="Name (eg. Company name, School name)"
        name="name"
        getFieldDecorator={getFieldDecorator}
      />
    </Col>
  </React.Fragment>
);

export default RecruiterForm;
