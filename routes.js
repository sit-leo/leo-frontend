const routes = require('next-routes');

module.exports = routes()
  .add('match/index', '/matches/:matchId')
  .add('matching/ApplicantRanking', '/matches/:matchId/applicants/ranking')
  .add('matching/RecruiterPosition', '/matches/:matchId/recruiters/positions')
  .add('matching/RecruiterRanking', '/matches/:matchId/positions/:positionId/ranking');
