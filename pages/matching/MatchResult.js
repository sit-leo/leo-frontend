import React from 'react';
import { connect } from 'react-redux';

import { withAuth } from '../../tools/with-auth';
import { serverInstance } from '../../tools/request';
import cookie from '../../tools/cookie';

import adapter from '../../store/matching/matching-adapter';

// import { setMatchResult } from '../../store/matching/ranking';

import MatchResultPage from '../../components/matching/MatchResultPage';

class MatchResultController extends React.Component {
  static async getInitialProps({ store, req }) {
    // const matchingAdapter = adapter(serverInstance(cookie.getToken(req)));
    // const matchResults = await matchingAdapter.getMatchResult();
    // await store.dispatch(setMatchResult(matchResults));
    return {};
  }

  render() {
    return <MatchResultPage />;
  }
}

export default withAuth(
  connect()(MatchResultController),
);
