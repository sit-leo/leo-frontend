import React from 'react';
import { connect } from 'react-redux';

import { withAuth } from '../../tools/with-auth';
import { serverInstance } from '../../tools/request';
import cookie from '../../tools/cookie';

import matchingAdapter from '../../store/matching/matching-adapter';
import userAdapter from '../../store/user/user-adapter';

import { setId, setRole } from '../../store/user';
import { setMatchResults } from '../../store/matching/ranking';

import MatchResultPage from '../../components/matching/MatchResultPage';

class MatchResultController extends React.Component {
  static async getInitialProps({ store, req, query }) {
    const { matchId } = query;
    const userRequest = userAdapter(serverInstance(cookie.getToken(req)));
    const matchingRequest = matchingAdapter(serverInstance(cookie.getToken(req)));

    const user = await userRequest.getUser();
    const matchResults = await matchingRequest.getMatchResultByMatchId(matchId);

    await store.dispatch(setId(user.id));
    await store.dispatch(setRole(user.role));
    await store.dispatch(setMatchResults(matchResults));
    return {};
  }

  render() {
    return <MatchResultPage />;
  }
}

export default withAuth(
  connect()(MatchResultController),
);
