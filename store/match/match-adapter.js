import Router from 'next/router';

import env from '../../config/env';
import request from '../../tools/request';

const MATCH_API = env.public.matchingApi;

export default (instance) => {
  const adapter = request(instance);
  return {
    getMatchByMatchId(matchId) {
      return adapter.get(`${MATCH_API}/matches/${matchId}`)
        .then(({ data: match }) => match);
    },
    getPositionsByMatchId(matchId) {
      return adapter.get(`${MATCH_API}/matches/${matchId}/positions`)
        .then(({ data: positions }) => positions);
    },
  };
};
