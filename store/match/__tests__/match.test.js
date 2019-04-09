import MatchReducer from '../index';

describe('Test Match Reducer', () => {
  it('Test setMatch should return match correctly.', (done) => {
    const match = { id: 1, name: 'SIT Career Day' };
    const action = { type: 'leo/match/set/match', match };

    const store = MatchReducer({}, action);

    expect(store).toEqual({ match });
    done();
  });

  it('Test setMatch should return inital match when match is undefined.', (done) => {
    const match = undefined;
    const action = { type: 'leo/match/set/match', match };

    const store = MatchReducer({}, action);

    expect(store).toEqual({ match: { id: 0, name: 'No Match Found' } });
    done();
  });
});
