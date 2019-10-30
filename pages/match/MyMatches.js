import React from 'react';
import { connect } from 'react-redux';

import { withAuth } from '../../tools/with-auth';
import withUser from '../../tools/with-user';

import { setLoading } from '../../store/global';

import MyMatchesPage from '../../components/matches/MyMatchesPage';

class MyMatchesController extends React.Component {
  static async getInitialProps({ store, req }) {
    await store.dispatch(setLoading(true));
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
