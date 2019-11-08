import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Alert, message } from 'antd';

import { clientInstance } from '../../tools/request';

import matchingAdapter from '../../store/matching/matching-adapter';

import {
  setLoading as setLoadingAction,
} from '../../store/global';
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
  setLoading = () => {},
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
          setLoading(true);
          handleConfirmDocument(applicantRanks)
            .then((response) => {
              if (!response.status) {
                message.success('Upload document success.');
                setFinished(true);
              } else {
                message.error('Upload document failed.');
              }
              setLoading(false);
            });
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
  setLoading: bindActionCreators(setLoadingAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToRankProps)(DocumentStep);
