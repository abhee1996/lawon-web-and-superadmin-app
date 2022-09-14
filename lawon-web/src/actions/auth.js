import axios from "axios";

export const lawyerLogin = ({ email, password, loginFor30days }) => (dispatch) => {
  dispatch({ type: "LAWYER_LOGIN_REQUEST" });
  return axios({
    url: `${window.baseUrl}/auth/lawyer/login`,
    method: "post",
    data: {
      email,
      password,
      loginFor30days
    },
  })
    .then(({ data: result }) => {
      const { data: lawyer, accessToken: lawyerAccessToken } = result || {};

      localStorage.setItem(
        "lawyerSession",
        JSON.stringify({ lawyer, lawyerAccessToken })
      );

      dispatch({
        type: "LAWYER_LOGIN_SUCCESS",
        payload: { lawyer, lawyerAccessToken },
      });
      return { isLogedIn: true };
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: "LAWYER_LOGIN_FAILED",
        payload: { errorMessage: message || error.message },
      });

      return { errorMessage: message || error.message };
    });
};

export const signup = ({ firstName, lastName, email, password, phone, planId, isTechnical }) => (dispatch) => {
  dispatch({ type: "ORGANIZATION_SIGN_UP_REQUEST" });
  return axios({
    url: `${window.baseUrl}/auth/lawyer/signup`,
    method: "post",
    data: {
      firstName,
      lastName,
      email,
      password,
      phone,
      isTechnical,
      planId,
    },
  })
    .then(({ data: result }) => {
      const { data, token: lawyerAccessToken } = result || {};
      const { lawyer } = data || {};

      localStorage.setItem(
        "lawyerSession",
        JSON.stringify({ lawyer, lawyerAccessToken })
      );

      dispatch({
        type: "ORGANIZATION_SIGN_UP_SUCCESS",
        payload: { lawyer, lawyerAccessToken },
      });

      return { signedUp: true };
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};
      const errorMessage = message || error.message;

      dispatch({
        type: "ORGANIZATION_SIGN_UP_FAILED",
        payload: { errorMessage },
      });

      return { errorMessage };
    });
};

export const resendMobileVerificationCode = () => (dispatch, getState) => {
  const { auth } = getState();
  let { lawyer, lawyerAccessToken } = auth || {};
  const { id } = lawyer || {};

  dispatch({ type: "VERIFY_OTP_FOR_ORGANIZATION_SIGN_UP_REQUEST" });
  return axios({
    url: `${window.baseUrl}/auth/lawyer/${id}/resend-otp`,
    headers: {
      'Authorization': `bearer ${lawyerAccessToken}`
    },
    method: 'POST'
  })
    .then(() => {
      lawyer.isPhoneNumberVerified = true;
      localStorage.setItem(
        "lawyerSession",
        JSON.stringify({ lawyer, lawyerAccessToken })
      );

      dispatch({
        type: "VERIFY_OTP_FOR_ORGANIZATION_SIGN_UP_SUCCESS",
        payload: { lawyer },
      });

      return { isVerified: true };
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};
      const errorMessage = message || error.message;

      dispatch({
        type: "VERIFY_OTP_FOR_ORGANIZATION_SIGN_UP_FAILED",
        payload: { errorMessage }
      });

      return { errorMessage };
    });
}

export const verifyOrganizationOTP = ({ otp }) => (dispatch, getState) => {
  const { auth } = getState();
  let { lawyer, lawyerAccessToken } = auth || {};
  const { OrganizationId } = lawyer || {};

  dispatch({ type: "VERIFY_OTP_FOR_ORGANIZATION_SIGN_UP_REQUEST" });
  return axios({
    url: `${window.baseUrl}/organizations/${OrganizationId}/verify/otp`,
    headers: {
      'Authorization': `bearer ${lawyerAccessToken}`
    },
    method: "put",
    data: {
      otp,
    },
  })
    .then(() => {
      lawyer.isVerified = true;
      localStorage.setItem(
        "lawyerSession",
        JSON.stringify({ lawyer, lawyerAccessToken })
      );

      dispatch({
        type: "VERIFY_OTP_FOR_ORGANIZATION_SIGN_UP_SUCCESS",
        payload: { lawyer },
      });

      return { isVerified: true };
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};
      const errorMessage = message || error.message;

      dispatch({
        type: "VERIFY_OTP_FOR_ORGANIZATION_SIGN_UP_FAILED",
        payload: { errorMessage }
      });

      return { errorMessage };
    });
};

export const clearError = () => (dispatch) => {
  dispatch({ type: "CLEAR_ERROR_MESSAGE" });
};

export const sendEmailForForgotPassword = ({ email }) => (dispatch) => {

  dispatch({ type: "SEND_FORGOT_EMAIL_FOR_LAWYER_REQUEST" });
  return axios({
    url: `${window.baseUrl}/lawyers/forgotPassword`,
    method: "POST",
    data: {
      email
    },
  })
    .then(() => {
      dispatch({ type: "SEND_FORGOT_EMAIL_FOR_LAWYER_SUCCESS" });

      return { isEmailSent: true };
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};
      const errorMessage = message || error.message;

      dispatch({
        type: "SEND_FORGOT_EMAIL_FOR_LAWYER_FAILED",
        payload: { errorMessage }
      });

      return { errorMessage };
    });
};

export const verifyOTPForForgotPassword = ({ email, token }) => (dispatch) => {
  dispatch({ type: 'LAWYER_VERIFY_OTP_FOR_FORGOT_PASSWORD_REQUEST' });
  return axios({
    url: `${window.baseUrl}/lawyers/verifyForgetToken`,
    method: 'post',
    data: {
      email,
      token
    }
  })
    .then(() => {
      dispatch({ type: 'LAWYER_VERIFY_OTP_FOR_FORGOT_PASSWORD_SUCCESS' });
      return { isVerified: true };
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};
      const errorMessage = message || error.message;

      dispatch({
        type: 'LAWYER_VERIFY_OTP_FOR_FORGOT_PASSWORD_FAILED',
        payload: { errorMessage }
      });

      return { errorMessage };
    });
}

export const resetPassword = ({ email, token, newPassword }) => (dispatch) => {
  dispatch({ type: 'LAWYER_UPDATE_PASSORD_FOR_FORGOT_PASSWORD_REQUEST' });
  return axios({
    url: `${window.baseUrl}/lawyers/resetPassword`,
    method: 'post',
    data: {
      email,
      token,
      newPassword
    }
  })
    .then(() => {
      dispatch({ type: 'LAWYER_UPDATE_PASSORD_FOR_FORGOT_PASSWORD_SUCCESS' });
      return { isUpdated: true };
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};
      const errorMessage = message || error.message;

      dispatch({
        type: 'LAWYER_UPDATE_PASSORD_FOR_FORGOT_PASSWORD_FAILED',
        payload: { errorMessage }
      });

      return { errorMessage };
    });
}

export const logoutLawyer = () => (dispatch) => {
  dispatch({ type: 'LOGOUT_LAWYER' });
}
