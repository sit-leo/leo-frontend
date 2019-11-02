// import Router from 'next/router';

import env from '../../config/env';

const MATCH_API = env.public.matchApi;

export default adapter => ({
  getMatchByMatchId(matchId) {
    return adapter.get(`${MATCH_API}/matches/${matchId}`)
      .then(({ data: match }) => match);
  },
  getCurrentMatches() {
    return adapter.get(`${MATCH_API}/user/matches?status=current`)
      .then(({ data: matches }) => matches);
  },
  getEndedMatches() {
    return adapter.get(`${MATCH_API}/user/matches?status=ended`)
      .then(({ data: matches }) => matches);
  },
  getLastchanceMatches(page) {
    return adapter.get(`${MATCH_API}/matches/last-chance?page=${page}`)
      .then(({ data: matches }) => matches);
  },
  getPopularMatches(page) {
    return adapter.get(`${MATCH_API}/matches/popular?page=${page}`)
      .then(({ data: matches }) => matches);
  },
  getLastestMatches(page) {
    return adapter.get(`${MATCH_API}/matches/lastest?page=${page}`)
      .then(({ data: matches }) => matches);
  },
  createMatch(match) {
    return adapter.post(`${MATCH_API}/match`, match)
      .then(({ data }) => data);
  },
  updateMatch(match) {
    return adapter.post(`${MATCH_API}/match`, match)
      .then(({ data }) => data);
  },
  getCurrentMatchByOrganization() {
    return adapter.get(`${MATCH_API}/organizations/match`)
      .then(({ data: match }) => match);
  },
});
