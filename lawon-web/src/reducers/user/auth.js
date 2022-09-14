let initialState = {
  loading: false,
  errorMessage: '',
  user: '',
  accessToken: ''
}

let userSession = localStorage.getItem('userSession');
if (userSession) {
  userSession = JSON.parse(userSession);

  initialState = {
    ...initialState,
    ...userSession,
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_PASSORD_FOR_FORGOT_PASSWORD_REQUEST':
    case 'VERIFY_OTP_FOR_FORGOT_PASSWORD_REQUEST':
    case 'USER_SIGN_UP_REQUEST': {
      return {
        ...state,
        loading: true
      };
    }
    case 'UPDATE_PASSORD_FOR_FORGOT_PASSWORD_SUCCESS':
    case 'VERIFY_OTP_FOR_FORGOT_PASSWORD_SUCCESS':
    case 'USER_SIGN_UP_SUCCESS': {
      return {
        ...state,
        loading: false,
        ...action.payload
      };
    }
    case 'UPDATE_PASSORD_FOR_FORGOT_PASSWORD_FAILED':
    case 'VERIFY_OTP_FOR_FORGOT_PASSWORD_FAILED':
    case 'USER_SIGN_UP_FAILED': {
      return {
        ...state,
        loading: false,
        ...action.payload
      }
    }
    case 'CLEAR_ERROR_MESSAGE_FOR_AUTH': {
      return {
        ...state,
        errorMessage: ''
      }
    }
    case 'VERIFY_OTP_FOR_USER_SIGN_UP_REQUEST': {
      return {
        ...state,
        loading: true
      }
    }
    case 'VERIFY_OTP_FOR_USER_SIGN_UP_SUCCESS': {
      return {
        ...state,
        loading: false,
        ...action.payload
      }
    }
    case 'VERIFY_OTP_FOR_USER_SIGN_UP_FAILED': {
      return {
        ...state,
        loading: false,
        ...action.payload
      }
    }
    case 'EXCHANGE_TOKEN_FOR_USER_SOCIAL_LOGIN_REQUEST':
    case 'USER_LOGIN_REQUEST': {
      return {
        ...state,
        loading: true
      };
    }
    case 'EXCHANGE_TOKEN_FOR_USER_SOCIAL_LOGIN_FAILED':
    case 'EXCHANGE_TOKEN_FOR_USER_SOCIAL_LOGIN_SUCCESS':
    case 'USER_LOGIN_SUCCESS': {
      return {
        ...state,
        loading: false,
        ...action.payload
      };
    }
    case 'USER_LOGIN_FAILED': {
      return {
        ...state,
        loading: false,
        ...action.payload
      };
    }
    case 'SEND_USER_EMAIL_FOR_FORGOT_PASSWORD_REQUEST': {
      return {
        ...state,
        loading: true
      };
    }
    case 'SEND_USER_EMAIL_FOR_FORGOT_PASSWORD_SUCCESS': {
      return {
        ...state,
        loading: false,
        ...action.payload
      }
    }
    case 'SEND_USER_EMAIL_FOR_FORGOT_PASSWORD_FAILED': {
      return {
        ...state,
        loading: false
      }
    }
    case 'LOGOUT_USER': {
      localStorage.clear();
      return {
        ...state,
        user: '',
        accessToken: ''
      };
    }
    default: {
      return state;
    }
  }
}

export default reducer;