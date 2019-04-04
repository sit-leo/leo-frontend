const routes = require('next-routes');

module.exports = routes()
  .add('matches/match', '/matches/:matchId')
  .add('ranking', '/matches/:matchId/ranking');
