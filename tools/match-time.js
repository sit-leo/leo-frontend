import dayjs from 'dayjs';

const TODAY = dayjs();

function isCanJoinMatch(startJoiningDate, endJoiningDate) {
  return !TODAY.isAfter(endJoiningDate) && !TODAY.isBefore(startJoiningDate);
}

export default isCanJoinMatch;

export function isApplicantCanRanking(applicantRankingTime) {
  return !TODAY.isAfter(applicantRankingTime);
}

export function isRecruiterCanRanking(applicantRankingTime, recruiterRankingTime) {
  return TODAY.isAfter(applicantRankingTime) && !TODAY.isAfter(recruiterRankingTime);
}

export function isAnnouceDate(annouceDate) {
  return TODAY.isSame(annouceDate) || TODAY.isAfter(annouceDate);
}

export function convertDatePeriod(startDate, endDate) {
  const startDateFormat = dayjs(startDate);
  const endDateFormat = dayjs(endDate);
  if (startDateFormat.year() === endDateFormat.year()) {
    if (startDateFormat.month() === endDateFormat.month()) {
      return `${startDateFormat.format('DD')} - ${endDateFormat.format('DD MMMM YYYY')}`;
    }
    return `${startDateFormat.format('DD MMMM')} - ${endDateFormat.format('DD MMMM YYYY')}`;
  }
  return `${startDateFormat.format('DD MMMM YYYY')} - ${endDateFormat.format('DD MMMM YYYY')}`;
}

export function getNextDay(joiningDate) {
  const day = dayjs(joiningDate);
  return day.add('1', 'day');
}
