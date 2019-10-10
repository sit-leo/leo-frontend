import React from 'react';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Upload, message,
} from 'antd';

import { clientInstance } from '../../tools/request';
import { isApplicant, isRecruiter } from '../../tools/with-roles';

import color from '../../config/color';

import matchingAdapter from '../../store/matching/matching-adapter';
import profileAdapter from '../../store/profile/profile-adapter';

import WithNavbar from '../layouts/with-navbar';

import {
  addApplicantFiles as addApplicantFilesAction,
} from '../../store/profile';

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

const DumpUpload = styled(Upload)`
  max-width: 102px;
  margin-right: 16px;
  border-radius: 4px;
  .ant-upload-select {
    border: solid 2px ${color.disabled};
    background: ${color.white};
  }
  img {
    max-width: 30px;
  }
  span {
    text-overflow: ellipsis;
    max-width: 86px;
    overflow: hidden;
  }
`;

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
  files,
  form: { getFieldDecorator, validateFields },
  addApplicantFiles,
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
              <Col className="d-flex">
                {
                  files.map(file => (
                    <DumpUpload
                      listType="picture-card"
                      key={file.uid}
                    >
                      <div>
                        <img src="/static/images/file.png" alt={file.name} />
                        <span className="d-block mt-2">{`${file.name}`}</span>
                      </div>
                    </DumpUpload>
                  ))
                }
                <Upload
                  customRequest={({ file }) => {
                    const matchingRequest = matchingAdapter(
                      clientInstance(true, { 'Content-Type': 'multipart/form-data' }),
                    );
                    matchingRequest.uploadFile(file).then(() => message.success('Upload success.'));
                  }}
                  listType="picture-card"
                  fileList={files}
                  showUploadList={false}
                  onChange={({ fileList }) => addApplicantFiles(fileList)}
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
  files: state.profile.files,
});

const mapDispatchToProps = dispatch => ({
  addApplicantFiles: bindActionCreators(addApplicantFilesAction, dispatch),
});

const WrappedProfilePage = Form.create({ name: 'profile_page' })(Profile);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedProfilePage);
