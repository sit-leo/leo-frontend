const routes = require('next-routes');

module.exports = routes()
  .add('matches/match', '/matches/:matchId')
  .add('ranking/applicant', '/matches/:matchId/applicants/ranking');
