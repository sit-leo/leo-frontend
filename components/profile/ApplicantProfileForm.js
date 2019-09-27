import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';

import {
  setInputSkillVisible as setInputSkillVisibleAction,
  setSkill as setSkillAction,
  addApplicantSkill as addApplicantSkillAction,
  removeApplicantSkill as removeApplicantSkillAction,
  setExperiences as setExperiencesAction,
  setFirstname as setFirstnameAction,
  setLastname as setLastnameAction,
  setEmail as setEmailAction,
  setTelno as setTelnoAction,
  setEducation as setEducationAction,
} from '../../store/profile';

import { TitleForm } from '../base/Text';
import Input, {
  InputNumber,
  LabelInput,
  TextArea,
} from '../base/Input';
import Tag from '../base/Tag';
import Icon from '../base/Icon';
import { Col } from '../base/Grid';
import { Item } from '../base/Form';

const ApplicantProfileForm = ({
  editable,
  getFieldDecorator,
  skill,
  applicant: {
    firstName,
    lastName,
    email,
    telNo,
    educations,
    skills = [],
    experiences,
  },
  inputSkillVisible,
  setSkill,
  addApplicantSkill,
  removeApplicantSkill,
  setExperiences,
  setInputSkillVisible,
  setFirstname,
  setLastname,
  setEmail,
  setTelno,
  setEducation,
}) => (
  <React.Fragment>
    <TitleForm title="Profile" />
    <Col lg={6}>
      <LabelInput
        label="Firstname"
        name="firstname"
        text={firstName}
        disabled={!editable}
        getFieldDecorator={getFieldDecorator}
        onChange={e => setFirstname(e.target.value)}
      />
    </Col>
    <Col lg={6}>
      <LabelInput
        label="Lastname"
        name="lastname"
        text={lastName}
        disabled={!editable}
        getFieldDecorator={getFieldDecorator}
        onChange={e => setLastname(e.target.value)}
      />
    </Col>
    <Col lg={6}>
      <LabelInput
        label="Email"
        name="email"
        text={email}
        disabled={!editable}
        getFieldDecorator={getFieldDecorator}
        onChange={e => setEmail(e.target.value)}
      />
    </Col>
    <Col lg={6}>
      <LabelInput
        label="Phone Number"
        name="phoneNumber"
        text={telNo}
        disabled={!editable}
        getFieldDecorator={getFieldDecorator}
        onChange={e => setTelno(e.target.value)}
      />
    </Col>
    <TitleForm title="Education" />
    {
      educations.map(({
        university,
        year,
        major,
        gpax,
      }, index) => (
        <React.Fragment key={`education-${index}`}>
          <Col lg={6}>
            <LabelInput
              label="University"
              name="university"
              text={university}
              disabled={!editable}
              getFieldDecorator={getFieldDecorator}
              onChange={e => setEducation('university', e.target.value)}
            />
          </Col>
          <Col lg={6}>
            <LabelInput
              label="Year"
              name="year"
              text={year}
              disabled={!editable}
              getFieldDecorator={getFieldDecorator}
              onChange={e => setEducation('year', e.target.value)}
            />
          </Col>
          <Col lg={6}>
            <LabelInput
              label="Major"
              name="major"
              text={major}
              disabled={!editable}
              getFieldDecorator={getFieldDecorator}
              onChange={e => setEducation('major', e.target.value)}
            />
          </Col>
          <Col lg={6}>
            <Label for="gpax" className="mb-0">GPAX</Label>
            <Item>
              {
                getFieldDecorator ? getFieldDecorator('gpax', {
                  validateTrigger: ['onBlur'],
                  initialValue: gpax,
                  setFieldsValue: gpax,
                  rules: [
                    {
                      required: true,
                      message: 'Please fill "GPAX".',
                    },
                  ],
                })(
                  <InputNumber
                    min={1.00}
                    max={4.00}
                    step="0.01"
                    disabled={!editable}
                    onChange={value => setEducation('gpax', value)}
                    className="w-100"
                  />,
                )
                  : (
                    <InputNumber
                      value={gpax}
                      disabled
                      className="w-100"
                    />
                  )
              }

            </Item>
          </Col>
        </React.Fragment>
      ))
    }
    <TitleForm title="Skills" />
    <Col>
      {
        skills.map(tag => (
          <Tag
            closable
            key={`${tag}-${Math.random()}`}
            onClose={(e) => {
              e.preventDefault();
              removeApplicantSkill(tag);
            }}
          >
            {tag}
          </Tag>
        ))
      }
      {
        inputSkillVisible && (
          <Input
            type="text"
            size="small"
            style={{ width: 78 }}
            value={skill}
            onChange={e => setSkill(e.target.value)}
            onBlur={() => setInputSkillVisible(false)}
            onPressEnter={() => {
              if (skill !== '') {
                addApplicantSkill(skill);
                setSkill('');
              }
            }}
          />
        )
      }
      {
        !inputSkillVisible && (
          <Tag onClick={() => setInputSkillVisible(!inputSkillVisible)}>
            <Icon type="plus" />
            Add Skill
          </Tag>
        )
      }
    </Col>
    <TitleForm title="Experiences" />
    <Col>
      <TextArea rows={3} value={experiences} onChange={e => setExperiences(e.target.value)} />
    </Col>
  </React.Fragment>
);

const mapStateToProps = state => ({
  inputSkillVisible: state.profile.inputSkillVisible,
  skill: state.profile.skill,
  applicant: state.profile.applicant,
});

const mapDispatchToProps = dispatch => ({
  addApplicantSkill: bindActionCreators(addApplicantSkillAction, dispatch),
  removeApplicantSkill: bindActionCreators(removeApplicantSkillAction, dispatch),
  setInputSkillVisible: bindActionCreators(setInputSkillVisibleAction, dispatch),
  setSkill: bindActionCreators(setSkillAction, dispatch),
  setExperiences: bindActionCreators(setExperiencesAction, dispatch),
  setFirstname: bindActionCreators(setFirstnameAction, dispatch),
  setLastname: bindActionCreators(setLastnameAction, dispatch),
  setEmail: bindActionCreators(setEmailAction, dispatch),
  setTelno: bindActionCreators(setTelnoAction, dispatch),
  setEducation: bindActionCreators(setEducationAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantProfileForm);
