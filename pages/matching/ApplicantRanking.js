import React from 'react';
import { connect } from 'react-redux';

import withUser from '../../tools/with-user';
import { withAuth } from '../../tools/with-auth';
import withRole, { isApplicant } from '../../tools/with-roles';
import redirectError from '../../tools/redirect-error';

import { isApplicantCanRanking } from '../../tools/match-time';
import { mapFilesToPositions } from '../../tools/ranking-utils';

import { serverInstance } from '../../tools/request';
import cookie from '../../tools/cookie';

import matchAdapter from '../../store/match/match-adapter';
import matchingAdapter from '../../store/matching/matching-adapter';
import profileAdapter from '../../store/profile/profile-adapter';

import { addApplicantFiles } from '../../store/profile';
import { setMatch } from '../../store/match';
import {
  setHaveRank,
  setPositions,
  setApplicantRanks,
} from '../../store/matching/ranking';

import ApplicantRankingPage from '../../components/matching/ApplicantRankingPage';


class ApplicantRankingController extends React.Component {
  static async getInitialProps({
    store, query, req, res,
  }) {
    const matchRequest = matchAdapter(serverInstance(cookie.getToken(req)));
    const matchingRequest = matchingAdapter(serverInstance(cookie.getToken(req)));
    const profileRequest = profileAdapter(serverInstance(cookie.getToken(req)));

    const { matchId } = query;
    const match = await matchRequest.getMatchByMatchId(matchId);

    if (match.error) {
      return redirectError({ req, res }, 'No Match Found.');
    }

    if (!isApplicantCanRanking(match.endJoiningDate, match.applicantRankingEndDate)) {
      return redirectError({ req, res }, 'Applicant Ranking Day has ended.');
    }

    await store.dispatch(setMatch(match));

    const positions = await matchingRequest.getMatchPositionsByMatchId(matchId);

    if (positions && positions.length > 0) {
      await store.dispatch(setPositions(positions));
    }

    let ranks = await matchingRequest.getApplicantRankingByMatchId(matchId);
    const files = await profileRequest.getFiles();
    await store.dispatch(addApplicantFiles(files));

    if (ranks && ranks.length > 0) {
      if (Array.isArray(files) && files.length > 0) {
        ranks = await mapFilesToPositions(ranks, files);
      }
      await store.dispatch(setApplicantRanks(ranks));
      await store.dispatch(setHaveRank(true));
    }

    return {};
  }

  render() {
    return <ApplicantRankingPage />;
  }
}

export default withRole(isApplicant)(
  withUser(
    withAuth(
      connect()(ApplicantRankingController),
    ),
  ),
);
