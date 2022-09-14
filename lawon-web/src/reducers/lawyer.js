const initialState = {
  loading: false,
  errorMessage: '',
  lawyer: {},
  manageLawers: {
    loading: false,
    lawyers: [],
    total: 0,
    newLawyer: '',
    deleteLawyer: false
  }
}



const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REGISTER_INVITED_LAWYER_REQUES': {
      return {
        ...state,
        loading: true
      };
    }
    case 'REGISTER_INVITED_LAWYER_SUCCESS': {
      return {
        ...state,
        loading: false,
        lawyer: {
          ...action.payload
        }
      };
    }
    case 'REGISTER_INVITED_LAWYER_FAILED': {
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      };
    }
    case 'GET_LAWYERS_REQUEST': {
      return {
        ...state,
        loading: true
      };
    }
    case 'GET_LAWYERS_SUCCESS': {
      return {
        ...state,
        loading: false,
        manageLawers: {
          ...state.manageLawers,
          ...action.payload
        }
      };
    }
    case 'GET_LAWYERS_FAILED': {
      return {
        ...state,
        loading: false,
        ...action.payload
      };
    }
    case 'INVITE_LAWYERS_REQUEST': {
      return {
        ...state,
        manageLawers: {
          ...state.manageLawers,
          loading: true,
        }
      };
    }
    case 'INVITE_LAWYERS_SUCCESS': {
      return {
        ...state,
        manageLawers: {
          ...state.manageLawers,
          loading: false,
          ...action.payload
        }
      };
    }
    case 'INVITE_LAWYERS_FAILED': {
      return {
        ...state,
        ...action.payload,
        manageLawers: {
          ...state.manageLawers,
          loading: false
        }
      };
    }
    case 'CLEAR_ERROR_MESSAGE_FOR_LAWYERS': {
      return {
        ...state,
        errorMessage: ''
      };
    }
    case 'CLEAR_NEW_FOR_LAWYERS': {
      return {
        ...state,
        manageLawers: {
          ...state.manageLawers,
          newLawyer: ''
        }
      };
    }
    case 'UPDATE_LAWYERS_REQUEST': {
      return {
        ...state,
        manageLawers: {
          ...state.manageLawers,
          loading: true
        }
      };
    }
    case 'UPDATE_LAWYERS_SUCCESS': {
      return {
        ...state,
        manageLawers: {
          ...state.manageLawers,
          loading: false,
          ...action.payload
        }
      };
    }
    case 'UPDATE_LAWYERS_FAILED': {
      return {
        ...state,
        manageLawers: {
          ...state.manageLawers,
          loading: false
        }
      }
    }
    case 'REINVITATION_LAWYERS_REQUEST': {
      return {
        ...state,
        manageLawers: {
          ...state.manageLawers,
          loading: true
        }
      };
    }
    case 'REINVITATION_LAWYERS_SUCCESS': {
      return {
        ...state,
        loading: true
      }
    }
    case 'DELETE_LAWYERS_REQUEST': {
      return {
        ...state,
        manageLawers: {
          ...state.manageLawers,
          loading: true
        }
      }
    }
    case 'DELETE_LAWYERS_SUCCESS': {
      return {
        ...state,
        manageLawers: {
          ...state.manageLawers,
          loading: false,
          deleteLawyer: true
        }
      }
    }
    case 'DELETE_LAWYERS_FAILED': {
      return {
        ...state,
        manageLawers: {
          ...state.manageLawers,
          loading: false,
          deleteLawyer: false
        }
      };
    }
    case 'MAKE_ACTIVE_LAWYERS_REQUEST': {
      return {
        ...state,
        manageLawers: {
          ...state.manageLawers,
          loading: true
        }
      };
    }
    case 'MAKE_ACTIVE_LAWYERS_SUCCESS': {
      return {
        ...state,
        manageLawers: {
          ...state.manageLawers,
          loading: false,
          ...action.payload
        }
      };
    }
    case 'MAKE_ACTIVE_LAWYERS_FAILED': {
      return {
        ...state,
        manageLawers: {
          ...state.manageLawers,
          loading: false,
          ...action.payload
        }
      };
    }
    default: {
      return initialState;
    }
  }
}


export default reducer