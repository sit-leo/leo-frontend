import React from 'react';
import { connect } from 'react-redux';

import { withAuth } from '../../tools/with-auth';
import withUser from '../../tools/with-user';

import { serverInstance } from '../../tools/request';
import cookie from '../../tools/cookie';

import matchAdapter from '../../store/match/match-adapter';

import { setMatches } from '../../store/match';

import MyMatchesPage from '../../components/matches/MyMatchesPage';

class MyMatchesController extends React.Component {
  static async getInitialProps({ store, req }) {
    const matchRequest = matchAdapter(serverInstance(cookie.getToken(req)));
    const matches = await matchRequest.getCurrentMatches();
    await store.dispatch(setMatches(matches));
    return {};
  }

  render() {
    return <MyMatchesPage />;
  }
}

export default withUser(
  withAuth(
    connect()(MyMatchesController),
  ),
);
