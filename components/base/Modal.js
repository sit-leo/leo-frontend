import React from 'react';
import styled from 'styled-components';
import {
  Modal as DefaultModal,
  ModalHeader as DefaultModalHeader,
  ModalBody as DefaultModalBody,
  ModalFooter as DefaultModalFooter,
} from 'reactstrap';

const Modal = styled(DefaultModal)`
  @media only screen and (min-width: 768px) {
    .modal-content {
      padding: 0 2.5em;
    }
  }
`;

export default Modal;

export const ModalHeader = styled(DefaultModalHeader)`
  border-bottom: none;
`;

export const ModalBody = styled(DefaultModalBody)`
  padding-top: 0;
`;

export const ModalFooter = styled(DefaultModalFooter)`

`;
