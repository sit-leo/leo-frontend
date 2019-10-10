export const initPosition = {
  name: '',
  money: '',
  capacity: 1,
  description: '',
  documents: ['Resume', 'Transcript'],
};

export const initState = {
  joined: false,
  isOpenJoinModal: false,
  recruiter: {
    positions: [initPosition],
  },
};

export const SET_JOINED = 'MATCH/SET_JOINED';

export const TOGGLE_JOIN_MODAL = 'MATCH/TOGGLE_JOIN_MODAL';
export const SET_INPUT_DOCUMENT_VISIBLE = 'MATCH/SET_INPUT_DOCUMENT_VISIBLE';
export const SET_DOCUMENT = 'MATCH/SET_DOCUMENT';

export const ADD_RECRUITER_POSITION = 'MATCH/ADD_RECRUITER_POSITION';
export const UPDATE_RECRUITER_POSITION = 'MATCH/UPDATE_RECRUITER_POSITION';
export const ADD_RECRUITER_DOCUMENT = 'MATCH/ADD_RECRUITER_DOCUMENT';
export const REMOVE_RECRUITER_DOCUMENT = 'MATCH/REMOVE_RECRUITER_DOCUMENT';

export default function reducer(state = initState, action = {}) {
  switch (action.type) {
    case TOGGLE_JOIN_MODAL: {
      return { ...state, isOpenJoinModal: action.isOpenJoinModal };
    }
    case ADD_RECRUITER_POSITION: {
      const positions = [...state.recruiter.positions, initPosition];
      return { ...state, recruiter: { ...state.recruiter, positions } };
    }
    case UPDATE_RECRUITER_POSITION: {
      const { payload: { index, value, attribute } } = action;
      const position = {
        ...state.recruiter.positions[index],
        [attribute]: value,
      };
      const positions = [...state.recruiter.positions];
      positions.splice(index, 1, position);
      return { ...state, recruiter: { ...state.recruiter, positions } };
    }
    case SET_INPUT_DOCUMENT_VISIBLE: {
      return { ...state, inputDocumentVisible: action.inputDocumentVisible };
    }
    case SET_DOCUMENT: {
      return { ...state, document: action.document };
    }
    case SET_JOINED: {
      return { ...state, joined: action.joined };
    }
    case ADD_RECRUITER_DOCUMENT: {
      const { payload: { dataKey, document } } = action;
      const { documents } = state.recruiter.positions[dataKey];
      if (document && documents.indexOf(document) === -1) {
        const position = { ...state.recruiter.positions[dataKey], documents: [...documents, document] };
        const positions = [...state.recruiter.positions];
        positions.splice(dataKey, 1, position);
        return { ...state, recruiter: { ...state.recruiter, positions } };
      }
      return { ...state };
    }
    case REMOVE_RECRUITER_DOCUMENT: {
      const { payload: { dataKey } } = action;
      const documents = state.recruiter.positions[dataKey].documents.filter(document => document !== action.payload.document);
      const position = { ...state.recruiter.positions[dataKey], documents };
      const positions = [...state.recruiter.positions];
      positions.splice(dataKey, 1, position);
      return { ...state, recruiter: { ...state.recruiter, positions } };
    }
    default: return { ...state };
  }
}

export function toggleJoinModal(isOpenJoinModal) {
  return { type: TOGGLE_JOIN_MODAL, isOpenJoinModal };
}

export function addRecruiterPosition() {
  return { type: ADD_RECRUITER_POSITION };
}

export function updateRecruiterPosition(index, attribute, value) {
  return { type: UPDATE_RECRUITER_POSITION, payload: { index, attribute, value } };
}

export function setInputDocumentVisible(inputDocumentVisible) {
  return { type: SET_INPUT_DOCUMENT_VISIBLE, inputDocumentVisible };
}

export function setDocument(document) {
  return { type: SET_DOCUMENT, document };
}

export function addRecruiterDocument(dataKey, document) {
  return { type: ADD_RECRUITER_DOCUMENT, payload: { dataKey, document } };
}

export function removeRecruiterDocument(dataKey, document) {
  return { type: REMOVE_RECRUITER_DOCUMENT, payload: { dataKey, document } };
}

export function setJoined(joined) {
  return { type: SET_JOINED, joined };
}
