import JoinReducer,
{
  initPosition,
  toggleJoinModal,
  TOGGLE_JOIN_MODAL,
  addRecruiterPosition,
  ADD_RECRUITER_POSITION,
  updateRecruiterPosition,
  UPDATE_RECRUITER_POSITION,
  setInputDocumentVisible,
  SET_INPUT_DOCUMENT_VISIBLE,
  setDocument,
  SET_DOCUMENT,
  addRecruiterDocument,
  ADD_RECRUITER_DOCUMENT,
  removeRecruiterDocument,
  REMOVE_RECRUITER_DOCUMENT,
} from '../join';

describe('Test Join Match Actions', () => {
  it('Test toggleJoinModal action should return type and property correctly.', () => {
    const action = toggleJoinModal(true);
    expect(action.type).toEqual(TOGGLE_JOIN_MODAL);
    expect(action.isOpenJoinModal).toEqual(true);
  });

  it('Test addRecruiterPosition action should return type and property correctly.', () => {
    const action = addRecruiterPosition();
    expect(action.type).toEqual(ADD_RECRUITER_POSITION);
  });

  it('Test updateRecruiterPosition action should return type and property correctly.', () => {
    const payload = { index: 0, attribute: 'name', value: 'Backend Developer' };
    const action = updateRecruiterPosition(payload.index, payload.attribute, payload.value);
    expect(action.type).toEqual(UPDATE_RECRUITER_POSITION);
    expect(action.payload).toEqual(payload);
  });

  it('Test setInputDocumentVisible action should return type and property correctly.', () => {
    const action = setInputDocumentVisible(true);
    expect(action.type).toEqual(SET_INPUT_DOCUMENT_VISIBLE);
    expect(action.inputDocumentVisible).toEqual(true);
  });

  it('Test setDocument action should return type and property correctly.', () => {
    const document = 'Portfolio';
    const action = setDocument(document);
    expect(action.type).toEqual(SET_DOCUMENT);
    expect(action.document).toEqual(document);
  });

  it('Test addRecruiterDocument action should return type and property correctly.', () => {
    const dataKey = 0;
    const document = 'Portfolio';
    const action = addRecruiterDocument(dataKey, document);
    expect(action.type).toEqual(ADD_RECRUITER_DOCUMENT);
    expect(action.payload.dataKey).toEqual(0);
    expect(action.payload.document).toEqual(document);
  });

  it('Test removeRecruiterDocument action should return type and property correctly.', () => {
    const dataKey = 0;
    const document = 'Portfolio';
    const action = removeRecruiterDocument(dataKey, document);
    expect(action.type).toEqual(REMOVE_RECRUITER_DOCUMENT);
    expect(action.payload.dataKey).toEqual(0);
    expect(action.payload.document).toEqual(document);
  });
});

describe('Test Join Match Reducer', () => {
  it('Test toggleJoinModal should return isOpenJoinModal correctly.', (done) => {
    const action = { type: TOGGLE_JOIN_MODAL, isOpenJoinModal: true };

    const store = JoinReducer(undefined, action);

    expect(store.isOpenJoinModal).toEqual(true);
    done();
  });

  it('Test addRecruiterPosition should return positions with initial position correctly.', (done) => {
    const action = { type: ADD_RECRUITER_POSITION };

    const store = JoinReducer(undefined, action);

    expect(store.recruiter.positions.length).toEqual(2);
    expect(store.recruiter.positions[0]).toEqual(initPosition);
    done();
  });

  it('Test updateRecruiterPosition should return positions with initial position correctly.', (done) => {
    const payload = { index: 0, attribute: 'name', value: 'Backend Developer' };
    const action = { type: UPDATE_RECRUITER_POSITION, payload };

    const store = JoinReducer(undefined, action);

    expect(store.recruiter.positions.length).toEqual(1);
    expect(store.recruiter.positions[0]).toEqual({ ...initPosition, name: payload.value });
    done();
  });

  it('Test setInputDocumentVisible should return true.', (done) => {
    const action = { type: SET_INPUT_DOCUMENT_VISIBLE, inputDocumentVisible: true };

    const store = JoinReducer(undefined, action);

    expect(store.inputDocumentVisible).toEqual(true);
    done();
  });

  it('Test setDocument should return skill correctly.', (done) => {
    const document = 'Portfolio';
    const action = { type: SET_DOCUMENT, document };

    const store = JoinReducer(undefined, action);

    expect(store.document).toEqual(document);
    done();
  });

  it('Test addRecruiterDocument should return applicant skills correctly', (done) => {
    const action1 = {
      type: ADD_RECRUITER_DOCUMENT,
      payload: { dataKey: 0, document: 'Portfolio' },
    };
    let store = JoinReducer(undefined, action1);

    const action2 = {
      type: ADD_RECRUITER_DOCUMENT,
      payload: { dataKey: 0, document: 'Personal Blog' },
    };
    store = JoinReducer(store, action2);

    const [
      resume,
      transcript,
      portfolio,
      personalBlog,
    ] = store.recruiter.positions[0].documents;

    expect(resume).toEqual('Resume');
    expect(transcript).toEqual('Transcript');
    expect(portfolio).toEqual('Portfolio');
    expect(personalBlog).toEqual('Personal Blog');
    done();
  });

  it('Test removeRecruiterDocument should return applicant skills correctly', (done) => {
    const action1 = {
      type: ADD_RECRUITER_DOCUMENT,
      payload: { dataKey: 0, document: 'Portfolio' },
    };
    let store = JoinReducer(undefined, action1);

    const action2 = {
      type: REMOVE_RECRUITER_DOCUMENT,
      payload: { dataKey: 0, document: 'Portfolio' },
    };
    store = JoinReducer(store, action2);

    const action3 = {
      type: REMOVE_RECRUITER_DOCUMENT,
      payload: { dataKey: 0, document: 'Transcript' },
    };
    store = JoinReducer(store, action3);

    const [
      resume,
      transcript,
      portfolio,
    ] = store.recruiter.positions[0].documents;

    expect(store.recruiter.positions[0].documents.length).toEqual(1);
    expect(resume).toEqual('Resume');
    expect(transcript).toEqual(undefined);
    expect(portfolio).toEqual(undefined);
    done();
  });
});
