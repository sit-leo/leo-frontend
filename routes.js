const routes = require('next-routes');

module.exports = routes()
  .add('match/index', '/matches/:matchId')
  .add('match/MyMatches', '/my-matches')
  .add('matching/ApplicantRanking', '/matches/:matchId/applicants/ranking')
  .add('matching/RecruiterPosition', '/matches/:matchId/recruiters/positions')
  .add('matching/RecruiterRanking', '/matches/:matchId/positions/:positionId/ranking')
  .add('matching/RecruiterPositionMatchResult', '/matches/:matchId/result/positions')
  .add('matching/MatchResult', '/matches/:matchId/result')
  .add('user/Login', '/login');
