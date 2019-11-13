import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { message } from 'antd';

import { clientInstance } from '../../tools/request';

import userAdapter from '../../store/user/user-adapter';

import { setPassword as setPasswordAction } from '../../store/profile';

import Form, { FormContainer } from '../base/Form';
import { Col } from '../base/Grid';
import { LabelInput } from '../base/Input';
import Modal from '../base/Modal';

import {
  TitleForm, SubTitleWhite, NoteText,
} from '../base/Text';
import { ExtraSmallMainButton } from '../base/Button';
import { setLoading as setLoadingAction } from '../../store/global';

const ChangePassword = ({
  password: {
    currentPassword,
    newPassword,
  },
  form: { validateFields, getFieldDecorator },
  setLoading,
  setPassword,
}) => {
  const [isOpenConfirm, toggleConfirm] = useState(false);
  function changePassword() {
    const userRequest = userAdapter(clientInstance());
    return userRequest.changePassword({
      currentPassword,
      newPassword,
    });
  }
  return (
    <React.Fragment>
      <FormContainer
        className="w-100 pb-4 px-4"
        onSubmit={(e) => {
          e.preventDefault();
          validateFields((err, values) => {
            if (!err) {
              toggleConfirm(true);
            }
          });
        }}
      >
        <TitleForm title="Change password" />
        <Col lg={6}>
          <LabelInput
            label="Current password"
            name="currentPassword"
            text={currentPassword}
            type="password"
            getFieldDecorator={getFieldDecorator}
            onChange={e => setPassword('currentPassword', e.target.value)}
          />
        </Col>
        <Col lg={6}>
          <LabelInput
            label="New password"
            name="newPassword"
            text={newPassword}
            type="password"
            getFieldDecorator={getFieldDecorator}
            onChange={e => setPassword('newPassword', e.target.value)}
          />
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

      <Modal
        isOpenModal={isOpenConfirm}
        onClose={() => toggleConfirm(false)}
        onConfirm={async () => {
          toggleConfirm(false);
          setLoading(true);
          const { error } = await changePassword();
          if (!error) {
            message.success('Change password success.');
          } else {
            message.error('Change password failed, please check your password again.');
          }
          setLoading(false);
        }}
        options={{
          header: 'Change Password Confirmation',
          body: `Are you sure to confirm this password?
      Please check the password before confirming.`,
          footer: 'You can edit your password again in this page.',
        }}
      />

    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  password: state.profile.password,
});

const mapDispatchToProps = dispatch => ({
  setLoading: bindActionCreators(setLoadingAction, dispatch),
  setPassword: bindActionCreators(setPasswordAction, dispatch),
});

const WrappedChangePassword = Form.create({ name: 'change_password' })(ChangePassword);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedChangePassword);
