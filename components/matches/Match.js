import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const MatchPage = ({ match }) => (
  <React.Fragment>
    <h1>{match.name}</h1>
  </React.Fragment>
);


MatchPage.propTypes = {
  match: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};


const mapStateToProps = state => ({
  match: state.match.match,
});

export default connect(mapStateToProps)(MatchPage);
