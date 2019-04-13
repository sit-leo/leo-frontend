const routes = require('next-routes');

module.exports = routes()
  .add('matches/match', '/matches/:matchId')
  .add('ranking/applicant', '/matches/:matchId/applicants/ranking')
  .add('matches/position', '/matches/:matchId/recruiters/positions')
  .add('ranking/recruiter', '/matches/:matchId/positions/:positionId/ranking');
