const initialState = {
  loadingOpenEnquiries: false,
  openEnquiries: []
}



const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_OPEN_ENQUIRIES_FOR_LAWYERS_DASHBOARD_REQUEST': {
      return {
        ...state,
        loading: true
      };
    }
    case 'GET_OPEN_ENQUIRIES_FOR_LAWYERS_DASHBOARD_FAILED':
    case 'GET_OPEN_ENQUIRIES_FOR_LAWYERS_DASHBOARD_SUCCESS': {
      return {
        ...state,
        loading: false,
        ...action.payload
      };
    }
    default: {
      return state;
    }
  }
}


export default reducer;