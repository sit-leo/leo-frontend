import React from 'react';
import { connect } from 'react-redux';

import { withAuth } from '../../tools/with-auth';
import withUser from '../../tools/with-user';
import withRole, { isRecruiter } from '../../tools/with-roles';
import withJoinMatch from '../../tools/with-join-match';
import redirectError from '../../tools/redirect-error';

import { isRecruiterCanRanking } from '../../tools/match-time';

import { serverInstance } from '../../tools/request';
import cookie from '../../tools/cookie';

import matchAdapter from '../../store/match/match-adapter';
import matchingAdapter from '../../store/matching/matching-adapter';

import { setMatch } from '../../store/match';
import {
  setPosition,
  setApplicants,
  setRecruiterRanks,
  setHaveRank,
} from '../../store/matching/ranking';

import RecruiterRankingPage from '../../components/matching/RecruiterRankingPage';

class RecruiterRankingController extends React.Component {
  static async getInitialProps({
    store, query, req, res,
  }) {
    const matchRequest = matchAdapter(serverInstance(cookie.getToken(req)));
    const matchingRequest = matchingAdapter(serverInstance(cookie.getToken(req)));

    const { matchId, positionId } = query;
    const match = await matchRequest.getMatchByMatchId(matchId);

    if (match.error) {
      return redirectError({ req, res }, 'No Match Found.');
    }

    if (!isRecruiterCanRanking(match.applicantRankingEndDate, match.recruiterRankingEndDate)) {
      return redirectError({ req, res }, 'Recruiter Ranking Day not started or has ended.');
    }

    const applicants = await matchingRequest.getApplicantsByMatchIdAndPositionId(
      matchId, positionId,
    );
    const ranks = await matchingRequest.getRecruiterRankingByMatchIdAndPositionId(
      matchId, positionId,
    );

    await store.dispatch(setMatch(match));
    await store.dispatch(setPosition({ id: +positionId }));
    if (applicants && applicants.length > 0) {
      await store.dispatch(setApplicants(applicants));
    }
    if (ranks && ranks.length > 0) {
      await store.dispatch(setRecruiterRanks(ranks));
      await store.dispatch(setHaveRank(true));
    }
    return {};
  }

  render() {
    return <RecruiterRankingPage />;
  }
}

export default withJoinMatch(
  withRole(isRecruiter)(
    withUser(
      withAuth(
        connect()(RecruiterRankingController),
      ),
    ),
  ),
);
