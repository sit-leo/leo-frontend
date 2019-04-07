import Router from 'next/router';

import env from '../../config/env';

import request from '../../tools/request';

const MATCH_API = env.public.matchingApi;
export function getMatchByMatchId(matchId) {
  return request.get(`${MATCH_API}/matches/${matchId}`)
    .then(({ data: match }) => match);
}

export function getPositionsByMatchId(matchId) {
  return request.get(`${MATCH_API}/matches/${matchId}/positions`)
    .then(({ data: positions }) => positions);
}
