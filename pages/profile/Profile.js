import React from 'react';
import { connect } from 'react-redux';
import { serverInstance } from '../../tools/request';

import cookie from '../../tools/cookie';
import { withAuth } from '../../tools/with-auth';
import { isApplicant } from '../../tools/with-roles';
import withUser from '../../tools/with-user';

import userAdapter from '../../store/user/user-adapter';
import matchingAdapter from '../../store/matching/matching-adapter';
import { addApplicantFiles } from '../../store/profile';

import ProfilePage from '../../components/profile/ProfilePage';

class ProfileController extends React.Component {
  static async getInitialProps({
    store, req, res, query,
  }) {
    const token = cookie.getToken(req);

    const userRequest = userAdapter(serverInstance(token));
    const user = await userRequest.getUser();

    if (isApplicant(user.role)) {
      const matchingRequest = matchingAdapter(serverInstance(token));
      const files = await matchingRequest.getFiles();
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
