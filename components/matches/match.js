import React from 'react';
import PropTypes from 'prop-types';

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

export default MatchPage;
