import React from 'react';

import AddRecruiterPage from '../../components/organization/AddRecruiterPage';

class AddRecruiterController extends React.Component {
  static async getInitialProps({
    store, query, req, res,
  }) {
    return {};
  }

  render() {
    return <AddRecruiterPage />;
  }
}

export default AddRecruiterController;
