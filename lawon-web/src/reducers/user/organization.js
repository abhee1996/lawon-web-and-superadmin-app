const initialState = {
  loading: false,
  errorMessage: "",
  organizationDetails: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ORGANIZATION_DETAILS_REQUEST": {
      return {
        ...state,
        loading: true,
      };
    }
    case 'GET_ORGANIZATION_DETAILS_FAILED':
    case "GET_ORGANIZATION_DETAILS_SUCCESS": {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
