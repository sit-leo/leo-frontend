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
import Ranking from './Ranking';

const RankCouter = ({ counter }) => (
  <TitleMedium className="text-center">
    {`${counter}`}
    <br />
    {'Your Rank'}
  </TitleMedium>
);

export const ApplicantRanking = ({
  ranks = [],
}) => {
  const [step, handleStep] = useState(0);
  const [isOpenConfirm, toggleConfirm] = useState(false);
  return (
    <Ranking
      ranks={ranks}
      step={step}
      handleStep={handleStep}
      isOpenConfirm={isOpenConfirm}
      toggleConfirm={toggleConfirm}
    >
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
    </Ranking>
  );
};

const mapStateToProps = state => ({
  match: state.match.match,
  ranks: state.applicant.ranks,
});

export default connect(mapStateToProps)(ApplicantRanking);
