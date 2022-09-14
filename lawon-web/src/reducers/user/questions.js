const initialState = {
  loading: false,
  errorMessage: "",
  questions: [],
  total: 0,
  status: '',
  questionsDetails: {},
  conversation: {},
  pagination: {
    page: 1,
    pageSize: 10
  },
  askQuestion: {
    categoryLoading: false,
    subcategoryLoading: false,
    categories: [],
    subcategories: [],
    newQuestion: {},
    selectedCategory: '',
    selectedSubcategory: ''
  },
  enquiryConsultation: {
    loading: true,
    freeIntervals: []
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CONVERSATIONS_FOR_QUESTION_REQUEST':
    case 'CLOSE_CONVERSATION_FOR_QUESTION_REQUEST':
    case "GET_USER_QUESTION_REQUEST": {
      return {
        ...state,
        loading: true
      };
    }
    case 'GET_CONVERSATIONS_FOR_QUESTION_SUCCESS':
    case 'CLOSE_CONVERSATION_FOR_QUESTION_SUCCESS':
    case "GET_USER_QUESTION_SUCCESS": {
      return {
        ...state,
        loading: false,
        ...action.payload
      };
    }
    case 'GET_CONVERSATIONS_FOR_QUESTION_FAILED':
    case 'CLOSE_CONVERSATION_QUESTION_FAILED':
    case "GET_USER_QUESTION_FAILED": {
      return {
        ...state,
        loading: false
      };
    }
    case "MARK_AS_CLOSE_QUESTION_REQUEST": {
      return {
        ...state,
        loading: true
      };
    }
    case "MARK_AS_CLOSE_SUCCESS": {
      return {
        ...state,
        loading: false
      };
    }
    case "MARK_AS_CLOSE_FAILED": {
      return {
        ...state,
        loading: false,
        ...action.payload
      };
    }
    case "GET_DETAILS_FOR_QUESTION_REQUEST": {
      return {
        ...state,
        loading: true
      };
    }
    case "GET_DETAILS_FOR_QUESTION_SUCCESS": {
      return {
        ...state,
        loading: false,
        ...action.payload
      };
    }
    case "GET_DETAILS_FOR_QUESTION_FAILED": {
      return {
        ...state,
        loading: false
      };
    }

    case "GET_CATEGORY_FOR_QURSTIONS_REQUEST": {
      return {
        ...state,
        askQuestion: {
          ...state.askQuestion,
          categoryLoading: true
        }
      };
    }
    case "GET_CATEGORY_FOR_QURSTIONS_SUCCESS": {
      return {
        ...state,
        askQuestion: {
          ...state.askQuestion,
          ...action.payload,
          categoryLoading: false
        }
      };
    }
    case "GET_CATEGORY_FOR_QURSTIONS_FAILED": {
      return {
        ...state,
        askQuestion: {
          ...state.askQuestion,
          categoryLoading: false
        }
      };
    }
    case "GET_SUBCATEGORY_FOR_QURSTIONS_REQUEST": {
      return {
        ...state,
        askQuestion: {
          ...state.askQuestion,
          subcategoryLoading: true
        }
      };
    }
    case "GET_SUBCATEGORY_FOR_QURSTIONS_SUCCESS": {
      return {
        ...state,
        askQuestion: {
          ...state.askQuestion,
          ...action.payload,
          subcategoryLoading: false
        }
      };
    }
    case "GET_SUBCATEGORY_FOR_QURSTIONS_FAILED": {
      return {
        ...state,
        askQuestion: {
          ...state.askQuestion,
          subcategoryLoading: false
        }
      };
    }
    case "SUBMIT_FOR_QURSTIONS_REQUEST": {
      return {
        ...state,
        loading: true
      };
    }
    case "SUBMIT_FOR_QURSTIONS_SUCCESS": {
      return {
        ...state,
        loading: false,
        askQuestion: {
          ...state.askQuestion,
          ...action.payload
        }
      };
    }
    case "SUBMIT_FOR_QURSTIONS_FAILED": {
      return {
        ...state,
        loading: false,
        ...action.payload
      };
    }
    case "CLEAR_NEW_QUESTION_FOR_AFTER_SUBMIT": {
      return {
        ...state,
        askQuestion: {
          ...state.askQuestion,
          newQuestion: {}
        }
      };
    }
    case "USER_REPLY_REQUEST": {
      return {
        ...state,
        loading: true
      };
    }
    case "USER_REPLY_SUCCESS": {
      return {
        ...state,
        loading: false,
        questionsDetails: {
          ...state.questionsDetails,
          ...action.payload
        }
      };
    }
    case "USER_REPLY_FAILED": {
      return {
        ...state,
        loading: false,
        ...action.payload
      };
    }
    case 'GET_FREE_INTERVALS_FOR_ENQUIRY_CONSULTATION_REQUEST': {
      return {
        ...state,
        enquiryConsultation: {
          ...state.enquiryConsultation,
          loading: true
        }
      }
    }
    case 'GET_FREE_INTERVALS_FOR_ENQUIRY_CONSULTATION_FAILED':
    case 'GET_FREE_INTERVALS_FOR_ENQUIRY_CONSULTATION_SUCCESS': {
      return {
        ...state,
        enquiryConsultation: {
          ...state.enquiryConsultation,
          loading: false,
          ...action.payload
        }
      }
    }
    case 'SET_PAGE_FOR_USER_QUESTIONS': {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...action.payload
        }
      }
    }
    case 'SET_STATUS_FILTER_FOR_QUESTION': {
      return {
        ...state,
        ...action.payload
      }
    }
    case 'SET_SELECTED_CATEGORY_SUBCATEGORY_FOR_ASK_QUESTION': {
      return {
        ...state,
        askQuestion: {
          ...state.askQuestion,
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
