import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { clientInstance } from '../../tools/request';

import userAdapter from '../../store/user/user-adapter';

import Navbar from '../base/Navbar';

const userRequest = userAdapter(clientInstance());

function logout() {
  userRequest.logout();
}

const WithNavbar = ({ role, children }) => (
  <Fragment>
    <Navbar role={role} logout={() => logout()} />
    { children }
  </Fragment>
);

const mapStateToProps = state => ({
  role: state.user.role,
});

export default connect(mapStateToProps)(WithNavbar);
