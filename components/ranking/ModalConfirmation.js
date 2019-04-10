import React from 'react';
import { connect } from 'react-redux';
import {
  Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';

import { clientInstance } from '../../tools/request';

import adapter from '../../store/match/match-adapter';
import { FlexBetween } from '../base/Flex';
import Button, { DangerButton } from '../base/Button';

const matchAdapter = adapter(clientInstance());

const ModalConfirmation = ({
  match, ranks, isUpdateRank,
  isOpenConfirm, toggleConfirm,
}) => {
  function handleConfirm() {
    if (!isUpdateRank) {
      matchAdapter.postApplicantRankingByMatchId(match.id, ranks);
    } else {
      matchAdapter.updateApplicantRankingByMatchId(match.id, ranks);
    }
    toggleConfirm(false);
  }
  return (
    <Modal isOpen={isOpenConfirm}>
      <ModalHeader className="justify-content-center">Confirmation</ModalHeader>
      <ModalBody className="text-center">
      Are you sure to confirm this ranking?
      Please check the information before confirming.
      </ModalBody>
      <ModalFooter className="flex-column text-center">
        <span>
        You can edit your ranking until the match starts.
        We will notificate you before the match starts.
        </span>
        <FlexBetween className="w-100 mt-3">
          <DangerButton onClick={() => toggleConfirm(!isOpenConfirm)}>
        Cancel
          </DangerButton>
          <Button onClick={handleConfirm}>
        Confirm
          </Button>
        </FlexBetween>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = state => ({
  match: state.match.match,
  ranks: state.applicant.ranks,
  isUpdateRank: state.applicant.isUpdateRank,
});

export default connect(mapStateToProps)(ModalConfirmation);
