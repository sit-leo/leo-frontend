import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Breadcrumb } from 'antd';
import {
  Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';

import WithNavbar from './with-navbar';


import {
  toggleJoinModal as toggleJoinModalAction,
} from '../../store/match/join';

import ContainerRow, { Col } from '../base/Grid';
import { SubTitleSmallWhite } from '../base/Text';
import Button, { DangerButton, SmallMainButton } from '../base/Button';
import { FlexBetween } from '../base/Flex';

const JoinMatch = ({ children, isOpenJoinModal, toggleJoinModal }) => (
  <WithNavbar>
    <ContainerRow className="my-3">
      <Col>
        <Breadcrumb>
          <Breadcrumb.Item>
            Matchings
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            Junior Programmer Match
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
          <Button onClick={() => console.log('clicked')}>
            Confirm
          </Button>
        </FlexBetween>
      </ModalFooter>
    </Modal>
  </WithNavbar>
);

const mapStateToProps = state => ({
  isOpenJoinModal: state.join.isOpenJoinModal,
});

const mapDispatchToProps = dispatch => ({
  toggleJoinModal: bindActionCreators(toggleJoinModalAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(JoinMatch);
