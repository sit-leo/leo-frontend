import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Loading from '../base/Loading';

const WithLoading = ({ loading, children }) => (
  <Fragment>
    <Loading loading={loading} />
    { children }
  </Fragment>
);

const mapStateToProps = state => ({
  loading: state.global.loading,
});

export default connect(mapStateToProps)(WithLoading);
