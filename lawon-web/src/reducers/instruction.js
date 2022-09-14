const initialState = {
  loading: false,
  errorMessage: '',
  instructions: [],
  newNotes: '',
  total: 0,
  pagination: {
    page: 1,
    pageSize: 10
  },
  status: '',
  isArchived: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MARK_INSTRUCTION_AS_COMPLETE_REQUEST':
    case 'GET_LAWYER_INSTRUCTION_BY_ID_REQUEST':
    case 'GET_LAWYER_INSTRUCTION_REQUEST': {
      return {
        ...state,
        loading: true
      };
    }
    case 'MARK_INSTRUCTION_AS_COMPLETE_SUCCESS':
    case 'GET_LAWYER_INSTRUCTION_BY_ID_SUCCESS':
    case 'GET_LAWYER_INSTRUCTION_SUCCESS': {
      return {
        ...state,
        loading: false,
        ...action.payload
      };
    }
    case 'MARK_INSTRUCTION_AS_COMPLETE_FAILED':
    case 'GET_LAWYER_INSTRUCTION_BY_ID_FAILED':
    case 'GET_LAWYER_INSTRUCTION_FAILED': {
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      };
    }
    case 'SUBMIT_INSTRUCTION_NOTE_REQUEST': {
      return {
        ...state,
        loading: true
      };
    }
    case 'SUBMIT_INSTRUCTION_NOTE_SUCCESS': {
      return {
        ...state,
        loading: false,
        ...action.payload
      };
    }
    case 'SUBMIT_INSTRUCTION_NOTE_FAILED': {
      return {
        ...state,
        loading: true
      }
    }
    case 'SET_PAGE_FOR_LAWYER_INSTRUCTIONS': {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...action.payload
        }
      }
    }
    default: {
      return state;
    }
  }
}

export default reducer;