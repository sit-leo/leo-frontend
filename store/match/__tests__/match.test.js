import MatchReducer,
{
  setMatch, setMatchValueByAttribute,
} from '../index';

describe('Test Match Reducer', () => {
  it('Test setMatch should return match correctly.', (done) => {
    const match = { id: 1, name: 'SIT Career Day' };
    const action = setMatch(match);

    const store = MatchReducer({}, action);

    expect(store).toEqual({ match });
    done();
  });

  it('Test setMatch should return inital match when match is undefined.', (done) => {
    const match = undefined;
    const action = setMatch(match);

    const store = MatchReducer({}, action);

    expect(store).toEqual({
      match: {
        id: 0,
        name: '',
        description: '',
        startJoiningDate: null,
        endJoiningDate: null,
        applicantRankingEndDate: null,
        recruiterRankingEndDate: null,
        announceDate: null,
      },
    });
    done();
  });

  it('Test setMatchValueByAttribute should return match with define attribute.', (done) => {
    const action = setMatchValueByAttribute('name', 'Junior Programmer');

    const store = MatchReducer({}, action);

    expect(store).toEqual({
      match: {
        name: 'Junior Programmer',
      },
    });
    done();
  });
});
