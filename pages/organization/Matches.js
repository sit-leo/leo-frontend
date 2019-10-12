import React from 'react';

import MatchesPage from '../../components/organization/MatchesPage';

class MatchesController extends React.Component {
  static async getInitialProps({
    store, query, req, res,
  }) {
    return {};
  }

  render() {
    return <MatchesPage />;
  }
}

export default MatchesController;
