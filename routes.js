const routes = require('next-routes');

module.exports = routes()
  .add('match/index', '/matches/:matchId')
  .add('match/MyMatches', '/my-matches')
  .add('organization/Dashboard', '/organizations/dashboard')
  .add('organization/AddApplicant', '/organizations/applicants/add')
  .add('organization/AddRecruiter', '/organizations/recruiters/add')
  .add('organization/Matches', '/organizations/matches')
  .add('matching/ApplicantJoinMatch', '/matches/:matchId/applicants/join')
  .add('matching/RecruiterJoinMatch', '/matches/:matchId/recruiters/join')
  .add('matching/ApplicantRanking', '/matches/:matchId/applicants/ranking')
  .add('matching/RecruiterPosition', '/matches/:matchId/recruiters/positions')
  .add('matching/RecruiterRanking', '/matches/:matchId/positions/:positionId/ranking')
  .add('matching/RecruiterPositionMatchResult', '/matches/:matchId/result/positions')
  .add('matching/ApplicantMatchResult', '/matches/:matchId/result')
  .add('matching/PositionMatchResult', '/matches/:matchId/positions/:positionId/result')
  .add('user/Login', '/login')
  .add('profile/Profile', '/profile');
