import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';

import WithNavbar from '../layouts/matching';

import Button from '../base/Button';
import Card from '../base/Card';
import ContainerRow, { Col } from '../base/Grid';

import { ROLE_APPLICANT } from '../../tools/with-roles';

const MatchPage = ({ match, role }) => {
  function handleMatchResult() {
    if (role === ROLE_APPLICANT) {
      return Router.push(`/matches/${match.id}/result`);
    }
    return Router.push(`/matches/${match.id}/result/positions`);
  }
  return (
    <WithNavbar>
      <Card>
        <ContainerRow>
          <Col className="text-center">
            <h1>{match.name}</h1>
          </Col>
          <Col lg={{ size: 6, offset: 3 }} className="text-center">
            <Button onClick={handleMatchResult}>
            Match Result
            </Button>
          </Col>
        </ContainerRow>
      </Card>
    </WithNavbar>
  );
};

MatchPage.propTypes = {
  match: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = state => ({
  match: state.match.match,
  role: state.user.role,
});

export default connect(mapStateToProps)(MatchPage);
