import dayjs from 'dayjs';

const TODAY = dayjs();

function isCanJoinMatch(joinMatchTime) {
  return TODAY.isBefore(joinMatchTime);
}

export default isCanJoinMatch;

export function isApplicantCanRanking(applicantRankingTime) {
  return TODAY.isBefore(applicantRankingTime);
}

export function isRecruiterCanRanking(applicantRankingTime, recruiterRankingTime) {
  return TODAY.isAfter(applicantRankingTime) && TODAY.isBefore(recruiterRankingTime);
}

export function isCanSummarize(summaryTime) {
  return TODAY.isBefore(summaryTime);
}
