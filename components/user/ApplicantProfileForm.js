import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  setInputSkillVisible as setInputSkillVisibleAction,
  setSkill as setSkillAction,
  addApplicantSkill as addApplicantSkillAction,
  removeApplicantSkill as removeApplicantSkillAction,
  setExperiences as setExperiencesAction,
} from '../../store/user/profile';

import { TitleForm } from '../base/Text';
import Input, { LabelInput, TextArea } from '../base/Input';
import Tag from '../base/Tag';
import Icon from '../base/Icon';
import { Col } from '../base/Grid';

const ApplicantProfileForm = ({
  editable,
  skills = [],
  addApplicantSkill,
  removeApplicantSkill,
  skill,
  setSkill,
  inputSkillVisible,
  setInputSkillVisible,
  experiences,
  setExperiences,
}) => (
  <React.Fragment>
    <TitleForm title="Profile" />
    <Col lg={6}>
      <LabelInput label="Firstname" name="firstname" text="Jirapa" disabled />
    </Col>
    <Col lg={6}>
      <LabelInput label="Lastname" name="lastname" text="Songchom" disabled />
    </Col>
    <Col lg={6}>
      <LabelInput label="Email" name="email" text="jirapas.jil@gmail.com" disabled />
    </Col>
    <Col lg={6}>
      <LabelInput label="Phone Number" name="phoneNumber" text="0912121212" disabled />
    </Col>
    <TitleForm title="Education" />
    <Col lg={6}>
      <LabelInput label="University" name="university" text="King Mongkut's University of Technology Thinburi" disabled />
    </Col>
    <Col lg={6}>
      <LabelInput label="Year" name="year" text="3rd" disabled />
    </Col>
    <Col lg={6}>
      <LabelInput label="Major" name="major" text="Information Technology" disabled />
    </Col>
    <Col lg={6}>
      <LabelInput label="GPAX" name="gpax" text="3.00" disabled />
    </Col>
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
  skills: state.profile.applicant.skills,
  experiences: state.profile.applicant.experiences,
  skill: state.profile.skill,
});

const mapDispatchToProps = dispatch => ({
  addApplicantSkill: bindActionCreators(addApplicantSkillAction, dispatch),
  removeApplicantSkill: bindActionCreators(removeApplicantSkillAction, dispatch),
  setInputSkillVisible: bindActionCreators(setInputSkillVisibleAction, dispatch),
  setSkill: bindActionCreators(setSkillAction, dispatch),
  setExperiences: bindActionCreators(setExperiencesAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantProfileForm);
