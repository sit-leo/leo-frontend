import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { clientInstance } from '../../tools/request';

import userAdapter from '../../store/user/user-adapter';
// import {} from '../../store/user';

import WithNavbar from '../layouts/with-navbar';

import ContainerRow, { Col } from '../base/Grid';
import Form, { Item } from '../base/Form';
import Input from '../base/Input';

const userRequest = userAdapter(clientInstance());

const LoginPage = ({
  form: { getFieldDecorator, validateFields },
}) => (
  <WithNavbar>
    <ContainerRow>
      <Col lg={{ size: 6, offset: 3 }}>
        {/* <Form
          method="POST"
          className="w-100 py-4 px-4 card"
          onSubmit={(e) => {
            e.preventDefault();
            validateFields((err, values) => {
              if (!err) {
                console.log(values);
              }
            });
          }}
        >

        </Form> */}
      </Col>
    </ContainerRow>
  </WithNavbar>
);

const mapStateToProps = state => ({
  // profile: state.user.profile,
});

const mapDispatchToProps = dispatch => ({
  // setProfile: bindActionCreators(setProfileAction, dispatch),
});

const WrappedProfilePage = Form.create({ name: 'profile_page' })(LoginPage);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedProfilePage);
