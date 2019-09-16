// 22-06-2019
// 23-01-2020

// 12-02-2019
// 12-04-2019

// 12-05-2019
// 23-05-2019

import { convertDatePeriod } from '../match-time';

describe('Test function convertdate', () => {
  it('Test date format with different year.', () => {
    const startDate = '2019-06-22T00:00:00.000+0000';
    const endDate = '2020-01-23T00:00:00.000+0000';

    const result = convertDatePeriod(startDate, endDate);

    expect(result).toEqual('22 June 2019 - 23 January 2020');
  });

  it('Test date format with different month same year', () => {
    const startDate = '2019-02-12T00:00:00.000+0000';
    const endDate = '2019-04-12T00:00:00.000+0000';

    const result = convertDatePeriod(startDate, endDate);

    expect(result).toEqual('12 February - 12 April 2019');
  });

  it('Test date format with same month and year', () => {
    const startDate = '2019-05-12T00:00:00.000+0000';
    const endDate = '2019-05-23T00:00:00.000+0000';

    const result = convertDatePeriod(startDate, endDate);

    expect(result).toEqual('12 - 23 May 2019');
  });
});
