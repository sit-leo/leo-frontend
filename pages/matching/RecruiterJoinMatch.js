import React from 'react';
import { connect } from 'react-redux';

import { serverInstance } from '../../tools/request';
import cookie from '../../tools/cookie';

import withUser from '../../tools/with-user';
import withRole, { isRecruiter } from '../../tools/with-roles';
import { withAuth } from '../../tools/with-auth';

import redirectToError from '../../tools/redirect-error';

import profileAdapter from '../../store/profile/profile-adapter';
import matchAdapter from '../../store/match/match-adapter';
import { setMatch } from '../../store/match';

import RecruiterJoinMatchPage from '../../components/matching/RecruiterJoinMatchPage';
import { setRecruiterProfile } from '../../store/profile';

class RecruiterJoinMatchController extends React.Component {
  static async getInitialProps({
    store, req, res, query,
  }) {
    const { matchId } = query;
    const matchRequest = matchAdapter(serverInstance(cookie.getToken(req)));

    const match = await matchRequest.getMatchByMatchId(matchId);

    if (match.error) {
      return redirectToError({ req, res }, 'No Match Found.');
    }

    const profileRequest = profileAdapter(serverInstance(cookie.getToken(req)));
    const profile = await profileRequest.getProfile();

    await store.dispatch(setMatch(match));
    await store.dispatch(setRecruiterProfile(profile));

    return {};
  }

  render() {
    return (
      <RecruiterJoinMatchPage />
    );
  }
}

export default withRole(isRecruiter)(
  withUser(
    withAuth(
      connect()(RecruiterJoinMatchController),
    ),
  ),
);
