import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import WithNavbar from '../layouts/with-navbar';
import ContainerRow, { Col, Row } from '../base/Grid';

import Card from '../base/Card';
import MatchCard from './MatchCard';

const MyMatchPage = ({ matches = [] }) => (
  <WithNavbar>
    <ContainerRow className="py-5">
      <Card className="px-0">
        <Row>
          <Col lg={{ size: 10, offset: 1 }}>
          tabs
            <br />
            {
            matches.map(match => (
              <MatchCard key={match.name} />
            ))
          }
          </Col>
        </Row>
      </Card>
    </ContainerRow>
  </WithNavbar>
);

const mapStateToProps = state => ({
  matches: state.match.matches,
});

export default connect(mapStateToProps)(MyMatchPage);
