import React from 'react';
import { connect } from 'react-redux';

import { withAuth } from '../../tools/with-auth';
import withUser from '../../tools/with-user';
import withRole, { isRecruiter } from '../../tools/with-roles';
import withJoinMatch from '../../tools/with-join-match';

import { serverInstance } from '../../tools/request';
import cookie from '../../tools/cookie';

import matchAdapter from '../../store/match/match-adapter';
import matchingAdapter from '../../store/matching/matching-adapter';

import { setMatch } from '../../store/match';
import { setPositions } from '../../store/matching/ranking';

import RecruiterPositionMatchResultPage from '../../components/matching/RecruiterPositionMatchResultPage';

class RecruiterPositionMatchResultPageController extends React.Component {
  static async getInitialProps({ store, query, req }) {
    const matchRequest = matchAdapter(serverInstance(cookie.getToken(req)));
    const matchingRequest = matchingAdapter(serverInstance(cookie.getToken(req)));

    const { matchId } = query;
    const match = await matchRequest.getMatchByMatchId(matchId);
    const positions = await matchingRequest.getRecruiterPositionsByMatchId(matchId);

    await store.dispatch(setMatch(match));
    if (positions && positions.length > 0) {
      await store.dispatch(setPositions(positions));
    }
    return {};
  }

  render() {
    return <RecruiterPositionMatchResultPage />;
  }
}

export default withJoinMatch(
  withRole(isRecruiter)(
    withUser(
      withAuth(
        connect()(RecruiterPositionMatchResultPageController),
      ),
    ),
  ),
);
