const initialState = {
  loading: false,
  errorMessage: '',
  consultations: [],
  consultationDetails: {},
  status: '',
  isArchived: false,
  pagination: {
    page: 1,
    pageSize: 10
  },
  call: {
    loading: false,
    token: '',
    sessionId: '',
    error: ''
  }
}



const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_LAWYER_CONSULTATION_DETAILS_REQUEST':
    case 'GET_LAWYER_CONSULTATION_REQUEST': {
      return {
        ...state,
        loading: true
      };
    }
    case 'GET_LAWYER_CONSULTATION_DETAILS_SUCCESS':
    case 'GET_LAWYER_CONSULTATION_SUCCESS': {
      return {
        ...state,
        loading: false,
        ...action.payload
      };
    }
    case 'GET_LAWYER_CONSULTATION_DETAILS_FAILED':
    case 'GET_LAWYER_CONSULTATION_FAILED': {
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      };
    }
    case 'SET_CONSULTATION_STATUS': {
      return {
        ...state,
        ...action.payload
      };
    }
    case 'SET_CONSULTATION_ARCHIVED': {
      return {
        ...state,
        ...action.payload
      }
    }
    case 'SUBMIT_QUOTATION_REQUEST': {
      return {
        ...state,
        loading: true
      };
    }
    case 'SUBMIT_QUOTATION_SUCCESS': {
      return {
        ...state,
        loading: false,
        ...action.payload
      };
    }
    case 'SUBMIT_QUOTATION_FAILED': {
      return {
        ...state,
        loading: false
      };
    }
    case 'SUBMIT_CONSULTATION_NOTE_REQUEST': {
      return {
        ...state,
        loading: true
      };
    }
    case 'SUBMIT_CONSULTATION_NOTE_SUCCESS': {
      return {
        ...state,
        loading: false,
        ...action.payload
      };
    }
    case 'SUBMIT_CONSULTATION_NOTE_FAILED': {
      return {
        ...state,
        loading: false
      };
    }
    case 'MAKE_CALL_FOR_CONSULTATION_NOTE_REQUEST': {
      return {
        ...state,
        call: {
          ...state.call,
          loading: true
        }
      };
    }
    case 'SET_SESSIONS_TO_REJOIN_CALL_FOR_CONSULTATION':
    case 'MAKE_CALL_FOR_CONSULTATION_NOTE_FAILED':
    case 'MAKE_CALL_FOR_CONSULTATION_NOTE_SUCCESS': {
      return {
        ...state,
        call: {
          ...state.call,
          loading: false,
          ...action.payload
        }
      };
    }
    case 'SET_PAGE_FOR_LAWYER_CONSULTATION':
    case 'SET_PAGE_SIZE_FOR_LAWYER_CONSULTATION': {
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