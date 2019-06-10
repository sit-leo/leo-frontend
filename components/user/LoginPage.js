import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Form } from 'antd';
import { clientInstance } from '../../tools/request';

import userAdapter from '../../store/user/user-adapter';
import { setUsername, setPassword } from '../../store/user';

import { Title } from '../base/Text';
import { SmallButton, SmallMainButton } from '../base/Button';
import Input from '../base/Input';
import ContainerRow, { Col, Row } from '../base/Grid';
import { FlexCenter } from '../base/Flex';

const userRequest = userAdapter(clientInstance());

const LoginPage = ({
  username,
  password,
  setUsername: handleUsername,
  setPassword: handlePassword,
}) => (
  <FlexCenter className="vh-100">
    <ContainerRow>
      <Col className="py-3">
        <Row>
          <Col className="text-center text-lg-right" lg={{ size: 3, offset: 3 }}>
            <img className="w-25" src="/static/images/leo.png" alt="LEO-Logo" />
          </Col>
          <Col className="text-center text-lg-left" lg={{ size: 3 }}>
            <h1 className="m-0">LEO</h1>
            Matching System
          </Col>
        </Row>
      </Col>
      <Col lg={{ size: 6, offset: 3 }}>
        <Form
          method="POST"
          className="w-100 py-4 px-4 card"
          onSubmit={(e) => {
            e.preventDefault();
            userRequest.login({ username, password });
          }}
        >
          <Title>Login</Title>
          <Input
            onChange={e => handleUsername(e.target.value)}
            value={username}
            placeholder="Email"
            required
          />
          <Input
            type="password"
            onChange={e => handlePassword(e.target.value)}
            value={password}
            placeholder="password"
            required
          />
          <div className="text-right">
            <a href="#forgot-password">
              <u>Forgot Password?</u>
            </a>
          </div>
          <SmallMainButton htmlType="submit" className="my-3 w-25 mx-auto">Login</SmallMainButton>
          <div className="text-center">
            <span className="mr-3">{`${"Don't have any account ?"}`}</span>
            <SmallButton>Register</SmallButton>
          </div>
        </Form>
      </Col>
    </ContainerRow>
  </FlexCenter>
);

const mapStateToProps = state => ({
  username: state.user.username,
  password: state.user.password,
});

const mapDispatchToProps = dispatch => ({
  setUsername: bindActionCreators(setUsername, dispatch),
  setPassword: bindActionCreators(setPassword, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
