import React from 'react';
import { connect } from 'react-redux';

import { withAuth } from '../../tools/with-auth';
import withUser from '../../tools/with-user';
import { serverInstance } from '../../tools/request';
import cookie from '../../tools/cookie';
import { isApplicant, isRecruiter } from '../../tools/with-roles';

import profileAdapter from '../../store/profile/profile-adapter';
import userAdapter from '../../store/user/user-adapter';

import ProfilePage from '../../components/profile/ProfilePage';

import { setApplicantProfile, setEducation, setRecruiterProfile } from '../../store/profile';

class ProfileController extends React.Component {
  static async getInitialProps({
    store, req, res, query,
  }) {
    const userRequest = userAdapter(serverInstance(cookie.getToken(req)));
    const profileRequest = profileAdapter(serverInstance(cookie.getToken(req)));

    const user = await userRequest.getUser();

    if (user.error) {
      // redirect error or to login page.
      return {};
    }

    const profile = await profileRequest.getProfile();

    if (profile.error) {
      // redirect error or to login page.
      return {};
    }

    if (isApplicant(user.role)) {
      store.dispatch(setApplicantProfile(profile));
      store.dispatch(setEducation('applicantId', profile.applicantId));
    }

    if (isRecruiter(user.role)) {
      store.dispatch(setRecruiterProfile(profile));
    }


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
