let initialState = {
  loading: false,
  errorMessage: "",
  plans: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SUBSCRIPTION_PLANS_REQUEST": {
      return {
        ...state,
        loading: true,
      };
    }
    case 'GET_SUBSCRIPTION_PLANS_FAILED':
    case "GET_SUBSCRIPTION_PLANS_SUCCESS": {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }
    default: {
      return initialState;
    }
  }
};

export default reducer;
