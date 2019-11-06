import env from '../../config/env';

const MATCH_API = env.public.matchApi;

export default adapter => ({
  getCurrentMatchByOrganization() {
    return adapter.get(`${MATCH_API}/organizations/match`)
      .then(({ data: match }) => match);
  },
  getApplicantsByOrganization() {
    return adapter.get(`${MATCH_API}/organizations/applicants`)
      .then(({ data: applicants }) => applicants);
  },
  getRecruitersByOrganization() {
    return adapter.get(`${MATCH_API}/organizations/recruiters`)
      .then(({ data: recruiters }) => recruiters);
  },
});
