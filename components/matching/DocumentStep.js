import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Alert } from 'antd';

import { clientInstance } from '../../tools/request';

import matchingAdapter from '../../store/matching/matching-adapter';

import {
  removePositionFile as removePositionFileAction,
  setFinished as setFinishedAction,
} from '../../store/matching/ranking';

import Modal from '../base/Modal';
import MainButton from '../base/Button';

import RankingCard from './RankingCard';
import Finished from './Finished';
import { getPositionInformations } from '../../tools/ranking-informations';

function handleConfirmDocument(applicantRanks) {
  const matchingRequest = matchingAdapter(clientInstance());
  return matchingRequest.confirmDocument(applicantRanks);
}

const DocumentStep = ({
  applicantRanks,
  removePositionFile = () => {},
  isFinished,
  setFinished = () => {},
}) => {
  const [isOpenConfirm, toggleConfirm] = useState(false);
  return (
    <React.Fragment>
      {
        isFinished ? (
          <Finished />
        ) : (
          <Alert
            message="Information"
            description='Please remove "unused" or "not required" document in "Show more" section before clicking "Confirm Button". Document will be uploaded to the recruiter of positions.'
            type="info"
            showIcon
          />
        )
      }
      {
        applicantRanks.map(({ position, sequence, files }, index) => (
          <RankingCard
            sequence={sequence}
            isFinished={isFinished}
            key={position.id}
            title={position.name}
            value={position.money}
            subtitle={(position.recruiter && `${position.recruiter.name}, ${position.recruiter.location}`) || '-'}
            capacity={position.capacity}
            informations={getPositionInformations(position)}
            files={files}
            actionButton={null}
            position={{
              positionId: position.id,
              removePositionFile,
            }}
          />
        ))
      }
      {
        !isFinished && (
          <div className="text-center">
            <MainButton onClick={() => toggleConfirm(true)}>Confirm Document</MainButton>
          </div>
        )
      }
      <Modal
        isOpenModal={isOpenConfirm}
        onClose={() => toggleConfirm(false)}
        onConfirm={() => {
          toggleConfirm(false);
          handleConfirmDocument(applicantRanks);
          setFinished(true);
        }}
        options={{
          header: 'Confirmation Document',
          body: `Are you sure to confirm this document?
          Please check the document before confirming.`,
          footer: 'You can\'t edit your document.',
        }}
      />
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  match: state.match.match,
  applicantRanks: state.ranking.applicantRanks,
  isFinished: state.ranking.isFinished,
});

const mapDispatchToRankProps = dispatch => ({
  removePositionFile: bindActionCreators(removePositionFileAction, dispatch),
  setFinished: bindActionCreators(setFinishedAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToRankProps)(DocumentStep);
