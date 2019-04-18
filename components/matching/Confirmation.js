import React from 'react';
import { connect } from 'react-redux';
import {
  Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';

import { FlexBetween } from '../base/Flex';
import Button, { DangerButton } from '../base/Button';


const Confirmation = ({
  isOpenConfirm,
  toggleConfirm,
  handleConfirm,
}) => (
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

export default Confirmation;
