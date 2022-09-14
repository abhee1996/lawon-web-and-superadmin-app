import moment from 'moment';

let initialState = {
  enquiry: {
    loading: false,
    state: []
  },
  consultation: {
    loading: false,
    consultationState: []
  },
  instruction: {
    loading: false,
    instructionState: []
  },
  history: {
    year: moment().format('YYYY'),
    loading: false,
    historyStats:[]
  },
  upcomingEvents: {
    loading: false,
    events:[]
  },
  userActivites: {
    loading: false,
    activities: []
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ENQUERY_STATES_FOR_USER_DASHBOARD_REQUEST': {
      return {
        ...state,
        enquiry: {
          ...state.enquiry,
          loading: true
        }
      };
    }
    case 'GET_ENQUERY_STATES_FOR_USER_DASHBOARD_FAILED':
    case 'GET_ENQUERY_STATES_FOR_USER_DASHBOARD_SUCCESS': {
      return {
        ...state,
        enquiry: {
          ...state.enquiry,
          loading: false,
          ...action.payload
        }
      };
    }
    case 'GET_CONSULTATION_STATES_FOR_USER_DASHBOARD_REQUEST': {
      return {
        ...state,
        consultation: {
          ...state.consultation,
          loading: true
        }
      };
    }
    case 'GET_CONSULTATION_STATES_FOR_USER_DASHBOARD_FAILED':
    case 'GET_CONSULTATION_STATES_FOR_USER_DASHBOARD_SUCCESS': {
      return {
        ...state,
        consultation: {
          ...state.consultation,
          loading: false,
          ...action.payload
        }
      };
    }
    case 'GET_INSTRUCTION_STATES_FOR_USER_DASHBOARD_REQUEST': {
      return {
        ...state,
        instruction: {
          ...state.instruction,
          loading: true
        }
      };
    }
    case 'GET_INSTRUCTION_STATES_FOR_USER_DASHBOARD_FAILED':
    case 'GET_INSTRUCTION_STATES_FOR_USER_DASHBOARD_SUCCESS': {
      return {
        ...state,
        instruction: {
          ...state.instruction,
          loading: false,
          ...action.payload
        }
      };
    }
    case 'GET_HISTORY_FOR_USER_DASHBOARD_REQUEST': {
      return {
        ...state,
        history: {
          ...state.history,
          loading: true
        }
      };
    }
    case 'SET_YEAR_FILTER_FOR_USER_DASHBOARD':
    case 'GET_HISTORY_FOR_USER_DASHBOARD_FAILED':
    case 'GET_HISTORY_FOR_USER_DASHBOARD_SUCCESS': {
      return {
        ...state,
        history: {
          ...state.history,
          loading: false,
          ...action.payload
        }
      };
    }
    case 'GET_UPCOMING_EVENT_FOR_USER_DASHBOARD_REQUEST': {
      return {
        ...state,
        history: {
          ...state.history,
          loading: true
        }
      };
    }
    case 'GET_UPCOMING_EVENT_FOR_USER_DASHBOARD_FAILED':
    case 'GET_UPCOMING_EVENT_FOR_USER_DASHBOARD_SUCCESS': {
      return {
        ...state,
        upcomingEvents: {
          ...state.upcomingEvents,
          loading: false,
          ...action.payload
        }
      };
    }
    case 'GET_ACTIVITIES_FOR_USER_DASHBOARD_REQUEST': {
      return {
        ...state,
        userActivites: {
          ...state.userActivites,
          loading: true
        }
      };
    }
    case 'GET_ACTIVITIES_FOR_USER_DASHBOARD_FAILED':
    case 'GET_ACTIVITIES_FOR_USER_DASHBOARD_SUCCESS': {
      return {
        ...state,
        userActivites: {
          ...state.userActivites,
          loading: false,
          ...action.payload
        }
      };
    }
    default: {
      return state;
    }
  }
}

export default reducer;