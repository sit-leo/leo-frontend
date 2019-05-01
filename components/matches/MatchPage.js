import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';

import WithNavbar from '../layouts/matching';

import Button from '../base/Button';
import Card from '../base/Card';
import ContainerRow, { Col } from '../base/Grid';

const MatchPage = ({ match }) => (
  <WithNavbar>
    <Card>
      <ContainerRow>
        <Col className="text-center">
          <h1>{match.name}</h1>
        </Col>
        <Col lg={{ size: 6, offset: 3 }} className="text-center">
          <Button onClick={() => Router.push(`/matches/${match.id}/result`)}>Match Result</Button>
        </Col>
      </ContainerRow>
    </Card>
  </WithNavbar>
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
