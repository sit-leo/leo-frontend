import Router from 'next/router';

import env from '../../config/env';

const MATCHING_API = env.public.matchingApi;

function redirectToApplicantRanking(matchId) {
  return Router.push(`/matches/${matchId}/applicants/ranking`);
}

export function redirectToRecruiterRanking(matchId, positionId) {
  return Router.push(`/matches/${matchId}/positions/${positionId}/ranking`);
}

export default adapter => ({
  getMatchByMatchId(matchId) {
    return adapter.get(`${MATCHING_API}/matches/${matchId}`)
      .then(({ data: match }) => match);
  },
  getMatchPositionsByMatchId(matchId) {
    return adapter.get(`${MATCHING_API}/matches/${matchId}/positions`)
      .then(({ data: positions }) => positions);
  },
  getMatchApplicantsByMatchId(matchId) {
    return adapter.get(`${MATCHING_API}/matches/${matchId}/applicants`)
      .then(({ data: applicants }) => applicants);
  },
  postApplicantRankingByMatchId(matchId, applicantRanking) {
    return adapter.post(`${MATCHING_API}/matches/${matchId}/applicants/ranking`, applicantRanking)
      .then(({ status }) => status === 200 && redirectToApplicantRanking(matchId));
  },
  updateApplicantRankingByMatchId(matchId, applicantRanking) {
    return adapter.put(`${MATCHING_API}/matches/${matchId}/applicants/ranking`, applicantRanking)
      .then(({ status }) => status === 200 && redirectToApplicantRanking(matchId));
  },
  getApplicantRankingByMatchId(matchId) {
    return adapter.get(`${MATCHING_API}/matches/${matchId}/applicants/ranking`)
      .then(({ data: ranks }) => ranks);
  },
  getRecruiterPositionsByMatchId(matchId) {
    return adapter.get(`${MATCHING_API}/matches/${matchId}/recruiters/positions`)
      .then(({ data: positions }) => positions);
  },
  getApplicantsByMatchIdAndPositionId(matchId, positionId) {
    return adapter.get(`${MATCHING_API}/matches/${matchId}/positions/${positionId}/applicants`)
      .then(({ data: applicants }) => applicants);
  },
  getRecruiterRankingByMatchIdAndPositionId(matchId, positionId) {
    return adapter.get(`${MATCHING_API}/matches/${matchId}/recruiters/positions/${positionId}/ranking`)
      .then(({ data: ranks }) => ranks);
  },
  postRecruiterRankingByMatchIdAndPositionId(matchId, positionId, recruiterRanking) {
    return adapter.post(`${MATCHING_API}/matches/${matchId}/positions/${positionId}/ranking`, recruiterRanking)
      .then(({ status }) => status === 200);
  },
  updateRecruiterRankingByMatchIdAndPositionId(matchId, positionId, recruiterRanking) {
    return adapter.put(`${MATCHING_API}/matches/${matchId}/positions/${positionId}/ranking`, recruiterRanking)
      .then(({ status }) => status === 200);
  },
  getMatchResultByMatchId(matchId) {
    return adapter.get(`${MATCHING_API}/user/matches/${matchId}/result`)
      .then(({ data: ranks }) => ranks);
  },
  joinMatchApplicant(id) {
    return adapter.post(`${MATCHING_API}/matches/${id}/applicants/join`)
      .then(({ data: match }) => match);
  },
  joinMatchRecruiter(id, positions) {
    return adapter.post(`${MATCHING_API}/matches/${id}/recruiters/join`, positions)
      .then(({ data: match }) => match);
  },
  isJoined(id) {
    return adapter.get(`${MATCHING_API}/matches/${id}/isJoin`)
      .then(({ data: isJoined }) => isJoined);
  },
  confirmDocument(applicantRanks) {
    return adapter.post(`${MATCHING_API}/positions/documents`, applicantRanks)
      .then(({ data }) => data);
  },
});
