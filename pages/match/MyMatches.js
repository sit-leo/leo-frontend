import React from 'react';
import { connect } from 'react-redux';

import { serverInstance } from '../../tools/request';
import cookie from '../../tools/cookie';
import adapter from '../../store/match/match-adapter';

import { setMatches } from '../../store/match';

import MyMatchesPage from '../../components/matches/MyMatchesPage';

class MyMatchesController extends React.Component {
  static async getInitialProps({ store, req }) {
    const matchAdapter = adapter(serverInstance(cookie.getToken(req)));
    const matches = await matchAdapter.getCurrentMatch();
    await store.dispatch(setMatches(matches));
    return {};
  }

  render() {
    return <MyMatchesPage />;
  }
}

export default connect()(MyMatchesController);
