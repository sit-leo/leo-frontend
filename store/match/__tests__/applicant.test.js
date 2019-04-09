import ApplicantReducer from '../applicant';

describe('Test Applicant Reducer', () => {
  it('Test addRank should return ranks that include added rank.', (done) => {
    const rank = { id: 1, name: 'Software Developer' };
    const action = { type: 'leo/match/add/rank', rank };

    const store = ApplicantReducer({ ranks: [] }, action);

    expect(store).toEqual({ ranks: [{ ...rank, positionId: rank.id, sequence: 1 }] });
    done();
  });

  it('Test addRank with same rank should not added rank.', (done) => {
    const rankAdded = {
      id: 1, name: 'Software Developer', positionId: 1, sequence: 1,
    };
    const action = { type: 'leo/match/add/rank', rank: rankAdded };

    const store = ApplicantReducer({ ranks: [rankAdded] }, action);

    expect(store).toEqual({ ranks: [rankAdded] });
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
});
