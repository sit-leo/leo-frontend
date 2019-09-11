import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Upload, Icon,
} from 'antd';

import { clientInstance } from '../../tools/request';

import matchAdapter from '../../store/match/match-adapter';

import WithJoinMatch from '../layouts/join-match';

import {
  setInputSkillVisible as setInputSkillVisibleAction,
  setSkill as setSkillAction,
  addApplicantSkill as addApplicantSkillAction,
  removeApplicantSkill as removeApplicantSkillAction,
  setExperiences as setExperiencesAction,
} from '../../store/match/join';

import { Col } from '../base/Grid';
import { TitleLarge, TitleForm } from '../base/Text';
import Input, { LabelInput, TextArea } from '../base/Input';
import Tag from '../base/Tag';

const UploadButton = () => (
  <div>
    <Icon type="plus" />
    <div className="ant-upload-text">Upload</div>
  </div>
);

const handleConfirmApplicant = async (id) => {
  const matchRequest = matchAdapter(clientInstance());
  await matchRequest.joinMatchApplicant(id);
};

const ApplicantJoinMatchPage = ({
  match,
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
  <WithJoinMatch
    handleConfirm={() => handleConfirmApplicant(match.id)}
  >
    <Col>
      <TitleLarge className="my-2">{match.name}</TitleLarge>
    </Col>
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
    <TitleForm title="Documents" />
    <Col>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={[]}
        onPreview={e => console.log(e)}
        onChange={e => console.log(e)}
      >
        <UploadButton />
      </Upload>
      <hr />
    </Col>
  </WithJoinMatch>
);

const mapStateToProps = state => ({
  match: state.match.match,
  inputSkillVisible: state.join.inputSkillVisible,
  skills: state.join.applicant.skills,
  experiences: state.join.applicant.experiences,
  skill: state.join.skill,
});

const mapDispatchToProps = dispatch => ({
  addApplicantSkill: bindActionCreators(addApplicantSkillAction, dispatch),
  removeApplicantSkill: bindActionCreators(removeApplicantSkillAction, dispatch),
  setInputSkillVisible: bindActionCreators(setInputSkillVisibleAction, dispatch),
  setSkill: bindActionCreators(setSkillAction, dispatch),
  setExperiences: bindActionCreators(setExperiencesAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantJoinMatchPage);
