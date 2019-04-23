// import Router from 'next/router';

import env from '../../config/env';

const MATCH_API = env.public.matchApi;

export default adapter => ({
  getMatchByMatchId(matchId) {
    return adapter.get(`${MATCH_API}/matches/${matchId}`)
      .then(({ data: match }) => match);
  },
  getCurrentMatchByStatus(status) {
    return adapter.get(`${MATCH_API}/matches?status=${status}`)
      .then(({ data: matches }) => matches);
  },
  getEndedMatchByStatus(status) {
    return adapter.get(`${MATCH_API}/matches?status=${status}`)
      .then(({ data: matches }) => matches);
  },
});
