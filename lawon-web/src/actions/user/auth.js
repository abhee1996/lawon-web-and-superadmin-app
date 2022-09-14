import axios from 'axios';

export const signup = ({ firstName, lastName, email, password, phoneNumber }) => (dispatch, getState) => {
  dispatch({ type: 'USER_SIGN_UP_REQUEST' });
  return axios({
    url: `${window.baseUrl}/auth/user/signup`,
    method: 'post',
    data: {
      firstName,
      lastName,
      email,
      password,
      phoneNumber
    }
  })
    .then(({ data: result }) => {
      const { data } = result || {};
      const { user, accessToken } = data || {};

      localStorage.setItem('userSession', JSON.stringify({ user, accessToken }));

      dispatch({
        type: 'USER_SIGN_UP_SUCCESS',
        payload: { user, accessToken }
      });
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: 'USER_SIGN_UP_FAILED',
        payload: { errorMessage: message || error.message }
      });
    });
}



export const verifyOTP = ({ otp }) => (dispatch, getState) => {
  const { auth } = getState().user;
  let { user, accessToken } = auth || {};
  const { id } = user || {};

  dispatch({ type: 'VERIFY_OTP_FOR_USER_SIGN_UP_REQUEST' });
  return axios({
    url: `${window.baseUrl}/auth/user/tokenVerification`,
    method: 'post',
    data: {
      otp,
      userId: id
    }
  })
    .then(() => {
      user.isVerified = true;
      localStorage.setItem('userSession', JSON.stringify({
        user,
        accessToken
      }));

      dispatch({
        type: 'VERIFY_OTP_FOR_USER_SIGN_UP_SUCCESS',
        payload: { user }
      });
      return { isVerified: true };
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      const errorMessage = message || error.message;

      dispatch({
        type: 'VERIFY_OTP_FOR_USER_SIGN_UP_FAILED',
        payload: { errorMessage }
      });

      return { errorMessage };
    });
}

export const login = ({ email, password }) => (dispatch) => {
  dispatch({ type: 'USER_LOGIN_REQUEST' });
  return axios({
    url: `${window.baseUrl}/auth/user/login`,
    method: 'post',
    data: {
      email,
      password
    }
  })
    .then(({ data: result }) => {
      const { data } = result || {};
      const { user, accessToken } = data || {};

      localStorage.setItem('userSession', JSON.stringify({ user, accessToken }));

      dispatch({
        type: 'USER_LOGIN_SUCCESS',
        payload: { user, accessToken }
      });
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: 'USER_LOGIN_FAILED',
        payload: { errorMessage: message || error.message }
      });
    });
}

export const sendEmailForForgotPassword = ({ email }) => (dispatch) => {
  dispatch({ type: 'SEND_USER_EMAIL_FOR_FORGOT_PASSWORD_REQUEST' });
  return axios({
    url: `${window.baseUrl}/users/forgotPassword`,
    method: 'post',
    data: {
      email
    }
  })
    .then(() => {
      dispatch({ type: 'SEND_USER_EMAIL_FOR_FORGOT_PASSWORD_SUCCESS' });
      return { isSent: true };
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};
      const errorMessage = message || error.message;

      dispatch({
        type: 'SEND_USER_EMAIL_FOR_FORGOT_PASSWORD_FAILED',
        payload: { errorMessage }
      });

      return { errorMessage };
    });
}

export const clearError = () => (dispatch) => {
  dispatch({ type: 'CLEAR_ERROR_MESSAGE_FOR_AUTH' });
}

export const exchangeAuthToken = ({ token }) => (dispatch) => {
  dispatch({ type: 'EXCHANGE_TOKEN_FOR_USER_SOCIAL_LOGIN_REQUEST' });
  return axios({
    url: `${window.baseUrl}/social/exchangeToken`,
    method: 'post',
    data: {
      authToken: token
    }
  })
    .then(({ data: result }) => {
      const { data } = result || {};
      const { user, accessToken } = data || {};

      localStorage.setItem('userSession', JSON.stringify({ user, accessToken }));

      dispatch({
        type: 'EXCHANGE_TOKEN_FOR_USER_SOCIAL_LOGIN_SUCCESS',
        payload: { user, accessToken }
      });
      return { user };
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: 'EXCHANGE_TOKEN_FOR_USER_SOCIAL_LOGIN_FAILED',
        payload: { errorMessage: message || error.message }
      });
        return { error };
    });
}

export const logout = () => (dispatch) =>{
  dispatch({ type: 'LOGOUT_USER' });
}

export const verifyOTPForForgotPassword = ({ email, token }) => (dispatch) => {
  dispatch({ type: 'VERIFY_OTP_FOR_FORGOT_PASSWORD_REQUEST' });
  return axios({
    url: `${window.baseUrl}/users/verifyForgetToken`,
    method: 'post',
    data: {
      email,
      token
    }
  })
    .then(() => {
      dispatch({ type: 'VERIFY_OTP_FOR_FORGOT_PASSWORD_SUCCESS' });
      return { isVerified: true };
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};
      const errorMessage = message || error.message;

      dispatch({
        type: 'VERIFY_OTP_FOR_FORGOT_PASSWORD_FAILED',
        payload: { errorMessage }
      });

      return { errorMessage };
    });
}

export const resetPassword = ({ email, token, newPassword }) => (dispatch) => {
  dispatch({ type: 'UPDATE_PASSORD_FOR_FORGOT_PASSWORD_REQUEST' });
  return axios({
    url: `${window.baseUrl}/users/resetPassword`,
    method: 'post',
    data: {
      email,
      token,
      newPassword
    }
  })
    .then(() => {
      dispatch({ type: 'UPDATE_PASSORD_FOR_FORGOT_PASSWORD_SUCCESS' });
      return { isUpdated: true };
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};
      const errorMessage = message || error.message;

      dispatch({
        type: 'UPDATE_PASSORD_FOR_FORGOT_PASSWORD_FAILED',
        payload: { errorMessage }
      });

      return { errorMessage };
    });
}
