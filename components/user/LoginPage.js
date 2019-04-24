import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Form } from 'antd';
import { clientInstance } from '../../tools/request';

import userAdapter from '../../store/user/user-adapter';
import { setUsername, setPassword } from '../../store/user';

import { Title } from '../base/Text';
import Button from '../base/Button';
import Input from '../base/Input';
import ContainerRow, { Col } from '../base/Grid';

const userRequest = userAdapter(clientInstance());

const LoginPage = ({
  username,
  password,
  setUsername: handleUsername,
  setPassword: handlePassword,
}) => (
  <React.Fragment>
    <ContainerRow>
      <Col>
        <Form
          method="POST"
          className="w-100 py-4"
          onSubmit={(e) => {
            e.preventDefault();
            userRequest.login({ username, password });
          }}
        >
          <Title>Login Page</Title>
          Username
          <Input onChange={e => handleUsername(e.target.value)} value={username} />
          Password
          <Input type="password" onChange={e => handlePassword(e.target.value)} value={password} />
          <Button htmlType="submit" className="w-100 mt-4">Login</Button>
        </Form>
      </Col>
    </ContainerRow>
  </React.Fragment>
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
