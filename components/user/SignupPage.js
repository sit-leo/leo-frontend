import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Radio, message } from 'antd';

import env from '../../config/env';

import { isApplicant, isRecruiter } from '../../tools/with-roles';
import { clientInstance } from '../../tools/request';

import userAdapter from '../../store/user/user-adapter';

import WithNavbar from '../layouts/with-navbar';

import { setLoading as setLoadingAction } from '../../store/global';

import { Col } from '../base/Grid';
import { TitleLargePrimary } from '../base/Text';
import Form, { FormContainer } from '../base/Form';
import MainButton from '../base/Button';

import ApplicantForm from './ApplicantForm';
import RecruiterForm from './RecruiterForm';
import { LabelInput } from '../base/Input';

const userRequest = userAdapter(clientInstance());

const SignupPage = ({
  form,
  setLoading = () => { },
}) => {
  const [formType, setFormType] = useState('applicant');

  useEffect(() => {
    if (window.grecaptcha) {
      window.notRobot = window.grecaptcha.render('g-recaptcha', {
        sitekey: env.public.reCAPTCHA,
      });
    }
  }, []);


  function compareToPassword(comparedKey) {
    return (rule, value, callback) => {
      if (value && value !== form.getFieldValue(comparedKey)) {
        callback('Password do not matched.');
      } else {
        form.validateFields([comparedKey], { force: true });
        callback();
      }
    };
  }

  return (
    <WithNavbar>
      <FormContainer
        className="py-4"
        onSubmit={(e) => {
          e.preventDefault();
          form.validateFields(async (err, values) => {
            const recaptcha = window.grecaptcha.getResponse(window.notRobot);
            if (recaptcha === '') {
              return message.warn('Please confirm recaptcha before submit.');
            }
            if (!err && recaptcha !== '') {
              setLoading(true);
              if (isApplicant(formType)) {
                const user = {
                  user: {
                    username: values.email,
                    password: values.password,
                  },
                  applicantProfile: {
                    email: values.email,
                    firstName: values.firstName,
                    lastName: values.lastName,
                  },
                  recaptcha,
                };
                await userRequest.applicantSignup(user);
              } else if (isRecruiter(formType)) {
                const user = {
                  user: {
                    username: values.email,
                    password: values.password,
                  },
                  recruiterProfile: {
                    email: values.email,
                    name: values.name,
                  },
                  recaptcha,
                };
                await userRequest.recruiterSignup(user);
              }
              setLoading(false);
            }
          });
        }}
      >
        <Col lg={{ size: 8, offset: 2 }}>
          <TitleLargePrimary>
            Registration
          </TitleLargePrimary>
        </Col>
        <Col lg={{ size: 8, offset: 2 }} className="text-center mt-3 mb-4">
          <Radio.Group onChange={e => setFormType(e.target.value)} defaultValue={formType}>
            <Radio.Button value="applicant">Applicant</Radio.Button>
            <Radio.Button value="recruiter">Recruiter</Radio.Button>
          </Radio.Group>
        </Col>
        {
          isApplicant(formType) && (
            <ApplicantForm form={form} />
          )
        }
        {
          isRecruiter(formType) && (
            <RecruiterForm form={form} />
          )
        }
        <Col lg={{ offset: 2, size: 8 }}>
          <LabelInput
            label="Email"
            name="email"
            type="email"
            getFieldDecorator={form.getFieldDecorator}
          />
        </Col>
        <Col lg={{ offset: 2, size: 8 }}>
          <LabelInput
            label="Password"
            name="password"
            type="password"
            getFieldDecorator={form.getFieldDecorator}
            validator={compareToPassword('confirmPassword')}
          />
        </Col>
        <Col lg={{ offset: 2, size: 8 }}>
          <LabelInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            getFieldDecorator={form.getFieldDecorator}
            validator={compareToPassword('password')}
          />
        </Col>
        <Col lg={{ offset: 2, size: 8 }} className="mt-2">
          <div id="g-recaptcha" />
        </Col>
        <Col lg={{ size: 8, offset: 2 }} className="text-center my-3">
          <MainButton htmlType="submit">
            Register
          </MainButton>
        </Col>
      </FormContainer>
    </WithNavbar>
  );
};

const mapDispatchToProps = dispatch => ({
  setLoading: bindActionCreators(setLoadingAction, dispatch),
});

const WrappedSignupPage = Form.create({ name: 'signup_page' })(SignupPage);

export default connect(null, mapDispatchToProps)(WrappedSignupPage);
