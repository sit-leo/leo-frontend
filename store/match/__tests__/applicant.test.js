import ApplicantReducer from '../applicant';

describe('Test Applicant Reducer', () => {
  it('Test addRank should return ranks that include added rank.', (done) => {
    const position = { id: 1, name: 'Software Developer' };
    const action = { type: 'leo/match/add/rank', position };

    const store = ApplicantReducer({ ranks: [] }, action);

    expect(store).toEqual({ ranks: [{ position, positionId: position.id, sequence: 1 }] });
    done();
  });

  it('Test addRank with same rank should not added rank.', (done) => {
    const position = {
      id: 1, name: 'Software Developer', positionId: 1, sequence: 1,
    };
    const action = { type: 'leo/match/add/rank', position };

    const store = ApplicantReducer({ ranks: [position] }, action);

    expect(store).toEqual({ ranks: [position] });
    done();
  });

  it('Test removeRank should return ranks that include added rank.', (done) => {
    const rankAdded = {
      id: 1, name: 'Software Developer', positionId: 1, sequence: 1,
    };
    const action = { type: 'leo/match/remove/rank', rank: rankAdded };

    const store = ApplicantReducer({ ranks: [rankAdded] }, action);

    expect(store).toEqual({ ranks: [] });
    done();
  });

  it('Test removeRank at rank 2 should return ranks that include added rank with valid sequence.', (done) => {
    const rankAdded1 = {
      id: 1, name: 'Software Developer', positionId: 1, sequence: 1,
    };
    const rankAdded2 = {
      id: 2, name: 'Web Developer', positionId: 1, sequence: 2,
    };
    const action = { type: 'leo/match/remove/rank', rank: rankAdded1 };

    const store = ApplicantReducer({ ranks: [rankAdded1, rankAdded2] }, action);

    expect(store).toEqual({ ranks: [{ ...rankAdded2, sequence: 1 }] });
    done();
  });

  it('Test updateRank should return ranks that changed rank sequence decrease index.', (done) => {
    const rankAdded1 = {
      id: 1, name: 'Software Developer', positionId: 1, sequence: 1,
    };
    const rankAdded2 = {
      id: 2, name: 'Web Developer', positionId: 1, sequence: 2,
    };
    const action = { type: 'leo/match/update/rank', index: 0, rank: rankAdded2 };

    const store = ApplicantReducer({ ranks: [rankAdded1, rankAdded2] }, action);

    expect(store).toEqual({ ranks: [{ ...rankAdded2, sequence: 1 }, { ...rankAdded1, sequence: 2 }] });
    done();
  });

  it('Test updateRank should return ranks that changed rank sequence by increase index.', (done) => {
    const rankAdded1 = {
      id: 1, name: 'Software Developer', positionId: 1, sequence: 1,
    };
    const rankAdded2 = {
      id: 2, name: 'Web Developer', positionId: 1, sequence: 2,
    };
    const action = { type: 'leo/match/update/rank', index: 1, rank: rankAdded1 };

    const store = ApplicantReducer({ ranks: [rankAdded1, rankAdded2] }, action);

    expect(store).toEqual({ ranks: [{ ...rankAdded2, sequence: 1 }, { ...rankAdded1, sequence: 2 }] });
    done();
  });
});
