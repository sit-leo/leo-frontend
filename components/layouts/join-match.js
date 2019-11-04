import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import WithNavbar from './with-navbar';


import {
  toggleJoinModal as toggleJoinModalAction,
} from '../../store/matching/join';

import ContainerRow, { Col } from '../base/Grid';
import { SubTitleSmallWhite } from '../base/Text';
import { SmallMainButton } from '../base/Button';
import Modal from '../base/Modal';
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
            { url: '/matches', name: 'Matches' },
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
    <Modal
      isOpenModal={isOpenJoinModal}
      onClose={() => toggleJoinModal(!isOpenJoinModal)}
      onConfirm={() => toggleJoinModal(false) && handleConfirm()}
      options={{
        header: 'Join Match Confirmation',
        body: `Are you sure to join this match?
        You won't be able to quit the match.`,
        footer: `Confirm to join this match?
        Please check your information before confirm.`,
      }}
    />
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
