const initialState = {
  loading: false,
  errorMessage: '',
  calendars: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_LAWYER_CALENDAR_REQUEST': {
      return {
        ...state,
        loading: true
      };
    }
    case 'GET_LAWYER_CALENDAR_SUCCESS': {
      return {
        ...state,
        loading: false,
        ...action.payload
      };
    }
    case 'GET_LAWYER_CALENDAR_FAILED': {
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      };
    }
    default: {
      return initialState;
    }
  }
}

export default reducer;