import RankingReducer,
{
  ADD_APPLICANT_RANKS,
  REMOVE_APPLICANT_RANKS,
  UPDATE_APPLICANT_RANKS,
  ADD_RECRUITER_RANKS,
  REMOVE_RECRUITER_RANKS,
  UPDATE_RECRUITER_RANKS,
  removePositionFile,
  setFinished,
} from '../ranking';

describe('Test Ranking Reducer', () => {
  it('Test addApplicantRank with `Position` should return applicantRanks that include added `Position`.', (done) => {
    const position = { id: 1, positionId: 1, name: 'Software Developer' };
    const action = { type: ADD_APPLICANT_RANKS, position };

    const initState = { applicantRanks: [] };
    const store = RankingReducer(initState, action);

    const expected = { applicantRanks: [{ position, positionId: 1, sequence: 1 }] };
    expect(store).toEqual(expected);
    done();
  });

  it('Test addApplicantRank with same `Position` should not added.', (done) => {
    const position = { id: 1, positionId: 1, name: 'Software Developer' };
    const action = { type: ADD_APPLICANT_RANKS, position };

    const initState = { applicantRanks: [{ position, positionId: 1, sequence: 1 }] };
    const store = RankingReducer(initState, action);

    const expected = { applicantRanks: [{ position, positionId: 1, sequence: 1 }] };
    expect(store).toEqual(expected);
    done();
  });

  it('Test removeApplicantRank with `Position Added` should return applicantRanks that removed `Added Position`.', (done) => {
    const positionAdded = {
      position: { id: 1, name: 'Software Developer' }, positionId: 1, sequence: 1,
    };
    const action = { type: REMOVE_APPLICANT_RANKS, position: positionAdded };

    const initState = { applicantRanks: [positionAdded] };
    const store = RankingReducer(initState, action);

    const expected = { applicantRanks: [] };
    expect(store).toEqual(expected);
    done();
  });

  it('Test removeApplicantRank with `2 Positions Added` should return applicantRanks that removed `Added Position` with `Valid Sequence`.', (done) => {
    const positionAdded1 = {
      position: { id: 1, name: 'Software Developer' }, positionId: 1, sequence: 1,
    };
    const positionAdded2 = {
      position: { id: 2, name: 'Web Developer' }, positionId: 2, sequence: 2,
    };
    const action = { type: REMOVE_APPLICANT_RANKS, position: positionAdded1 };

    const initState = { applicantRanks: [positionAdded1, positionAdded2] };
    const store = RankingReducer(initState, action);

    const expected = { applicantRanks: [{ ...positionAdded2, sequence: 1 }] };
    expect(store).toEqual(expected);
    done();
  });

  it('Test updateApplicantRank with `2 Positions Added` should return applicantRanks that changed Rank Sequence from Position 2 -> 1 and Position 1 -> 2.', (done) => {
    const positionAdded1 = {
      position: { id: 1, name: 'Software Developer' }, positionId: 1, sequence: 1,
    };
    const positionAdded2 = {
      position: { id: 2, name: 'Web Developer' }, positionId: 2, sequence: 2,
    };
    const action = { type: UPDATE_APPLICANT_RANKS, index: 0, position: positionAdded2 };

    const initState = { applicantRanks: [positionAdded1, positionAdded2] };
    const store = RankingReducer(initState, action);

    const expected = {
      applicantRanks: [
        { ...positionAdded2, sequence: 1 },
        { ...positionAdded1, sequence: 2 }],
    };
    expect(store).toEqual(expected);
    done();
  });

  it('Test updateApplicantRank with `2 Positions Added` should return applicantRanks that changed Rank Sequence from Position 1 -> 2 and Position 2 -> 1.', (done) => {
    const positionAdded1 = {
      position: { id: 1, name: 'Software Developer' }, positionId: 1, sequence: 1,
    };
    const positionAdded2 = {
      position: { id: 2, name: 'Web Developer' }, positionId: 2, sequence: 2,
    };
    const action = { type: UPDATE_APPLICANT_RANKS, index: 1, position: positionAdded1 };

    const initState = { applicantRanks: [positionAdded1, positionAdded2] };
    const store = RankingReducer(initState, action);

    const expected = {
      applicantRanks: [
        { ...positionAdded2, sequence: 1 },
        { ...positionAdded1, sequence: 2 }],
    };
    expect(store).toEqual(expected);
    done();
  });

  it('Test addRecruiterRank with `Applicant Match` should return recruiterRanks that include added `Applicant Match`.', (done) => {
    const applicantMatch = { id: 1, participantId: 1 };
    const action = { type: ADD_RECRUITER_RANKS, applicantMatch };

    const initState = { recruiterRanks: [] };
    const store = RankingReducer(initState, action);

    const expected = {
      recruiterRanks: [
        { applicantMatch, participantId: applicantMatch.participantId, sequence: 1 },
      ],
    };
    expect(store).toEqual(expected);
    done();
  });

  it('Test addRecruiterRank with same `Applicant Match` should not added.', (done) => {
    const applicantMatch = { id: 1, participantId: 1 };
    const action = { type: ADD_RECRUITER_RANKS, applicantMatch };

    const initState = { recruiterRanks: [{ applicantMatch, participantId: 1, sequence: 1 }] };
    const store = RankingReducer(initState, action);

    const expected = {
      recruiterRanks: [
        { applicantMatch, participantId: 1, sequence: 1 },
      ],
    };
    expect(store).toEqual(expected);
    done();
  });

  it('Test removeRecruiterRank with `Applicant Match` should return recruiterRanks that removed `Applicant Match`.', (done) => {
    const applicantMatch = { id: 1, participantId: 1 };
    const action = { type: REMOVE_RECRUITER_RANKS, applicantMatch };

    const initState = { recruiterRanks: [{ applicantMatch, participantId: 1, sequence: 1 }] };
    const store = RankingReducer(initState, action);

    const expected = { recruiterRanks: [] };
    expect(store).toEqual(expected);
    done();
  });

  it('Test removeRecruiterRank with `Applicant Match` at rank 2 should return ranks that include added rank with valid sequence.', (done) => {
    const applicantMatchAdded1 = {
      sequence: 1, id: 1, participantId: 1, applicant: { id: 1, applicantId: 1 }, applicantMatch: { applicant: { name: 'Tae Keerati' } },
    };
    const applicantMatchAdded2 = {
      sequence: 2, id: 2, participantId: 2, applicant: { id: 2, applicantId: 2 }, applicantMatch: { applicant: { name: 'Volk Natchanon' } },
    };

    const action = { type: REMOVE_RECRUITER_RANKS, applicantMatch: applicantMatchAdded1 };

    const initState = { recruiterRanks: [applicantMatchAdded1, applicantMatchAdded2] };
    const store = RankingReducer(initState, action);

    const expected = {
      recruiterRanks: [
        { ...applicantMatchAdded2, sequence: 1 },
      ],
    };
    expect(store).toEqual(expected);
    done();
  });

  it('Test updateRecruiterRank with `2 Applicant Match Added` should return recruiterRanks that changed Rank Sequence from Applicant Match 2 -> 1 and Applicant Match 1 -> 2.', (done) => {
    const applicantMatchAdded1 = {
      sequence: 1, id: 1, participantId: 1, applicant: { id: 1, applicantId: 1 }, applicantMatch: { applicant: { name: 'Tae Keerati' } },
    };
    const applicantMatchAdded2 = {
      sequence: 2, id: 2, participantId: 2, applicant: { id: 2, applicantId: 2 }, applicantMatch: { applicant: { name: 'Volk Natchanon' } },
    };

    const action = { type: UPDATE_RECRUITER_RANKS, index: 0, applicantMatch: applicantMatchAdded2 };

    const initState = { recruiterRanks: [applicantMatchAdded1, applicantMatchAdded2] };
    const store = RankingReducer(initState, action);

    const expected = {
      recruiterRanks: [
        { ...applicantMatchAdded2, sequence: 1 },
        { ...applicantMatchAdded1, sequence: 2 }],
    };
    expect(store).toEqual(expected);
    done();
  });

  it('Test updateApplicantRank with `2 Applicant Match Added` should return recruiterRanks that changed Rank Sequence from Applicant Match 1 -> 2 and Applicant Match 2 -> 1.', (done) => {
    const applicantMatchAdded1 = {
      sequence: 1, id: 1, participantId: 1, applicant: { id: 1, applicantId: 1 }, applicantMatch: { applicant: { name: 'Tae Keerati' } },
    };
    const applicantMatchAdded2 = {
      sequence: 2, id: 2, participantId: 2, applicant: { id: 2, applicantId: 2 }, applicantMatch: { applicant: { name: 'Volk Natchanon' } },
    };

    const action = { type: UPDATE_RECRUITER_RANKS, index: 1, applicantMatch: applicantMatchAdded1 };

    const initState = { recruiterRanks: [applicantMatchAdded1, applicantMatchAdded2] };
    const store = RankingReducer(initState, action);

    const expected = {
      recruiterRanks: [
        { ...applicantMatchAdded2, sequence: 1 },
        { ...applicantMatchAdded1, sequence: 2 }],
    };
    expect(store).toEqual(expected);
    done();
  });

  it('Test removePositionFile with position that already have file should remove correctly.', () => {
    const position = {
      position: { id: 1, name: 'Software Developer' },
      positionId: 1,
      sequence: 1,
      files: [{
        id: 112,
        fileName: 'Transcript.pdf',
      }],
    };
    const action = removePositionFile(1, 112);

    const initState = { applicantRanks: [position] };
    const store = RankingReducer(initState, action);

    const expected = [{
      ...position,
      files: [],
    }];

    expect(store.applicantRanks).toEqual(expected);
  });

  it('Test setFinished should set isFinished correctly', () => {
    const action = setFinished(true);
    const initState = { isFiniseh: false };

    const store = RankingReducer(initState, action);

    expect(store.isFinished).toEqual(true);
  });
});
