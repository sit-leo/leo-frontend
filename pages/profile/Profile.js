import React from 'react';
import { connect } from 'react-redux';
import { serverInstance } from '../../tools/request';

import cookie from '../../tools/cookie';
import { withAuth } from '../../tools/with-auth';
import { isApplicant } from '../../tools/with-roles';
import withUser from '../../tools/with-user';

import userAdapter from '../../store/user/user-adapter';
import { addApplicantFiles } from '../../store/profile';

import ProfilePage from '../../components/profile/ProfilePage';
import profileAdapter from '../../store/profile/profile-adapter';

class ProfileController extends React.Component {
  static async getInitialProps({
    store, req, res, query,
  }) {
    const token = cookie.getToken(req);

    const userRequest = userAdapter(serverInstance(token));
    const user = await userRequest.getUser();

    if (isApplicant(user.role)) {
      const profileRequest = profileAdapter(serverInstance(token));
      const files = await profileRequest.getFiles();
      if (Array.isArray(files) && files.length > 0) {
        await store.dispatch(addApplicantFiles(files));
      }
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
