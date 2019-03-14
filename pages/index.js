import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setLoading } from '../store/theme/loading';
import { getUserByUsername, updateUsername } from '../store/account/user';

import LandingPage from '../components/landing';

const mapStateToProps = state => ({
  loading: state.loading.loading,
  user: state.user.user,
  username: state.user.username,
});

const mapDispatchToProps = dispatch => ({
  setLoading: bindActionCreators(setLoading, dispatch),
  updateUsername: bindActionCreators(updateUsername, dispatch),
  getUserByUsername: bindActionCreators(getUserByUsername, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LandingPage);
