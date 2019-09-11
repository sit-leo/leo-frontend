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
});
