import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { clientInstance } from '../../tools/request';

import userAdapter from '../../store/user/user-adapter';

import Navbar from '../base/Navbar';


function logout() {
  const userRequest = userAdapter(clientInstance());
  userRequest.logout();
}

const WithNavbar = ({ role, children }) => (
  <Fragment>
    <Navbar role={role} logout={logout} />
    { children }
  </Fragment>
);

const mapStateToProps = state => ({
  role: state.user.role,
});

export default connect(mapStateToProps)(WithNavbar);
