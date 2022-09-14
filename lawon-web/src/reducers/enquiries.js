let initialState = {
  loading: false,
  errorMessage: "",
  enquiries: [],
  total: 0,
  submitSuccess:"",
  enquireyDetails: {},
  submittingNotes: false,
  enquiryNotes: [],
  gettingNotes: false,
  submittingReply: false,
  conversation: {},
  loadingConversation: false,
  submittingArchive: false,
  pagination: {
    page: 1,
    pageSize: 10
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_ENQUIRIES_FOR_LAWYERS_REQUEST": {
      return {
        ...state,
        loading: true,
      };
    }
    case "GET_ALL_ENQUIRIES_FOR_LAWYERS_SUCCESS": {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }
    case "GET_ALL_ENQUIRIES_FOR_LAWYERS_FAILED": {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }
    case "GET_OPEN_ENQUIRIES_REQUEST": {
      return {
        ...state,
        loading: true,
      };
    }
    case "GET_OPEN_ENQUIRIES_REQUEST_SUCCESS": {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }
    case "GET_OPEN_ENQUIRIES_REQUEST_FAILED": {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }
    case "GET_ARCHIVED_ENQUIRIES_REQUEST": {
      return {
        ...state,
        loading: true,
      };
    }
    case "GET_ARCHIVED_ENQUIRIES_REQUEST_SUCCESS": {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }
    case "GET_ARCHIVED_ENQUIRIES_REQUEST_FAILED": {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }
    case "GET_ENQUIRIES_DETAILS_REQUEST": {
      return {
        ...state,
        loading: true,
      };
    }
    case "GET_ENQUIRIES_DETAILS_SUCCESS": {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }
    case "GET_ENQUIRIES_DETAILS_FAILED": {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }
    case 'GET_OPEN_ENQUIRIES_FOR_LAWYERS_REQUEST': {
      return {
        ...state,
        loading: true,
        openEnquiry: {
          ...state.openEnquiry,
          ...action.payload
        }
      }
    }
    case 'GET_OPEN_ENQUIRIES_FOR_LAWYERS_FAILED':
    case 'GET_OPEN_ENQUIRIES_FOR_LAWYERS_SUCCESS': {
      return {
        ...state,
        loading: false,
        ...action.payload
      }
    }
    case 'SUBMIT_ENQUIRY_NOTE_FOR_LAWYER_REQUEST': {
      return {
        ...state,
        submittingNotes: true
      }
    }
    case 'SUBMIT_ENQUIRY_NOTE_FOR_LAWYER_FAILED':
    case 'SUBMIT_ENQUIRY_NOTE_FOR_LAWYER_SUCCESS': {
      return {
        ...state,
        submittingNotes: false
      }
    }
    case 'GET_ENQUIRY_NOTE_FOR_LAWYER_REQUEST': {
      return {
        ...state,
        gettingNotes: true
      }
    }
    case 'GET_ENQUIRY_NOTE_FOR_LAWYER_FAILED':
    case 'GET_ENQUIRY_NOTE_FOR_LAWYER_SUCCESS': {
      return {
        ...state,
        ...action.payload,
        submittingReply: false
      }
    }
    case 'SUBMIT_ENQUIRY_REPLY_FOR_LAWYER_REQUEST': {
      return {
        ...state,
        submittingReply: true
      }
    }
    case 'SUBMIT_ENQUIRY_REPLY_FOR_LAWYER_FAILED':
    case 'SUBMIT_ENQUIRY_REPLY_FOR_LAWYER_SUCCESS': {
      return {
        ...state,
        ...action.payload,
        submittingReply: false
      }
    }
    case 'GET_ENQUIRY_REPLY_FOR_LAWYER_REQUEST': {
      return {
        ...state,
        loadingConversation: true
      }
    }
    case 'GET_ENQUIRY_REPLY_FOR_LAWYER_FAILED':
    case 'GET_ENQUIRY_REPLY_FOR_LAWYER_SUCCESS': {
      return {
        ...state,
        ...action.payload,
        loadingConversation: false
      }
    }
    case 'MARK_ENQUIRY_AS_ARCHIVED_FOR_LAWYER_REQUEST': {
      return {
        ...state,
        submittingArchive: true
      }
    }
    case 'MARK_ENQUIRY_AS_ARCHIVED_FOR_LAWYER_FAILED':
    case 'MARK_ENQUIRY_AS_ARCHIVED_FOR_LAWYER_SUCCESS': {
      return {
        ...state,
        ...action.payload,
        submittingArchive: false
      }
    }
    case 'GET_ARCHIVED_ENQUIRIES_FOR_LAWYER_REQUEST': {
      return {
        ...state,
        loading: true
      }
    }
    case 'GET_ARCHIVED_ENQUIRIES_FOR_LAWYER_FAILED':
    case 'GET_ARCHIVED_ENQUIRIES_FOR_LAWYER_SUCCESS': {
      return {
        ...state,
        loading: false,
        ...action.payload
      }
    }
    case 'SET_PAGE_SIZE_FOR_LAWYER_ENQUIRY':
    case 'SET_PAGE_FOR_LAWYER_ENQUIRY': {
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
};

export default reducer;
