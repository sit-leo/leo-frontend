import env from '../../config/env';

const MATCHING_API = env.public.matchingApi;
const MATCH_API = env.public.matchApi;
const PROFILE_API = env.public.profileApi;

export default adapter => ({
  getCurrentMatchByOrganization() {
    return adapter.get(`${MATCH_API}/organizations/match`)
      .then(({ data: match }) => match);
  },
  getApplicantsByOrganization() {
    return adapter.get(`${MATCH_API}/organization/applicants`)
      .then(({ data: applicants }) => applicants);
  },
  getRecruitersByOrganization() {
    return adapter.get(`${MATCH_API}/organization/recruiters`)
      .then(({ data: recruiters }) => recruiters);
  },
  countMatchesByOrganizer() {
    return adapter.get(`${MATCH_API}/organization/matches/count`)
      .then(({ data: count }) => count);
  },
  getNotJoinedApplicantsByOrganization() {
    return adapter.get(`${PROFILE_API}/profile/applicants`)
      .then(({ data: applicants }) => applicants);
  },
  getNotJoinedRecruitersByOrganization() {
    return adapter.get(`${PROFILE_API}/profile/recruiters`)
      .then(({ data: recruiters }) => recruiters);
  },
  addOrganizationApplicants(applicants) {
    return adapter.post(`${MATCH_API}/organization/applicants`, applicants)
      .then(({ data }) => data);
  },
  addOrganizationRecruiters(recruiters) {
    return adapter.post(`${MATCH_API}/organization/recruiters`, recruiters)
      .then(({ data }) => data);
  },
  deleteMatchById(matchId) {
    return adapter.delete(`${MATCH_API}/match/${matchId}`)
      .then(({ data }) => data);
  },
  matching(matchId) {
    return adapter.post(`${MATCHING_API}/matches/${matchId}/matching`)
      .then(({ data }) => data);
  },
});
