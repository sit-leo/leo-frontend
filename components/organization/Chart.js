import React from 'react';
import { Line } from 'react-chartjs-2';

import color from '../../config/color';

const CHART_COLORS = {
  matches: '#3794fc',
  applicantParticipant: '#9d60fb',
  recruiterParticipant: '#fb6081',
  unMatchedApplicants: '#fbd860',
  unMatchedRecruiters: '#fb8c60',
};

function generateNumbers() {
  const numbers = [];
  while (numbers.length < 12) {
    const number = Number.parseInt((Math.random() * 500), 10);
    if (number < 500 && number > 480) {
      numbers.push(number);
    }
  }
  return numbers;
}

function createDataset(label, data, borderColor) {
  return {
    label,
    borderColor,
    fill: false,
    lineTension: 0,
    backgroundColor: borderColor,
    pointBackgroundColor: color.white,
    pointBorderColor: borderColor,
    pointBorderWidth: '2',
    borderWidth: '2',
    pointHoverBackgroundColor: color.white,
    data,
  };
}

const data = {
  labels: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  datasets: [
    createDataset('Matches', generateNumbers(), CHART_COLORS.matches),
    createDataset('Applicants Participanting', generateNumbers(), CHART_COLORS.applicantParticipant),
    createDataset('Recruiters Participanting', generateNumbers(), CHART_COLORS.recruiterParticipant),
    createDataset('Unmatched Applicants', generateNumbers(), CHART_COLORS.unMatchedApplicants),
    createDataset('Unmatched Recruiters', generateNumbers(), CHART_COLORS.unMatchedRecruiters),
  ],
};

const Chart = () => (
  <Line data={data} />
);

export default Chart;
