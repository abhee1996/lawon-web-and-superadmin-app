import axios from "axios";

export const getProfile = () => (dispatch, getState) => {
  const { auth } = getState().user;
  const { user, accessToken } = auth || {};
  const { id } = user || {};

  dispatch({ type: "GET_USER_PROFILE_REQUEST" });
  return axios({
    url: `${window.baseUrl}/users`,
    method: "get",
    params: {
      id: id
    },
    headers: {
      Authorization: `bearer ${accessToken}`
    }
  })
    .then(({ data: result }) => {
      const { data } = result || {};
      const { rows } = data || {};

      let user = {};
      if (rows && rows.length) {
        user = rows.pop();
      }

      dispatch({
        type: "GET_USER_PROFILE_SUCCESS",
        payload: { user }
      });
    })
    .catch(error => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: "GET_USER_PROFILE_FAILED",
        payload: { errorMessage: message || error.message }
      });
    });
};

export const setUserProfileChange = ({ key, value }) => (
  dispatch,
  getstate
) => {
  dispatch({
    type: "USER_PROFILE_DETAILS_ONCHANGE",
    payload: {
      [key]: value
    }
  });
};

export const userProfileUpdate = () => (dispatch, getState) => {
  const { auth, userProfile } = getState().user;
  const { accessToken } = auth;

  const { user, image } = userProfile;
  const { id: userUpdateID } = user;

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    dateOfBirth,
    postcode,
    street,
    address,
    town,
    country
  } = user || {};

  const DataToBeSend = {
    firstName,
    lastName,
    email,
    phoneNumber,
    dateOfBirth,
    postcode,
    street,
    address,
    town,
    country,
  }

  const userFormData = new FormData();

  Object.keys(DataToBeSend)
    .forEach((key) => {
      if (DataToBeSend[key] == 'null' || DataToBeSend[key] === 'undefined') {
        DataToBeSend[key] = '';
      }
      userFormData.append(key, DataToBeSend[key]);
    });

    if (image) {
      userFormData.append('media', image);
    }

  dispatch({ type: "USER_PROFILE_DETAILS_UPDATE_REQUEST" });
  return axios({
    url: `${window.baseUrl}/users/` + userUpdateID,
    method: "put",
    data: userFormData,
    headers: {
      Authorization: `bearer ${accessToken}`
    }
  })
    .then(({ data }) => {
      const { data: userUpdateData } = data || {} ;
      dispatch({
        type: "USER_PROFILE__DETAILS_UPDATE_SUCCESS",
        payload: { user: userUpdateData }
      });

      localStorage.setItem('userSession', JSON.stringify({
        user: userUpdateData,
        accessToken
      }));

      dispatch({
        type: 'USER_SIGN_UP_SUCCESS',
        payload: {
          user: userUpdateData,
          accessToken
        }
      });

      return { isUpdated: true };
    })
    .catch( error  => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};
      const errorMessage = message || error.message;

      dispatch({
        type: "USER_PROFILE__DETAILS_UPDATE_FAILED",
        payload: { errorMessage }
      });

      return { errorMessage };
    });
};

export const updatePassword = ({ newPassword, oldPassword }) => (dispatch, getState) => {
  const { auth, userProfile } = getState().user;
  const { accessToken } = auth || {};
  const { user } = userProfile || {};
  const { email } = user;
  

  dispatch({ type: "USER_PROFILE__UPDATE_PASSWORD_REQUEST" });
  return axios({
    url: `${window.baseUrl}/users/updatePasword`,
    method: "post",
    data: {
      email,
      oldPassword,
      newPassword
    },
    headers: {
      Authorization: `bearer ${accessToken}`
    }
  })
    .then(() => {
      dispatch({ type: "USER_PROFILE_UPDATE_PASSWORD_SUCCESS" });

      return { isUpdated: true };
    })
    .catch(error => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};
      const errorMessage = message || error.message;

      dispatch({
        type: "USER_PROFILE_UPDATE_PASSWORD_FAILED",
        payload: { errorMessage }
      });

      return { errorMessage };
    });
};

export const getProfileNotification = () => (dispatch, getState) => {
  const { auth } = getState().user;
  const { accessToken, user } = auth || {};
  const { id } = user;

  dispatch({ type: "GET_USER_PROFILE_NOTIFICATION_REQUEST" });
  return axios({
    url: `${window.baseUrl}/notificationpreferences`,
    method: "GET",
    params: {
      UserId: id
    },
    headers: {
      Authorization: `bearer ${accessToken}`
    }
  })
    .then(({ data: result }) => {
      const { data } = result;

      dispatch({
        type: "GET_USER_PROFILE_NOTIFICATION_SUCCESS",
        payload: { preferences: data }
      });
    })
    .catch(error => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: "GET_USER_PROFILE_NOTIFICATION_FAILED",
        payload: { errorMessage: message || error.message }
      });
    });
};

export const userProfileNotificationOnChange = ({ key, value }) => (dispatch) => {
  dispatch({
    type: "GET_USER_PROFILE_NOTIFICATION_ONCHANGE",
    payload: {
      [key]: value
    }
  });
};

export const setImage = ({ image }) => dispatch => {
  dispatch({ type: "SET_IMAGE_FOR_USER_PROFILE", payload: { image } });
  dispatch({
    type: "USER_PROFILE_DETAILS_ONCHANGE",
    payload: { imageUrl: URL.createObjectURL(image) }
  });
};

export const updateNotifications = () => (dispatch, getState) => {
  const { auth, userProfile } = getState().user;
  const { accessToken } = auth || {};
  const { user, preferences } = userProfile || {};
  const { id } = user;
  const { confirmationNotification, responseNotification, reminders, updates, surveys, articles } = preferences || {};
  

  dispatch({ type: "UPDATE_NOTIFICATIONS_FOR_USER_PROFILE_REQUEST" });
  return axios({
    url: `${window.baseUrl}/notificationpreferences/set-user`,
    method: "post",
    data: {
      UserId: id,
      confirmationNotification,
      responseNotification,
      reminders,
      updates,
      surveys,
      articles
    },
    headers: {
      Authorization: `bearer ${accessToken}`
    }
  })
    .then(() => {
      dispatch({ type: "UPDATE_NOTIFICATIONS_FOR_USER_PROFILE_SUCCESS" });

      return { isUpdated: true };
    })
    .catch(error => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};
      const errorMessage = message || error.message;

      dispatch({
        type: "UPDATE_NOTIFICATIONS_FOR_USER_PROFILE_FAILED",
        payload: { errorMessage }
      });

      return { errorMessage };
    });
};
