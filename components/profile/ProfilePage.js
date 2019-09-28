import React from 'react';
import { connect } from 'react-redux';
import {
  Upload, message,
} from 'antd';

import { clientInstance } from '../../tools/request';
import { isApplicant, isRecruiter } from '../../tools/with-roles';

import profileAdapter from '../../store/profile/profile-adapter';

import WithNavbar from '../layouts/with-navbar';

import { Col } from '../base/Grid';
import Form, { FormContainer } from '../base/Form';
import {
  TitleForm, SubTitleWhite, NoteText,
} from '../base/Text';
import Icon from '../base/Icon';
import { SmallMainButton } from '../base/Button';
import { LabelInput } from '../base/Input';

import ApplicantProfileForm from './ApplicantProfileForm';
import RecruiterProfileForm from './RecruiterProfileForm';

const UploadButton = () => (
  <div>
    <Icon type="plus" />
    <div className="ant-upload-text">Upload</div>
  </div>
);

export const Profile = ({
  role,
  applicant,
  recruiter,
  form: { getFieldDecorator, validateFields },
}) => {
  function updateProfile() {
    const profileRequest = profileAdapter(clientInstance());
    message.success('Update profile success.');
    if (isApplicant(role)) {
      return profileRequest.updateApplicantProfile(applicant);
    }
    return profileRequest.updateRecruiterProfile(recruiter);
  }
  return (
    <WithNavbar>
      <FormContainer
        className="w-100 py-4 px-4"
        onSubmit={(e) => {
          e.preventDefault();
          validateFields((err, values) => {
            if (!err) {
              updateProfile();
            }
          });
        }}
      >
        <TitleForm title="Profile" />

        {
          isRecruiter(role)
          && <RecruiterProfileForm editable getFieldDecorator={getFieldDecorator} />
        }
        {
          isApplicant(role)
          && (
            <React.Fragment>
              <ApplicantProfileForm editable getFieldDecorator={getFieldDecorator} />
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
              </Col>
            </React.Fragment>
          )
        }
        <TitleForm title="Change password" />
        <Col lg={6}>
          <LabelInput label="Current password" />
        </Col>
        <Col lg={6}>
          <LabelInput label="New password" />
        </Col>
        <Col>
          <NoteText>Leave it blank if you don’t want to change it.</NoteText>
        </Col>
        <Col className="text-center my-4">
          <hr />
          <SmallMainButton htmlType="submit">
            <SubTitleWhite className="mb-0">
              Update Profile
            </SubTitleWhite>
          </SmallMainButton>
        </Col>
      </FormContainer>
    </WithNavbar>
  );
};

const mapStateToProps = state => ({
  role: state.user.role,
  applicant: state.profile.applicant,
  recruiter: state.profile.recruiter,
});

const WrappedProfilePage = Form.create({ name: 'profile_page' })(Profile);

export default connect(mapStateToProps)(WrappedProfilePage);
