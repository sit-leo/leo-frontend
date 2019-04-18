// import Router from 'next/router';

import env from '../../config/env';

const MATCH_API = env.public.matchingApi;

export default adapter => ({
  getMatchByMatchId(matchId) {
    return adapter.get(`${MATCH_API}/matches/${matchId}`)
      .then(({ data: match }) => match);
  },
});
