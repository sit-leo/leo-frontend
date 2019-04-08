import Router from 'next/router';

import env from '../../config/env';
import request from '../../tools/request';

const MATCH_API = env.public.matchingApi;

function redirectToRanking(matchId) {
  return Router.push(`/matches/${matchId}/ranking`);
}

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
    postApplicantRankingByMatchId(matchId, applicantRanking) {
      return adapter.post(`${MATCH_API}/matches/${matchId}/ranking`, applicantRanking)
        .then(({ status }) => status === 200 && redirectToRanking(matchId));
    },
  };
};
