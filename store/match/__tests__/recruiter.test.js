import RecruiterReducer from '../recruiter';

describe('Test Recruiter Reducer', () => {
  it('Test addRank should return ranks that include added rank.', (done) => {
    const applicant = { id: 1, applicantId: 1 };
    const action = { type: 'leo/match/recruiter/add/rank', applicant };

    const store = RecruiterReducer({ ranks: [] }, action);

    expect(store).toEqual({ ranks: [{ applicant, applicantMatchId: applicant.id, sequence: 1 }] });
    done();
  });

  it('Test addRank with same rank should not added rank.', (done) => {
    const applicant = { id: 1, applicantId: 1 };
    const action = { type: 'leo/match/recruiter/add/rank', applicant };

    const store = RecruiterReducer({ ranks: [{ applicant, applicantMatchId: applicant.id, sequence: 1 }] }, action);

    expect(store).toEqual({ ranks: [{ applicant, applicantMatchId: applicant.id, sequence: 1 }] });
    done();
  });
});
