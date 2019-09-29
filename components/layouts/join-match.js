import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import WithNavbar from './with-navbar';


import {
  toggleJoinModal as toggleJoinModalAction,
} from '../../store/matching/join';

import ContainerRow, { Col } from '../base/Grid';
import { SubTitleSmallWhite } from '../base/Text';
import Button, { DangerButton, SmallMainButton } from '../base/Button';
import { FlexBetween } from '../base/Flex';
import Modal, { ModalHeader, ModalBody, ModalFooter } from '../base/Modal';
import { BreadcrumbList } from '../base/Breadcrumb';

const JoinMatch = ({
  children,
  match,
  isOpenJoinModal,
  toggleJoinModal,
  handleConfirm = () => {},
}) => (
  <WithNavbar>
    <ContainerRow className="my-3">
      <Col>
        <BreadcrumbList
          items={[
            { url: '/', name: 'Matches' },
            { url: `/matches/${match.id}`, name: match.name || 'Default Match Name' },
            { name: 'Join Matching' },
          ]}
        />
      </Col>
      {children}
      <Col className="text-center my-4">
        <SmallMainButton onClick={() => toggleJoinModal(!isOpenJoinModal)}>
          <SubTitleSmallWhite className="mb-0">
            Join Now
          </SubTitleSmallWhite>
        </SmallMainButton>
      </Col>
    </ContainerRow>
    <Modal isOpen={isOpenJoinModal}>
      <ModalHeader className="justify-content-center">Confirmation</ModalHeader>
      <ModalBody className="text-center">
        Are you sure to join this match?
        You won't be able to quit the match.
      </ModalBody>
      <ModalFooter className="flex-column text-center">
        <span>
        Confirm to join this match?
        Please check your information before confirm.
        </span>
        <FlexBetween className="w-100 mt-3">
          <DangerButton onClick={() => toggleJoinModal(!isOpenJoinModal)}>
            Cancel
          </DangerButton>
          <Button onClick={() => toggleJoinModal(false) && handleConfirm()}>
            Confirm
          </Button>
        </FlexBetween>
      </ModalFooter>
    </Modal>
  </WithNavbar>
);

const mapStateToProps = state => ({
  match: state.match.match,
  isOpenJoinModal: state.join.isOpenJoinModal,
});

const mapDispatchToProps = dispatch => ({
  toggleJoinModal: bindActionCreators(toggleJoinModalAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(JoinMatch);
