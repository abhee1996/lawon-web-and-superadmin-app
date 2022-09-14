const initialState = {
  loading: false,
  errorMessage: "",
  instructions: [],
  total: 0,
  status: '',
  pagination: {
    page: 1,
    pageSize: 10
  },
  instructionDetails: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER_INSTRUCTIONS_DETAILS_REQUEST":
    case "GET_USER_INSTRUCTIONS_REQUEST": {
      return {
        ...state,
        loading: true
      };
    }
    case "GET_USER_INSTRUCTIONS_DETAILS_SUCCESS":
    case "GET_USER_INSTRUCTIONS_DETAILS_FAILED":
    case "GET_USER_INSTRUCTIONS_SUCCESS":
    case "GET_USER_INSTRUCTIONS_FAILED": {
      return {
        ...state,
        loading: false,
        ...action.payload
      };
    }
    case 'SET_PAGE_FOR_USER_INSTRUCTION': {
      return{
        ...state,
        pagination: {
          ...state.pagination,
          ...action.payload
        }
      }
    }
    case 'SET_STATUS_FILTER_FOR_INSTRUCTION': {
      return {
        ...state,
        ...action.payload
      }
    }
    default: {
      return state;
    }
  }
};

export default reducer;
