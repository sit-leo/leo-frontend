import React from 'react';
import { connect } from 'react-redux';

import WithNavbar from '../layouts/with-navbar';

import Container, { Col } from '../base/Grid';
import { FlexBetween } from '../base/Flex';
import { TitleMedium } from '../base/Text';
import Card from '../base/Card';

import RankingStep from './RankingStep';

const RankCouter = ({ counter }) => (
  <TitleMedium className="text-center">
    {`${counter}`}
    <br />
    {'Your Rank'}
  </TitleMedium>
);

export const Ranking = ({
  steps = [], step, handleStep,
  ranks = [],
  children,
}) => (
  <WithNavbar>
    <Container className="py-5">
      <Card>
        <Col>
          <RankingStep steps={steps} step={step} />
          <FlexBetween>
            <RankCouter counter={ranks.length} />
            <div className="d-flex flex-column">
              <h6>Debugger</h6>
              <button type="button" onClick={() => step > 0 && handleStep(step - 1)}>Previous Step</button>
              <button type="button" onClick={() => step < 2 && handleStep(step + 1)}>Next Step</button>
            </div>
          </FlexBetween>
        </Col>
        <Col>
          {
            children
          }
        </Col>
      </Card>
    </Container>
  </WithNavbar>
);

const mapStateToProps = state => ({
  match: state.match.match,
});

export default connect(mapStateToProps)(Ranking);
