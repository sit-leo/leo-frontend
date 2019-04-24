import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { clientInstance } from '../../tools/request';

import userAdapter from '../../store/user/user-adapter';
import { setUsername, setPassword } from '../../store/user';

import Button from '../base/Button';

const userRequest = userAdapter(clientInstance());

const LoginPage = ({
  username,
  password,
  setUsername: handleUsername,
  setPassword: handlePassword,
}) => (
  <React.Fragment>
    <h1>Login Page</h1>
    <input onChange={e => handleUsername(e.target.value)} value={username} />
    <input onChange={e => handlePassword(e.target.value)} value={password} />
    <Button onClick={() => userRequest.login({ username, password })}>Login</Button>
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
