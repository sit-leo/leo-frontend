import React from 'react';
import { connect } from 'react-redux';

import { serverInstance } from '../../tools/request';
import cookie from '../../tools/cookie';
import withUser from '../../tools/with-user';
import { withAuth } from '../../tools/with-auth';
import withRole, { isApplicant } from '../../tools/with-roles';
import isCanJoinMatch from '../../tools/match-time';
import redirectToError from '../../tools/redirect-error';

import matchAdapter from '../../store/match/match-adapter';

import { setMatch } from '../../store/match';

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

    if (!isCanJoinMatch(match.startJoiningDate, match.endJoiningDate)) {
      return redirectToError({ req, res }, 'Not joining period.');
    }

    await store.dispatch(setMatch(match));
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
