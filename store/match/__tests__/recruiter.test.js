import RecruiterReducer from '../recruiter';

describe('Test Recruiter Reducer', () => {
  it('Test addRank should return ranks that include added rank.', (done) => {
    const applicant = { id: 1, applicantMatchId: 1 };
    const action = { type: 'leo/match/recruiter/add/rank', applicant };

    const store = RecruiterReducer({ ranks: [] }, action);

    expect(store).toEqual({ ranks: [{ applicant, applicantMatchId: applicant.id, sequence: 1 }] });
    done();
  });

  it('Test addRank with same rank should not added rank.', (done) => {
    const applicant = { id: 1, applicantMatchId: 1 };
    const action = { type: 'leo/match/recruiter/add/rank', applicant };

    const store = RecruiterReducer({ ranks: [{ applicant, applicantMatchId: applicant.id, sequence: 1 }] }, action);

    expect(store).toEqual({ ranks: [{ applicant, applicantMatchId: applicant.id, sequence: 1 }] });
    done();
  });

  it('Test removeRank should return ranks that include added rank.', (done) => {
    const applicant = { id: 1, applicantMatchId: 1 };
    const action = { type: 'leo/match/recruiter/remove/rank', applicant };

    const store = RecruiterReducer({ ranks: [{ applicant, applicantMatchId: applicant.id, sequence: 1 }] }, action);

    expect(store).toEqual({ ranks: [] });
    done();
  });

  it('Test removeRank at rank 2 should return ranks that include added rank with valid sequence.', (done) => {
    const applicant1 = {
      sequence: 1, id: 1, applicantMatchId: 1, applicant: { id: 1, applicantId: 1 },
    };
    const applicant2 = {
      sequence: 2, id: 2, applicantMatchId: 2, applicant: { id: 2, applicantId: 2 },
    };

    const action = { type: 'leo/match/recruiter/remove/rank', applicant: applicant1 };

    const store = RecruiterReducer({ ranks: [applicant1, applicant2] }, action);

    expect(store).toEqual({ ranks: [{ ...applicant2, sequence: 1 }] });
    done();
  });
});
