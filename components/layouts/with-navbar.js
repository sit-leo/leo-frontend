import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { clientInstance } from '../../tools/request';

import userAdapter from '../../store/user/user-adapter';

import { setLoading as setLoadingAction } from '../../store/global';
import { setRole as setRoleAction } from '../../store/user';

import Navbar from '../base/Navbar';
import WithLoading from './with-loading';


function logout() {
  const userRequest = userAdapter(clientInstance());
  userRequest.logout();
}

const WithNavbar = ({
  loading, setLoading, fullName, role, setRole, imageUrl, children,
}) => (
  <WithLoading loading={loading}>
    <Navbar
      imageUrl={imageUrl}
      fullName={fullName}
      role={role}
      logout={() => setLoading(true) && setRole('guest') && logout()}
    />
    { children }
  </WithLoading>
);

const mapStateToProps = state => ({
  fullName: state.user.fullName,
  role: state.user.role,
  imageUrl: state.profile.imageUrl,
});

const mapDispatchToProps = dispatch => ({
  setRole: bindActionCreators(setRoleAction, dispatch),
  setLoading: bindActionCreators(setLoadingAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(WithNavbar);
