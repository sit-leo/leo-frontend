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
  addApplicantFile as addApplicantFileAction, setImageUrl as setImageUrlAction,
} from '../../store/profile';

import {
  setLoading as setLoadingAction,
} from '../../store/global';

import ContainerRow, { Col } from '../base/Grid';
import Form, { FormContainer } from '../base/Form';
import {
  TitleLargePrimary, TitleForm, SubTitleWhite,
} from '../base/Text';
import { SmallMainButton } from '../base/Button';
import { UploadButton, PreviewFile, UploadImage } from '../base/Upload';

import ApplicantProfileForm from './ApplicantProfileForm';
import RecruiterProfileForm from './RecruiterProfileForm';
import ChangePassword from './ChangePassword';

export const Profile = ({
  role,
  applicant,
  recruiter,
  files = [],
  imageUrl,
  form: { getFieldDecorator, validateFields },
  addApplicantFile,
  setImageUrl,
  setLoading,
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
        <Col className="text-center">
          <UploadImage
            imageUrl={imageUrl}
            customRequest={({ file }) => {
              setLoading(true);
              const profileRequest = profileAdapter(
                clientInstance(true, { 'Content-Type': 'multipart/form-data' }),
              );
              profileRequest.uploadImageProfile(file).then((response) => {
                if (!response.error) {
                  setImageUrl(response.imageURL);
                  message.success('Upload success.');
                } else {
                  message.error('Upload failed.');
                }
                setLoading(false);
              });
            }}
          />
        </Col>
      </ContainerRow>
      <FormContainer
        className="w-100 pb-4 px-4"
        onSubmit={(e) => {
          e.preventDefault();
          validateFields((err) => {
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
                    <PreviewFile
                      key={`${file.id}-${file.fileName}`}
                      fileId={file.id}
                      fileName={file.fileName}
                      isFinished
                    />
                  ))
                }
                <Upload
                  customRequest={({ file }) => {
                    message.info('Uploading.');
                    setLoading(true);
                    const profileRequest = profileAdapter(
                      clientInstance(true, { 'Content-Type': 'multipart/form-data' }),
                    );
                    profileRequest.uploadFile(file).then((response) => {
                      const [data] = response;
                      addApplicantFile(data);
                      setLoading(false);
                      message.success('Upload success.');
                    });
                  }}
                  listType="picture-card"
                  fileList={files}
                  showUploadList={false}
                >
                  <UploadButton />
                </Upload>
              </Col>
            </React.Fragment>
          )
        }
        <Col className="text-center mt-4">
          <SmallMainButton htmlType="submit">
            <SubTitleWhite className="mb-0">
              Update Profile
            </SubTitleWhite>
          </SmallMainButton>
        </Col>
      </FormContainer>
      <ChangePassword />
    </WithNavbar>
  );
};

const mapStateToProps = state => ({
  role: state.user.role,
  applicant: state.profile.applicant,
  recruiter: state.profile.recruiter,
  files: state.profile.files,
  imageUrl: state.profile.imageUrl,
});

const mapDispatchToProps = dispatch => ({
  addApplicantFile: bindActionCreators(addApplicantFileAction, dispatch),
  setLoading: bindActionCreators(setLoadingAction, dispatch),
  setImageUrl: bindActionCreators(setImageUrlAction, dispatch),
});

const WrappedProfilePage = Form.create({ name: 'profile_page' })(Profile);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedProfilePage);
