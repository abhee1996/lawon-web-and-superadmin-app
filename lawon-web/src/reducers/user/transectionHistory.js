let initialState = {
  loading: false,
  errorMessage: "",
  alltransection: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_TRANSECTION_HISTORY_REQUEST": {
      return {
        ...state,
        loading: true,
      };
    }
    case "USER_TRANSECTION_HISTORY_SUCCESS": {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }
    case "USER_TRANSECTION_HISTORY_FAILED": {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }
    case "USER_TRANSECTION_HISTORY_FILTER_REQUEST": {
      return {
        ...state,
        loading: true,
      };
    }
    case "USER_TRANSECTION_HISTORY_FILTER_SUCCESS": {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }
    case "USER_TRANSECTION_HISTORY_FILTER_FAILED": {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }
    case "CLEAR_ERROR_MESSAGE": {
      return {
        ...state,
        errorMessage: "",
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
