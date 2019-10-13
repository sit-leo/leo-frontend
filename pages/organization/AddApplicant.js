import React from 'react';

import AddApplicantPage from '../../components/organization/AddApplicantPage';

class AddApplicantController extends React.Component {
  static async getInitialProps({
    store, query, req, res,
  }) {
    return {};
  }

  render() {
    return <AddApplicantPage />;
  }
}

export default AddApplicantController;
