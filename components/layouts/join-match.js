import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Breadcrumb } from 'antd';

import WithNavbar from './with-navbar';


import {
  toggleJoinModal as toggleJoinModalAction,
} from '../../store/matching/join';

import ContainerRow, { Col } from '../base/Grid';
import { SubTitleSmallWhite } from '../base/Text';
import Button, { DangerButton, SmallMainButton } from '../base/Button';
import { FlexBetween } from '../base/Flex';
import Modal, { ModalHeader, ModalBody, ModalFooter } from '../base/Modal';

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
        <Breadcrumb>
          <Breadcrumb.Item>
            Matchings
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            { match.name }
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            Join Matching
          </Breadcrumb.Item>
        </Breadcrumb>
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
        Go to profile to edit information.
        Are you sure to leave this page?
      </ModalBody>
      <ModalFooter className="flex-column text-center">
        <span>
          Your filled information will be saved before leaving this page.
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
