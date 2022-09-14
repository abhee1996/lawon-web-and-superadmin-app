const initialState = {
  loading: false,
  errorMessage: '',
  user: {},
  image: '',
  preferences: {
    onfirmationNotification: true,
    responseNotification: true,
    reminders: true,
    updates: true,
    surveys: true,
    articles: true
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_NOTIFICATIONS_FOR_USER_PROFILE_REQUEST':
    case 'GET_USER_PROFILE_NOTIFICATION_REQUEST':
    case 'GET_USER_PROFILE_REQUEST': {
      return {
        ...state,
        loading: true
      };
    }
    case 'UPDATE_NOTIFICATIONS_FOR_USER_PROFILE_SUCCESS':
    case 'GET_USER_PROFILE_NOTIFICATION_SUCCESS':
    case 'GET_USER_PROFILE_SUCCESS': {
      return {
        ...state,
        loading: false,
        ...action.payload
      };
    }
    case 'UPDATE_NOTIFICATIONS_FOR_USER_PROFILE_FAILED':
    case 'GET_USER_PROFILE_NOTIFICATION_FAILED':
    case 'GET_USER_PROFILE_FAILED': {
      return {
        ...state,
        loading: false
      };
    }
    case 'USER_PROFILE_DETAILS_ONCHANGE': {
      return {
        ...state,
        loading: false,
        user : {
          ...state.user,
          ...action.payload
        }
      };
    }
    case 'USER_PROFILE_DETAILS_UPDATE_REQUEST': {
      return {
        ...state,
        loading: true
      };
    }
    case 'USER_PROFILE__DETAILS_UPDATE_SUCCESS': {
      return {
        ...state,
        loading: false,
        errorMessage:'Profile Successfully Updated',
        ...action.payload
      };
    }
    case 'USER_PROFILE__DETAILS_UPDATE_FAILED': {
      return {
        ...state,
        loading: false,
        ...action.payload,

      };
    }
    case 'USER_PROFILE__UPDATE_PASSWORD_REQUEST': {
      return {
        ...state,
        loading: true,
      };
    }
    case 'USER_PROFILE_UPDATE_PASSWORD_FAILED':
    case 'USER_PROFILE_UPDATE_PASSWORD_SUCCESS': {
      return {
        ...state,
        loading: false,
        ...action.payload,

      };
    }
    case 'GET_USER_PROFILE__NOTIFICATION_SUCCESS': {
      return {
        ...state,
        loading: false,
      };
    }
    case 'SET_IMAGE_FOR_USER_PROFILE': {
      return {
        ...state,
        ...action.payload
      };
    }
    case 'GET_USER_PROFILE_NOTIFICATION_ONCHANGE': {
      return {
        ...state,
        preferences: {
          ...state.preferences,
          ...action.payload
        }
      };
    }
    case 'USER_GET_PROFILE_REQUEST': {
      return {
        ...state,
        loading: true
      };
    }
    case 'USER_GET_PROFILE_REQUEST_SUCCESS': {
      return {
        ...state,
        loading: true
      };
    }
    case 'USER_GET_PROFILE_REQUEST_FAILED': {
      return {
        ...state,
        loading: true
      };
    }
    default: {
      return state;
    }
  }
}

export default reducer;