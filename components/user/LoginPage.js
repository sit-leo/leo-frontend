import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { clientInstance } from '../../tools/request';

import userAdapter from '../../store/user/user-adapter';
import { setUsername, setPassword } from '../../store/user';

import WithNavbar from '../layouts/with-navbar';

import { SmallMainButton } from '../base/Button';
import Input from '../base/Input';
import ContainerRow, { Col } from '../base/Grid';
import { FlexCenter } from '../base/Flex';
import Form, { Item } from '../base/Form';

const userRequest = userAdapter(clientInstance());

const LoginPage = ({
  username,
  password,
  setUsername: handleUsername,
  setPassword: handlePassword,
  form: { getFieldDecorator },
}) => (
  <WithNavbar>
    <FlexCenter className="vh-100">
      <ContainerRow>
        <Col lg={{ size: 6, offset: 3 }}>
          <Form
            method="POST"
            className="w-100 py-4 px-4 card"
            onSubmit={(e) => {
              e.preventDefault();
              userRequest.login({ username, password });
            }}
          >
            <Col className="text-center mb-3">
              <img className="w-25" src="/static/images/leo.png" alt="LEO-Logo" />
            </Col>
            <Item>
              {getFieldDecorator('email', {
                validateTrigger: ['onBlur'],
                rules: [
                  {
                    required: true,
                    message: 'Please fill your email.',
                    setFieldsValue: username,
                  },
                ],
              })(
                <Input
                  onChange={e => handleUsername(e.target.value)}
                  placeholder="Email"
                  required
                />,
              )}
            </Item>

            <Item>
              {getFieldDecorator('password', {
                validateTrigger: ['onBlur'],
                rules: [
                  {
                    required: true,
                    message: 'Please fill your password.',
                    setFieldsValue: password,
                  },
                ],
              })(
                <Input
                  type="password"
                  onChange={e => handlePassword(e.target.value)}
                  placeholder="password"
                  required
                />,
              )}
            </Item>
            <SmallMainButton htmlType="submit" className="my-3 w-25 mx-auto">Sign in</SmallMainButton>
          </Form>
        </Col>
      </ContainerRow>
    </FlexCenter>
  </WithNavbar>
);

const mapStateToProps = state => ({
  username: state.user.username,
  password: state.user.password,
});

const mapDispatchToProps = dispatch => ({
  setUsername: bindActionCreators(setUsername, dispatch),
  setPassword: bindActionCreators(setPassword, dispatch),
});

const WrappedLoginPage = Form.create({ name: 'login_page' })(LoginPage);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedLoginPage);
