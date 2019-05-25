import dayjs from 'dayjs';

const TODAY = dayjs();

function isCanJoinMatch(joinMatchTime) {
  return !TODAY.isAfter(joinMatchTime);
}

export default isCanJoinMatch;

export function isApplicantCanRanking(applicantRankingTime) {
  return !TODAY.isAfter(applicantRankingTime);
}

export function isRecruiterCanRanking(applicantRankingTime, recruiterRankingTime) {
  return TODAY.isAfter(applicantRankingTime) && !TODAY.isAfter(recruiterRankingTime);
}

export function isAnnouceDate(annouceDate) {
  return !TODAY.isBefore(annouceDate);
}
