const initialState = {
    loading: false,
    errorMessage: '',
    lawyerProfileDetails: {},
  }
  
  
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_LAWYER_PROFILE_REQUEST': {
        return {
          ...state,
          loading: true
        };
      }
      case 'GET_LAWYER_PROFILE_SUCCESS': {
        return {
          ...state,
          loading: false,
          ...action.payload
        };
      }
      case 'GET_LAWYER_PROFILE_FAILED': {
        return {
          ...state,
          loading: false
        };
      }
      case 'CLEAR_ERROR_MESSAGE_FOR_USER_PROFILE': {
        return {
          ...state,
          errorMessage: ''
        }
      }
      
      
      default: {
        return state;
      }
    }
  }
  
  export default reducer;