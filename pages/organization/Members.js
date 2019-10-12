import React from 'react';

import MembersPage from '../../components/organization/MembersPage';

class MemberController extends React.Component {
  static async getInitialProps({
    store, query, req, res,
  }) {
    return {};
  }

  render() {
    return <MembersPage />;
  }
}

export default MemberController;
