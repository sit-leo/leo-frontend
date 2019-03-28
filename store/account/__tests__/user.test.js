const UserReducer = require('../user');

describe('Test User Reducer', () => {
  it('Test setUser should return user correctly.', (done) => {
    const user = { name: 'Imagine Rabbits' };

    const action = { type: 'leo/user/set', user };

    const store = UserReducer({}, action);
    expect(store).toEqual({ user });
    done();
  });
});
