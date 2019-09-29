import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { clientInstance } from '../../tools/request';

import userAdapter from '../../store/user/user-adapter';
import { setRole as setRoleAction } from '../../store/user';

import Navbar from '../base/Navbar';


function logout() {
  const userRequest = userAdapter(clientInstance());
  userRequest.logout();
}

const WithNavbar = ({
  fullName, role, setRole, children,
}) => (
  <Fragment>
    <Navbar
      fullName={fullName}
      role={role}
      logout={() => setRole('guest') && logout()}
    />
    { children }
  </Fragment>
);

const mapStateToProps = state => ({
  fullName: state.user.fullName,
  role: state.user.role,
});

const mapDispatchToProps = dispatch => ({
  setRole: bindActionCreators(setRoleAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(WithNavbar);
