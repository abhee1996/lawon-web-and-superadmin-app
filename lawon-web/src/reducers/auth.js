let initialState = {
  loading: false,
  errorMessage: "",
  lawyer: {},
  lawyerAccessToken: "",
  organizationOTP: {},
  OTPStatus: false,
};

let lawyerSession = localStorage.getItem("lawyerSession");
if (lawyerSession) {
  lawyerSession = JSON.parse(lawyerSession);

  initialState = {
    ...initialState,
    ...lawyerSession,
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LAWYER_UPDATE_PASSORD_FOR_FORGOT_PASSWORD_REQUEST':
    case 'LAWYER_VERIFY_OTP_FOR_FORGOT_PASSWORD_REQUEST':
    case 'SEND_FORGOT_EMAIL_FOR_LAWYER_REQUEST':
    case "ORGANIZATION_SIGN_UP_REQUEST": {
      return {
        ...state,
        loading: true,
      };
    }
    case 'LAWYER_UPDATE_PASSORD_FOR_FORGOT_PASSWORD_SUCCESS':
    case 'LAWYER_VERIFY_OTP_FOR_FORGOT_PASSWORD_SUCCESS':
    case 'SEND_FORGOT_EMAIL_FOR_LAWYER_SUCCESS':
    case "ORGANIZATION_SIGN_UP_SUCCESS": {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }
    case 'LAWYER_UPDATE_PASSORD_FOR_FORGOT_PASSWORD_FAILED':
    case 'LAWYER_VERIFY_OTP_FOR_FORGOT_PASSWORD_FAILED':
    case 'SEND_FORGOT_EMAIL_FOR_LAWYER_FAILED':
    case "ORGANIZATION_SIGN_UP_FAILED": {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }

    case "VERIFY_OTP_FOR_ORGANIZATION_SIGN_UP_REQUEST": {
      return {
        ...state,
        loading: true,
      };
    }
    case "VERIFY_OTP_FOR_ORGANIZATION_SIGN_UP_SUCCESS": {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }
    case "VERIFY_OTP_FOR_ORGANIZATION_SIGN_UP_FAILED": {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }
    case "LAWYER_LOGIN_REQUEST": {
      return {
        ...state,
        loading: true,
      };
    }
    case "LAWYER_LOGIN_SUCCESS": {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }
    case "LAWYER_LOGIN_FAILED": {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }
    case "SEND_LAWYER_EMAIL_FOR_FORGOT_PASSWORD_REQUEST": {
      return {
        ...state,
        loading: true,
      };
    }
    case "SEND_LAWYER_EMAIL_FOR_FORGOT_PASSWORD_SUCCESS": {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }
    case "SEND_LAWYER_EMAIL_FOR_FORGOT_PASSWORD_FAILED": {
      return {
        ...state,
        loading: true,
      };
    }
    case "CLEAR_ERROR_MESSAGE": {
      return {
        ...state,
        errorMessage: "",
      };
    }
    case 'LOGOUT_LAWYER': {
      localStorage.clear();
      return {
        ...state,
        lawyer: {},
        lawyerAccessToken: ''
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
