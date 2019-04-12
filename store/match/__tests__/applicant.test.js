import ApplicantReducer from '../applicant';

describe('Test Applicant Reducer', () => {
  it('Test addRank should return ranks that include added rank.', (done) => {
    const position = { id: 1, name: 'Software Developer' };
    const action = { type: 'leo/match/applicant/add/rank', position };

    const store = ApplicantReducer({ ranks: [] }, action);

    expect(store).toEqual({ ranks: [{ position, positionId: position.id, sequence: 1 }] });
    done();
  });

  it('Test addRank with same rank should not added rank.', (done) => {
    const position = {
      id: 1, name: 'Software Developer',
    };
    const action = { type: 'leo/match/applicant/add/rank', position };

    const store = ApplicantReducer({ ranks: [{ ...position, positionId: 1, sequence: 1 }] }, action);

    expect(store).toEqual({ ranks: [{ ...position, positionId: 1, sequence: 1 }] });
    done();
  });

  it('Test removeRank should return ranks that include added rank.', (done) => {
    const rankAdded = {
      position: { id: 1, name: 'Software Developer' }, positionId: 1, sequence: 1,
    };
    const action = { type: 'leo/match/applicant/remove/rank', position: rankAdded };

    const store = ApplicantReducer({ ranks: [rankAdded] }, action);

    expect(store).toEqual({ ranks: [] });
    done();
  });

  it('Test removeRank at rank 2 should return ranks that include added rank with valid sequence.', (done) => {
    const rankAdded1 = {
      position: { id: 1, name: 'Software Developer' }, positionId: 1, sequence: 1,
    };
    const rankAdded2 = {
      position: { id: 2, name: 'Web Developer' }, positionId: 2, sequence: 2,
    };
    const action = { type: 'leo/match/applicant/remove/rank', position: rankAdded1 };

    const store = ApplicantReducer({ ranks: [rankAdded1, rankAdded2] }, action);

    expect(store).toEqual({ ranks: [{ ...rankAdded2, sequence: 1 }] });
    done();
  });

  it('Test updateRank should return ranks that changed rank sequence increase from 1 to 0 index.', (done) => {
    const rankAdded1 = {
      position: { id: 1, name: 'Software Developer' }, positionId: 1, sequence: 1,
    };
    const rankAdded2 = {
      position: { id: 2, name: 'Web Developer' }, positionId: 2, sequence: 2,
    };
    const action = { type: 'leo/match/applicant/update/rank', index: 0, position: rankAdded2 };

    const store = ApplicantReducer({ ranks: [rankAdded1, rankAdded2] }, action);

    expect(store).toEqual({ ranks: [{ ...rankAdded2, sequence: 1 }, { ...rankAdded1, sequence: 2 }] });
    done();
  });

  it('Test updateRank should return ranks that changed rank sequence by decrease from 0 to 1 index.', (done) => {
    const rankAdded1 = {
      position: { id: 1, name: 'Software Developer' }, positionId: 1, sequence: 1,
    };
    const rankAdded2 = {
      position: { id: 2, name: 'Web Developer' }, positionId: 2, sequence: 2,
    };
    const action = { type: 'leo/match/applicant/update/rank', index: 1, position: rankAdded1 };

    const store = ApplicantReducer({ ranks: [rankAdded1, rankAdded2] }, action);

    expect(store).toEqual({ ranks: [{ ...rankAdded2, sequence: 1 }, { ...rankAdded1, sequence: 2 }] });
    done();
  });
});
