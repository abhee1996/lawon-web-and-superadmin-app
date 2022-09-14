const initialState = {
  loading: false,
  errorMessage: '',
  lawyer: {},
  lawyerNotificationPreferences: {},
  categories: [],
  practiceAreas: [],
  calender: {},
  availability: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_LAWYER_AVAILABILITY_REQUEST':
    case 'GET_LAWYER_AVAILABILITY_REQUEST':
    case 'GET_LAWYER_PRECTICE_AREA_REQUEST':
    case 'SAVE_LAWYER_PRECTICE_AREA_REQUEST':
    case 'GET_PRACTICE_AREA_WITHIN_ORGANIZATION_REQUEST':
    case 'DISCONNECT_LAWYER_CALENDAR_REQUEST':
    case 'GET_LAWYER_CALENDAR_STATUS_REQUEST':
    case 'GET_LAWYER_PERSONAL_SETTINGS_REQUEST':
    case 'SAVE_LAWYER_PERSONAL_SETTINGS_REQUEST': {
      return {
        ...state,
        loading: true
      };
    }
    case 'GET_LAWYER_AVAILABILITY_SUCCESS':
    case 'SAVE_LAWYER_AVAILABILITY_SUCCESS':
    case 'GET_LAWYER_PRECTICE_AREA_SUCCESS':
    case 'SAVE_LAWYER_PRECTICE_AREA_FAILED':
    case 'SAVE_LAWYER_PRECTICE_AREA_SUCCESS':
    case 'GET_PRACTICE_AREA_WITHIN_ORGANIZATION_SUCCESS':
    case 'DISCONNECT_LAWYER_CALENDAR_SUCCESS':
    case 'GET_LAWYER_CALENDAR_STATUS_SUCCESS':
    case 'GET_LAWYER_PERSONAL_SETTINGS_SUCCESS':
    case 'SAVE_LAWYER_PERSONAL_SETTINGS_REQUEST_SUCCESS': {
      return {
        ...state,
        loading: false,
        ...action.payload
      };
    }
    case 'SAVE_LAWYER_AVAILABILITY_FAILED':
    case 'GET_LAWYER_AVAILABILITY_FAILED':
    case 'GET_LAWYER_PRECTICE_AREA_FAILED':
    case 'GET_PRACTICE_AREA_WITHIN_ORGANIZATION_FAILED':
    case 'DISCONNECT_LAWYER_CALENDAR_FAILED':
    case 'GET_LAWYER_CALENDAR_STATUS_FAILED':
    case 'GET_LAWYER_PERSONAL_SETTINGS_FAILED':
    case 'SAVE_LAWYER_PERSONAL_SETTINGS_REQUEST_FAILED': {
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      };
    }

    case 'SAVE_LAWYER_NOTIFICATION_PREFERENCES_REQUEST': {
      return {
        ...state,
        loading: true
      };
    }
    case 'SAVE_LAWYER_NOTIFICATION_PREFERENCES_REQUEST_SUCCESS': {
      return {
        ...state,
        loading: false,
        ...action.payload
      };
    }
    case 'SAVE_LAWYER_NOTIFICATION_PREFERENCES_REQUEST_FAILED': {
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      };
    }

    case 'GET_LAWYER_NOTIFICATION_PREFERENCES_REQUEST': {
      return {
        ...state,
        loading: true
      };
    }
    case 'GET_LAWYER_NOTIFICATION_PREFERENCES_REQUEST_SUCCESS': {
      return {
        ...state,
        loading: false,
        ...action.payload 
      };
    }
    case 'GET_LAWYER_NOTIFICATION_PREFERENCES_REQUEST_FAILED': {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }
    case 'GET_CATEGORY_REQUEST': {
      return {
        ...state,
        loading: true,
      }
    }
    case 'GET_CATEGORY_SUCCESS': {
      return {
        ...state,
        loading: false,
        organizationPracticeArea: {
          ...state.organizationPracticeArea,
          ...action.payload
        }
      }
    }
    case 'GET_SUBCATEGORY_FOR_PRACTICE_AREA_REQUEST': {
      return {
        ...state,
        organizationPracticeArea: {
          ...state.organizationPracticeArea,
          loading: true
        }
      }
    }
    case 'GET_SUBCATEGORY_FOR_PRACTICE_AREA_SUCCESS': {
      return {
        ...state,
        organizationPracticeArea: {
          ...state.organizationPracticeArea,
          loading: false,
          ...action.payload
        }
      }
    }
    case 'GET_SUBCATEGORY_FOR_PRACTICE_AREA_FAILED': {
      return {
        ...state,
        organizationPracticeArea: {
          ...state.organizationPracticeArea,
          loading: false,
          ...action.payload
        }
      }
    }
    case 'TOGGLE_SELECTION_SUBGATEGORY_FOR_PRACTICE_AREA': {
      return {
        ...state,
        organizationPracticeArea: {
          ...state.organizationPracticeArea,
          ...action.payload
        }
      }
    }
    case 'GET_ORGANIZATION_PRACTICE_AREA_REQUEST': {
      return {
        ...state,
        organizationPracticeArea: {
          ...state.organizationPracticeArea,
          loading: true
        }
      }
    }
    case 'GET_ORGANIZATION_PRACTICE_AREA_SUCCESS': {
      return {
        ...state,
        organizationPracticeArea: {
          ...state.organizationPracticeArea,
          loading: false,
          ...action.payload
        }
      }
    }
    case 'GET_ORGANIZATION_PRACTICE_AREA_FAILED': {
      return {
        ...state,
        organizationPracticeArea: {
          ...state.organizationPracticeArea,
          loading: false,
          ...action.payload
        }
      }
    }
    default: {
      return initialState;
    }
  }
}

export default reducer;