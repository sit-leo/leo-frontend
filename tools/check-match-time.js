import dayjs from 'dayjs';

const TODAY = dayjs();

function isCanJoinMatch(joinMatchTime) {
  return TODAY.isBefore(joinMatchTime);
}

export default isCanJoinMatch;

export function isCanRanking(rankingTime) {
  return TODAY.isBefore(rankingTime);
}

export function isCanSummarize(summaryTime) {
  return TODAY.isBefore(summaryTime);
}
