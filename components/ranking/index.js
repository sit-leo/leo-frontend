import React, { useState } from 'react';
import { connect } from 'react-redux';


import WithNavbar from '../layouts/with-navbar';

import Container, { Col } from '../base/Grid';
import { FlexBetween } from '../base/Flex';
import { TitleMedium } from '../base/Text';
import Card from '../base/Card';

import Upload from './Upload';
import RankingStep from './RankingStep';
import RankingList from './RankingList';
import PositionList from './PositionList';
import ModalConfirmation from './ModalConfirmation';

const RankCouter = ({ counter }) => (
  <TitleMedium className="text-center">
    {`${counter}`}
    <br />
    {'Your Rank'}
  </TitleMedium>
);

export const RankingPage = ({
  ranks = [],
}) => {
  const [step, handleStep] = useState(0);
  const [isOpenConfirm, toggleConfirm] = useState(false);

  return (
    <WithNavbar>
      <Container className="py-5">
        <Card>
          <Col>
            <RankingStep step={step} />
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
            { step === 0 && (<PositionList />) }
            { step === 1
              && (
                <RankingList
                  ranks={ranks}
                  isOpenConfirm={isOpenConfirm}
                  toggleConfirm={toggleConfirm}
                />
              )
            }
            { step === 2 && (<Upload />) }
          </Col>
        </Card>
      </Container>
      <ModalConfirmation isOpenConfirm={isOpenConfirm} toggleConfirm={toggleConfirm} />
    </WithNavbar>
  );
};

const mapStateToProps = state => ({
  match: state.match.match,
  ranks: state.applicant.ranks,
});

export default connect(mapStateToProps)(RankingPage);
