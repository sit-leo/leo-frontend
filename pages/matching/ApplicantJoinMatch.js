import React from 'react';
import { connect } from 'react-redux';

import { serverInstance } from '../../tools/request';
import cookie from '../../tools/cookie';
import withUser from '../../tools/with-user';
import { withAuth } from '../../tools/with-auth';
import withRole, { isApplicant } from '../../tools/with-roles';
import redirectToError from '../../tools/redirect-error';

import matchAdapter from '../../store/match/match-adapter';
import profileAdapter from '../../store/profile/profile-adapter';

import { setMatch } from '../../store/match';
import { setApplicantProfile } from '../../store/profile';

import ApplicantJoinMatchPage from '../../components/matching/ApplicantJoinMatchPage';

class ApplicantJoinMatchController extends React.Component {
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
    store.dispatch(setApplicantProfile(profile));

    return {};
  }

  render() {
    return (
      <ApplicantJoinMatchPage />
    );
  }
}

export default withRole(isApplicant)(
  withUser(
    withAuth(
      connect()(ApplicantJoinMatchController),
    ),
  ),
);
