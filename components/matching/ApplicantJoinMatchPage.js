import React from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';

import { message } from 'antd';
import { clientInstance } from '../../tools/request';

import matchingAdapter from '../../store/matching/matching-adapter';
import profileAdapter from '../../store/profile/profile-adapter';

import WithJoinMatch from '../layouts/join-match';

import ApplicantProfileForm from '../profile/ApplicantProfileForm';

import { Col } from '../base/Grid';
import { TitleLarge } from '../base/Text';

const handleConfirmApplicant = async (id) => {
  const matchRequest = matchingAdapter(clientInstance());
  matchRequest.joinMatchApplicant(id).then(({
    status, error, message: errorMessage,
  }) => {
    if (!status) {
      message.success('Join match success.');
      return Router.push('/my-matches');
    }
    return message.error(`${error}, ${errorMessage}`);
  });
};

const ApplicantJoinMatchPage = ({
  match,
  applicant,
}) => (
  <WithJoinMatch
    handleConfirm={async () => {
      const profileRequest = profileAdapter(clientInstance());
      await profileRequest.updateApplicantProfile(applicant);
      await handleConfirmApplicant(match.id);
    }}
  >
    <Col>
      <TitleLarge className="my-2">{match.name}</TitleLarge>
    </Col>
    <ApplicantProfileForm editable={false} />
  </WithJoinMatch>
);

const mapStateToProps = state => ({
  match: state.match.match,
  applicant: state.profile.applicant,
});

export default connect(mapStateToProps)(ApplicantJoinMatchPage);
