import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Modal as DefaultModal,
  ModalHeader as DefaultModalHeader,
  ModalBody as DefaultModalBody,
  ModalFooter as DefaultModalFooter,
} from 'reactstrap';
import { FlexBetween } from './Flex';
import MainButton, { DangerButton } from './Button';

export const ModalStyled = styled(DefaultModal)`
  @media only screen and (min-width: 768px) {
    .modal-content {
      padding: 0 2.5em;
    }
  }
`;

export const ModalHeader = styled(DefaultModalHeader)`
  border-bottom: none;
`;

export const ModalBody = styled(DefaultModalBody)`
  padding-top: 0;
`;

export const ModalFooter = styled(DefaultModalFooter)`

`;

const Modal = ({
  isOpenModal,
  onClose,
  onConfirm,
  options: {
    header,
    body,
    footer,
  },
}) => (
  <ModalStyled isOpen={isOpenModal}>
    <ModalHeader className="justify-content-center">
      {header}
    </ModalHeader>
    <ModalBody className="text-center">
      {body}
    </ModalBody>
    <ModalFooter className="flex-column text-center">
      <span>
        {footer}
      </span>
      <FlexBetween className="w-100 mt-3">
        <DangerButton onClick={onClose}>
        Cancel
        </DangerButton>
        <MainButton onClick={onConfirm}>
        Confirm
        </MainButton>
      </FlexBetween>
    </ModalFooter>
  </ModalStyled>
);

Modal.propTypes = {
  isOpenModal: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  options: PropTypes.shape({
    header: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    footer: PropTypes.string.isRequired,
  }).isRequired,
};

export default Modal;
