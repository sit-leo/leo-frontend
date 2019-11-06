import React from 'react';
import { connect } from 'react-redux';

import { serverInstance } from '../../tools/request';
import cookie from '../../tools/cookie';

import { withAuth } from '../../tools/with-auth';
import withUser from '../../tools/with-user';

import organizationAdapter from '../../store/organization/organization-adapter';

import { setMatch, setIsCurrentMatch } from '../../store/match';
import { setApplicants, setRecruiters, setStatistics } from '../../store/organization';

import DashboardPage from '../../components/organization/DashboardPage';

class DashboardController extends React.Component {
  static async getInitialProps({
    store, query, req, res,
  }) {
    const organizationRequest = organizationAdapter(serverInstance(cookie.getToken(req)));

    const match = await organizationRequest.getCurrentMatchByOrganization();

    if (!match.error) {
      store.dispatch(setIsCurrentMatch(true));
      store.dispatch(setMatch(match));
    }

    const applicants = await organizationRequest.getApplicantsByOrganization();
    const recruiters = await organizationRequest.getRecruitersByOrganization();
    const numberOfMatches = await organizationRequest.countMatchesByOrganizer();

    store.dispatch(setApplicants(applicants));
    store.dispatch(setRecruiters(recruiters));

    store.dispatch(setStatistics({
      numberOfMatches:
        (typeof numberOfMatches === 'number') ? numberOfMatches : 0,
      numberOfApplicants: applicants.length,
      numberOfRecruiters: recruiters.length,
    }));

    return {};
  }

  render() {
    return <DashboardPage />;
  }
}

export default withUser(
  withAuth(
    connect()(DashboardController),
  ),
);
