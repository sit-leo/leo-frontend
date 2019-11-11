import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Alert, message } from 'antd';

import { clientInstance } from '../../tools/request';

import userAdapter from '../../store/user/user-adapter';
import { setUsername, setPassword } from '../../store/user';

import WithNavbar from '../layouts/with-navbar';
import WithLoading from '../layouts/with-loading';

import { SmallMainButton } from '../base/Button';
import Input from '../base/Input';
import ContainerRow, { Col } from '../base/Grid';
import { FlexCenter } from '../base/Flex';
import Form, { Item } from '../base/Form';
import { setLoading } from '../../store/global';
import cookie from '../../tools/cookie';

const userRequest = userAdapter(clientInstance());

class LoginPage extends React.Component {
  state = {
    error: null
  }

  setError = (error) => {
    this.setState({ error })
  }

  componentDidMount() {
    cookie.clearToken();
  }

  render() {
    const { error } = this.state;
    const {
      loading,
      username,
      password,
      setLoading = () => { },
      setUsername: handleUsername,
      setPassword: handlePassword,
      form: { getFieldDecorator, validateFields },
    } = this.props;
    return (
      <WithLoading>
        <WithNavbar>
          <FlexCenter className="vh-100">
            <ContainerRow>
              <Col lg={{ size: 6, offset: 3 }}>
                <Form
                  method="POST"
                  className="w-100 py-4 px-4 card"
                  onSubmit={(e) => {
                    e.preventDefault();
                    validateFields((err, values) => {
                      if (!err) {
                        setLoading(true);
                        userRequest.login({ username, password }).then(({ status }) => {
                          if (status && status !== 200) {
                            this.setError('You have entered wrong email or password. Please try again.');
                            setLoading(false);
                          } else {
                            this.setError(null);
                            message.success('Login success.');
                            window.location.assign('/matches');
                          }
                        });
                      }
                    });
                  }}
                >
                  <Col className="text-center mb-3">
                    <img className="w-25" src="/static/images/leo.png" alt="LEO-Logo" />
                  </Col>
                  {
                    error && (
                      <Col className="px-0 pb-2">
                        <Alert
                          message="Error"
                          description={error}
                          type="error"
                          showIcon
                        />
                      </Col>
                    )
                  }
                  <Item>
                    {getFieldDecorator('email', {
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
                      />,
                    )}
                  </Item>

                  <Item>
                    {getFieldDecorator('password', {
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
                      />,
                    )}
                  </Item>
                  <SmallMainButton htmlType="submit" className="my-3 w-25 mx-auto">Sign in</SmallMainButton>
                </Form>
              </Col>
            </ContainerRow>
          </FlexCenter>
        </WithNavbar>
      </WithLoading>
    )
  }
}

const mapStateToProps = state => ({
  username: state.user.username,
  password: state.user.password,
});

const mapDispatchToProps = dispatch => ({
  setUsername: bindActionCreators(setUsername, dispatch),
  setPassword: bindActionCreators(setPassword, dispatch),
  setLoading: bindActionCreators(setLoading, dispatch),
});

const WrappedLoginPage = Form.create({ name: 'login_page' })(LoginPage);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedLoginPage);
