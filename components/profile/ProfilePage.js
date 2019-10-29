import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Upload, message,
} from 'antd';

import { clientInstance } from '../../tools/request';
import { isApplicant, isRecruiter } from '../../tools/with-roles';

import profileAdapter from '../../store/profile/profile-adapter';

import WithNavbar from '../layouts/with-navbar';

import {
  addApplicantFiles as addApplicantFilesAction,
} from '../../store/profile';

import ContainerRow, { Col } from '../base/Grid';
import Form, { FormContainer } from '../base/Form';
import {
  TitleLargePrimary, TitleForm, SubTitleWhite, NoteText,
} from '../base/Text';
import { SmallMainButton, ExtraSmallMainButton } from '../base/Button';
import { LabelInput } from '../base/Input';

import ApplicantProfileForm from './ApplicantProfileForm';
import RecruiterProfileForm from './RecruiterProfileForm';
import { DumpUpload, UploadButton } from '../base/Upload';

export const Profile = ({
  role,
  applicant,
  recruiter,
  files = [],
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
      <ContainerRow>
        <Col lg={3}>
          <TitleLargePrimary className="my-3">
            Profile
          </TitleLargePrimary>
        </Col>
      </ContainerRow>
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
                      key={file.uid || file.id}
                    >
                      <div>
                        <img src="/static/images/file.png" alt={file.name || file.fileName} />
                        <span className="d-block mt-2">{`${file.name || file.fileName}`}</span>
                      </div>
                    </DumpUpload>
                  ))
                }
                <Upload
                  customRequest={({ file }) => {
                    const profileRequest = profileAdapter(
                      clientInstance(true, { 'Content-Type': 'multipart/form-data' }),
                    );
                    profileRequest.uploadFile(file).then(() => message.success('Upload success.'));
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
        <Col className="text-center my-4">
          <hr />
          <SmallMainButton htmlType="submit">
            <SubTitleWhite className="mb-0">
              Update Profile
            </SubTitleWhite>
          </SmallMainButton>
        </Col>
      </FormContainer>

      <FormContainer
        className="w-100 py-4 px-4"
        onSubmit={(e) => {
          e.preventDefault();
          validateFields((err, values) => {
            if (!err) {
              // changePassword();
            }
          });
        }}
      >
        <TitleForm title="Change password" />
        <Col lg={6}>
          <LabelInput label="Current password" />
        </Col>
        <Col lg={6}>
          <LabelInput label="New password" />
        </Col>
        <Col className="d-flex justify-content-between my-2">
          <NoteText>Leave it blank if you don’t want to change it.</NoteText>
          <ExtraSmallMainButton htmlType="submit">
            <SubTitleWhite className="mb-0">
              Update
            </SubTitleWhite>
          </ExtraSmallMainButton>
        </Col>
        <Col><hr /></Col>
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
