import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setIsConfirm } from '../../store/matching/ranking';

import Modal from '../base/Modal';

const Confirmation = ({
  isOpenConfirm,
  toggleConfirm,
  handleConfirm,
  setConfirm = () => {},
}) => (
  <Modal
    isOpenModal={isOpenConfirm}
    onClose={() => toggleConfirm(false)}
    onConfirm={() => setConfirm(true) && handleConfirm()}
    options={{
      header: 'Confirmation',
      body: `Are you sure to confirm this ranking?
      Please check the information before confirming.`,
      footer: `You can edit your ranking until the match starts.
      We will notificate you before the match starts.`,
    }}
  />
);

const mapDispatchToProps = dispatch => ({
  setConfirm: bindActionCreators(setIsConfirm, dispatch),
});

export default connect(null, mapDispatchToProps)(Confirmation);
