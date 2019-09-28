import React from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';

import { message } from 'antd';
import { clientInstance } from '../../tools/request';

import matchingAdapter from '../../store/matching/matching-adapter';

import WithJoinMatch from '../layouts/join-match';

import ApplicantProfileForm from '../profile/ApplicantProfileForm';

import { Col } from '../base/Grid';
import { TitleLarge } from '../base/Text';

const handleConfirmApplicant = async (id) => {
  const matchRequest = matchingAdapter(clientInstance());
  matchRequest.joinMatchApplicant(id).then(({
    status, error, message: errorMessage,
  }) => {
    if (status === 200) {
      message.success('Join match success.');
      return Router.push(`/matches/${id}/applicants/ranking`);
    }
    return message.error(`${error}, ${errorMessage}`);
  });
};

const ApplicantJoinMatchPage = ({
  match,
}) => (
  <WithJoinMatch
    handleConfirm={() => handleConfirmApplicant(match.id)}
  >
    <Col>
      <TitleLarge className="my-2">{match.name}</TitleLarge>
    </Col>
    <ApplicantProfileForm editable={false} />
  </WithJoinMatch>
);

const mapStateToProps = state => ({
  match: state.match.match,
});

export default connect(mapStateToProps)(ApplicantJoinMatchPage);
