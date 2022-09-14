const initialState = {
  loading: false,
  errorMessage: "",
  allConsultations: [],
  total: 0,
  status: '',
  pagination: {
    page: 1,
    pageSize: 10
  },
  bookConsultation: {
    loading: false,
    categories: [],
    subcategories: [],
    subcategoryLoading: false,
    lawyers: [],
    freeIntervals: [],
    lawyer: {},
    consultation: {},
    bookingData: {}
  },
  consultationDetails: {
    loading: false,
    details: {},
  },
  consultationDocument: [],
  consultationAllDetails: [],

  enquiryConsultation: {
    loading: true,
    freeIntervals: [],
  },
  calendarEvent: {
    loading: false,
    url: ''
  },
  uploadDoc: {
    progress: 0,
    loading: false,
    loadingDelete: false
  },
  googleAddresses: {
    loading: false,
    address: []
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CONSULTATION_REQUEST": {
      return {
        ...state,
        loading: true,
      };
    }
    case "GET_CONSULTATION_SUCCESS": {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }
    case "GET_CONSULTATION_FAILED": {
      return {
        ...state,
        loading: false,
      };
    }
    case "GET_DETAILS_FOR_CONSULTATION_REQUEST": {
      return {
        ...state,
        loading: true,
      };
    }
    case "GET_DETAILS_FOR_CONSULTATION_SUCCESS": {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }
    case "GET_DETAILS_FOR_CONSULTATION_FAILED": {
      return {
        ...state,
        loading: false,
      };
    }
    case "GET_LAWYER_BY_ID_FOR_CONSULTATION_REQUEST":
    case "GET_LAWYERS_FOR_CONSULTATION_REQUEST":
    case "GET_CATEGORY_FOR_CONSULTATION_REQUEST": {
      return {
        ...state,
        bookConsultation: {
          ...state.bookConsultation,
          loading: true,
        },
      };
    }
    case "GET_LAWYER_BY_ID_FOR_CONSULTATION_FAILED":
    case "GET_LAWYER_BY_ID_FOR_CONSULTATION_SUCCESS":
    case "GET_LAWYERS_FOR_CONSULTATION_FAILED":
    case "GET_LAWYERS_FOR_CONSULTATION_SUCCESS":
    case "GET_CATEGORY_FOR_CONSULTATION_FAILED":
    case "GET_CATEGORY_FOR_CONSULTATION_SUCCESS": {
      return {
        ...state,
        bookConsultation: {
          ...state.bookConsultation,
          loading: false,
          ...action.payload,
        },
      };
    }
    case 'RESCHEDULE_CONSULTATION_FOR_USER_CONSULATION_REQUEST':
    case "GET_CONSULATTION_BY_ID_CONSULTATION_REQUEST":
    case "BOOK_CONSULATION_CONSULTATION_REQUEST":
    case "GET_FREE_INTERVALS_FOR_CONSULTATION_REQUEST":
    case "GET_LAT_LNG_FOR_CONSULTATION_REQUEST":
    case "GET_ADDRESS_FOR_CONSULTATION_REQUEST":
    case "GET_SUBCATEGORY_FOR_CONSULTATION_REQUEST": {
      return {
        ...state,
        bookConsultation: {
          ...state.bookConsultation,
          loading: true,
        },
      };
    }
    case 'RESCHEDULE_CONSULTATION_FOR_USER_CONSULATION_FAILED':
    case 'RESCHEDULE_CONSULTATION_FOR_USER_CONSULATION_SUCCESS':
    case "GET_CONSULATTION_BY_ID_CONSULTATION_FAILED":
    case "GET_CONSULATTION_BY_ID_CONSULTATION_SUCCESS":
    case "BOOK_CONSULATION_CONSULTATION_FAILED":
    case "BOOK_CONSULATION_CONSULTATION_SUCCESS":
    case "GET_FREE_INTERVALS_FOR_CONSULTATION_FAILED":
    case "GET_FREE_INTERVALS_FOR_CONSULTATION_SUCCESS":
    case "GET_LAT_LNG_FOR_CONSULTATION_FAILED":
    case "GET_LAT_LNG_FOR_CONSULTATION_SUCCESS":
    case "GET_ADDRESS_FOR_CONSULTATION_FAILED":
    case "GET_ADDRESS_FOR_CONSULTATION_SUCCESS":
    case "GET_SUBCATEGORY_FOR_CONSULTATION_FAILED":
    case "GET_SUBCATEGORY_FOR_CONSULTATION_SUCCESS": {
      return {
        ...state,
        bookConsultation: {
          ...state.bookConsultation,
          loading: false,
          ...action.payload,
        },
      };
    }
    case "CONSULTATION_UPLOAD_DOCUMENT_REQUEST": {
      return {
        ...state,
        loading: true,
      };
    }
    case "CONSULTATION_UPLOAD_DOCUMENT_SUCCESS": {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }
    case "CONSULTATION_UPLOAD_DOCUMENT_FAILED": {
      return {
        ...state,
        loading: false,
      };
    }
    case "CONSULTATION_UPDATE_PROFILE_REQUEST": {
      return {
        ...state,
        loading: true,
      };
    }
    case "CONSULTATION_UPDATE_PROFILE_SUCCESS": {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }
    case "CONSULTATION_UPDATE_PROFILE_FAILED": {
      return {
        ...state,
        loading: false,
      };
    }
    case "CONSULTATION_CALLTYPE_UPDATE_REQUEST": {
      return {
        ...state,
        loading: true,
      };
    }
    case "CONSULTATION_CALLTYPE_UPDATE_SUCCESS": {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }
    case "CONSULTATION_CALLTYPE_UPDATE_FAILED": {
      return {
        ...state,
        loading: false,
      };
    }
    case "CONSULTATION_CANCEL_REQUEST": {
      return {
        ...state,
        loading: true,
      };
    }
    case "CONSULTATION_CANCEL_SUCCESS": {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }
    case "CONSULTATION_CANCEL_FAILED": {
      return {
        ...state,
        loading: false,
      };
    }
    case "GET_FREE_INTERVALS_FOR_ENQUIRY_CONSULTATION_REQUEST": {
      return {
        ...state,
        enquiryConsultation: {
          ...state.enquiryConsultation,
          loading: true,
        },
      };
    }
    case "GET_FREE_INTERVALS_FOR_ENQUIRY_CONSULTATION_FAILED":
    case "GET_FREE_INTERVALS_FOR_ENQUIRY_CONSULTATION_SUCCESS": {
      return {
        ...state,
        enquiryConsultation: {
          ...state.enquiryConsultation,
          loading: false,
          ...action.payload,
        },
      };
    }
    case 'GET_GOOGLE_AUTH_URL_FOR_CALENDAR_REQUEST': {
      return {
        ...state,
        calendarEvent: {
          ...state.calendarEvent,
          loading: true
        }
      }
    }
    case 'GET_GOOGLE_AUTH_URL_FOR_CALENDAR_FAILED':
    case 'GET_GOOGLE_AUTH_URL_FOR_CALENDAR_SUCCESS': {
      return {
        ...state,
        calendarEvent: {
          ...state.calendarEvent,
          loading: false
        }
      }
    }
    case 'SET_PAGE_FOR_USER_CONSULTATION': {
      return{
        ...state,
        pagination: {
          ...state.pagination,
          ...action.payload
        }
      }
    }
    case 'SET_STATUS_FILTER_FOR_CONSULTATION': {
      return {
        ...state,
        ...action.payload
      }
    }
    case 'UPLOAD_CONSULTATION_ATTACHMENT_FOR_USER_CONSULATION_REQUEST': {
      return {
        ...state,
        uploadDoc: {
          ...state.uploadDoc,
          loading: true,
          progress: 0
        }
      }
    }
    case 'UPLOAD_CONSULTATION_ATTACHMENT_FOR_USER_CONSULATION_FAILED':
    case 'UPLOAD_CONSULTATION_ATTACHMENT_FOR_USER_CONSULATION_SUCCESS': {
      return {
        ...state,
        uploadDoc: {
          ...state.uploadDoc,
          loading: false,
          ...action.payload
        }
      }
    }
    case 'UPLOAD_CONSULTATION_ATTACHMENT_FOR_USER_CONSULATION_PROGRESS': {
      return {
        ...state,
        uploadDoc: {
          ...state.uploadDoc,
          ...action.payload
        }
      }
    }
    case 'DELETE_CONSULTATION_ATTACHMENT_FOR_USER_CONSULATION_REQUEST': {
      return {
        ...state,
        uploadDoc: {
          ...state.uploadDoc,
          loadingDelete: true
        }
      }
    }
    case 'DELETE_CONSULTATION_ATTACHMENT_FOR_USER_CONSULATION_FAILED':
    case 'DELETE_CONSULTATION_ATTACHMENT_FOR_USER_CONSULATION_SUCCESS': {
      return {
        ...state,
        uploadDoc: {
          ...state.uploadDoc,
          loadingDelete: false,
        }
      }
    }
    case 'GET_ADDRESS_SUGGESTIONS_FOR_CONSULTATION_REQUEST': {
      return {
        ...state,
        googleAddresses: {
          ...state.googleAddresses,
          loading: true
        }
      };
    }
    case 'GET_ADDRESS_SUGGESTIONS_FOR_CONSULTATION_FAILED':
    case 'GET_ADDRESS_SUGGESTIONS_FOR_CONSULTATION_SUCCESS': {
      return {
        ...state,
        googleAddresses: {
          ...state.googleAddresses,
          loading: false,
          ...action.payload
        }
      };
    }
    case 'SET_BOOK_CONSUTATION_DATA_FOR_USER_CONSULTATION': {
      return {
        ...state,
        bookConsultation: {
          ...state.bookConsultation,
          bookingData: {
            ...state.bookConsultation.bookingData,
            ...action.payload
          }
        }
      }
    }
    default: {
      return state;
    }
  }
};

export default reducer;
