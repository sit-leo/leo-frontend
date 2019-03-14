import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getUserByUsername } from '../store/account/user';

import ProfilePage from '../components/profile';

const mapStateToProps = state => ({
  user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
  getUserByUsername: bindActionCreators(getUserByUsername, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfilePage);
