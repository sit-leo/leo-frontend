import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const MyMatchPage = ({ matches = [] }) => (
  <React.Fragment>
    {matches.map(match => match.name)}
  </React.Fragment>
);

const mapStateToProps = state => ({
  matches: state.match.matches,
});

export default connect(mapStateToProps)(MyMatchPage);
