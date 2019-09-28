import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  setRecruiterName as setRecruiterNameAction,
  setRecruiterLocation as setRecruiterLocationAction,
  setRecruiterEmail as setRecruiterEmailAction,
  setRecruiterTelno as setRecruiterTelnoAction,
} from '../../store/profile';

import {
  LabelInput,
} from '../base/Input';
import { Col } from '../base/Grid';

const RecruiterProfileForm = ({
  editable,
  getFieldDecorator,
  recruiter: {
    name,
    location,
    email,
    telNo,
  },
  setRecruiterName,
  setRecruiterLocation,
  setRecruiterEmail,
  setRecruiterTelno,
}) => (
  <React.Fragment>
    <Col lg={6}>
      <LabelInput
        label="Company name"
        name="name"
        text={name}
        disabled={!editable}
        getFieldDecorator={getFieldDecorator}
        onChange={e => setRecruiterName(e.target.value)}
      />
    </Col>
    <Col lg={6}>
      <LabelInput
        label="Location"
        name="location"
        text={location}
        disabled={!editable}
        getFieldDecorator={getFieldDecorator}
        onChange={e => setRecruiterLocation(e.target.value)}
      />
    </Col>
    <Col lg={6}>
      <LabelInput
        label="Email"
        name="email"
        text={email}
        disabled={!editable}
        getFieldDecorator={getFieldDecorator}
        onChange={e => setRecruiterEmail(e.target.value)}
      />
    </Col>
    <Col lg={6}>
      <LabelInput
        label="Phone Number"
        name="phoneNumber"
        text={telNo}
        disabled={!editable}
        getFieldDecorator={getFieldDecorator}
        onChange={e => setRecruiterTelno(e.target.value)}
      />
    </Col>
  </React.Fragment>
);

const mapStateToProps = state => ({
  recruiter: state.profile.recruiter,
});

const mapDispatchToProps = dispatch => ({
  setRecruiterName: bindActionCreators(setRecruiterNameAction, dispatch),
  setRecruiterLocation: bindActionCreators(setRecruiterLocationAction, dispatch),
  setRecruiterEmail: bindActionCreators(setRecruiterEmailAction, dispatch),
  setRecruiterTelno: bindActionCreators(setRecruiterTelnoAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecruiterProfileForm);
