import React from 'react';
import { connect } from 'react-redux';

import { withAuth } from '../../tools/with-auth';
import withUser from '../../tools/with-user';
import { serverInstance } from '../../tools/request';
import cookie from '../../tools/cookie';

import profileAdapter from '../../store/profile/profile-adapter';

import ProfilePage from '../../components/profile/ProfilePage';

import { setApplicantProfile } from '../../store/profile';

class ProfileController extends React.Component {
  static async getInitialProps({
    store, req, res, query,
  }) {
    const profileRequest = profileAdapter(serverInstance(cookie.getToken(req)));

    const profile = await profileRequest.getProfile();

    if (profile.error) {
      // redirect error or to login page.
      return {};
    }

    store.dispatch(setApplicantProfile(profile));

    return {};
  }

  render() {
    return <ProfilePage />;
  }
}

export default withUser(
  withAuth(
    connect()(ProfileController),
  ),
);
