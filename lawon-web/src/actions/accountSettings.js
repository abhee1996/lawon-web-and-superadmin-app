import axios from 'axios';

export const saveLawyerPersonalSettings = (data) => (dispatch, getState) => {
  const { lawyerAccessToken, lawyer } = getState().auth;
  const { id } = lawyer || {};

  dispatch({ type: 'SAVE_LAWYER_PERSONAL_SETTINGS_REQUEST' });

  const fd = new FormData()
  Object.keys(data).forEach((key) => {
    if (data[key]) fd.append(key, data[key]);
  })

  return axios({
    url: `${window.baseUrl}/lawyers/${id}`,
    method: 'put',
    data: fd,
    headers: {
      Authorization: `bearer ${lawyerAccessToken}`
    }
  })
    .then(({ data: result }) => {
      dispatch({ type: 'SAVE_LAWYER_PERSONAL_SETTINGS_REQUEST_SUCCESS' });

      const { data } = result;
      const { firstName, LastName, jobTitle, phoneNumber, imageUrl, aboutMe } = data || {};

      const updatedLawyer = {
        ...lawyer,
        firstName,
        LastName,
        jobTitle,
        phoneNumber,
        imageUrl,
        aboutMe
      }

      localStorage.setItem(
        "lawyerSession",
        JSON.stringify({
          lawyer: updatedLawyer,
          lawyerAccessToken
        })
      );

      dispatch({
        type: "LAWYER_LOGIN_SUCCESS",
        payload: { lawyer: updatedLawyer, lawyerAccessToken },
      });

      return { isUpdated: true };
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      const errorMessage = message || error.message;

      dispatch({
        type: 'SAVE_LAWYER_PERSONAL_SETTINGS_REQUEST_FAILED',
        payload: { errorMessage }
      });

      return { errorMessage };
    });
}

export const saveLawyerNotificationPreferences = (data) => (dispatch, getState) => {
  const { accessToken, lawyer } = getState().auth;
  const { id } = lawyer || {};

  dispatch({ type: 'SAVE_LAWYER_NOTIFICATION_PREFERENCES_REQUEST' });
  return axios({
    url: `${window.baseUrl}/notificationpreferences/set-lawyer`,
    method: 'POST',
    data: {
      ...data,
      lawyerId: id
    },
    headers: {
      Authorization: `bearer ${accessToken}`
    }
  })
    .then(({ data: result }) => {
      return dispatch({
        type: 'SAVE_LAWYER_NOTIFICATION_PREFERENCES_REQUEST_SUCCESS',
      });
    })
    .catch((error) => {
      const { response } = error || {};
      const { data } = response || {};
      const { message } = data || {};

      return dispatch({
        type: 'SAVE_LAWYER_NOTIFICATION_PREFERENCES_REQUEST_FAILED',
        payload: { errorMessage: message || error.message }
      });
    });
}

export const getLawyerNotificationPreferences = () => (dispatch, getState) => {
  const { lawyerAccessToken, lawyer } = getState().auth;
  const { id } = lawyer || {};

  dispatch({ type: 'GET_LAWYER_NOTIFICATION_PREFERENCES_REQUEST' });

  return axios({
    url: `${window.baseUrl}/notificationpreferences/lawyer/${id}`,
    method: 'GET',
    headers: {
      Authorization: `bearer ${lawyerAccessToken}`
    }
  })
    .then(({ data: result }) => {
      const { data } = result;
      return dispatch({
        type: 'GET_LAWYER_NOTIFICATION_PREFERENCES_REQUEST_SUCCESS',
        payload: { lawyerNotificationPreferences: data }
      });
    })
    .catch((error) => {
      const { response } = error || {};
      const { data } = response || {};
      const { message } = data || {};

      return dispatch({
        type: 'GET_LAWYER_NOTIFICATION_PREFERENCES_REQUEST_FAILED',
        payload: { errorMessage: message || error.message }
      });
    });
}

export const clearErrorMessage  = () => (dispatch) => {
  dispatch({ type: 'CLEAR_ERROR_MESSAGE_FOR_ACCOUNT_SETTINGS' });
}

export const getLawyerProfile = () => (dispatch, getState) => {
  const { lawyerAccessToken, lawyer } = getState().auth;
  const { id } = lawyer || {};

  dispatch({ type: 'GET_LAWYER_PERSONAL_SETTINGS_REQUEST' });
  axios({
    url: `${window.baseUrl}/lawyers/profile/${id}`,
    method: 'GET',
    headers: {
      Authorization: `bearer ${lawyerAccessToken}`
    }
  })
    .then(({ data: result }) => {
      const { data } = result || {};
      dispatch({
        type: 'GET_LAWYER_PERSONAL_SETTINGS_SUCCESS',
        payload: { lawyer: data }
      });
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      const errorMessage = message || error.message;

      dispatch({
        type: 'GET_LAWYER_PERSONAL_SETTINGS_FAILED',
        payload: { errorMessage }
      });
    });
}

export const getCalenderStatus = () => (dispatch, getState) => {
  const { lawyerAccessToken, lawyer } = getState().auth;
  const { id } = lawyer || {};

  dispatch({ type: 'GET_LAWYER_CALENDAR_STATUS_REQUEST' });
  axios({
    url: `${window.baseUrl}/calendars/status/lawyer/${id}`,
    method: 'GET',
    headers: {
      Authorization: `bearer ${lawyerAccessToken}`
    }
  })
    .then(({ data: result }) => {
      const { data } = result || {};
      dispatch({
        type: 'GET_LAWYER_CALENDAR_STATUS_SUCCESS',
        payload: { calender: data }
      });
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      const errorMessage = message || error.message;

      dispatch({
        type: 'GET_LAWYER_CALENDAR_STATUS_FAILED',
        payload: { errorMessage }
      });
    });
}

export const disconnectCalender = ({ type }) => (dispatch, getState) => {
  const { lawyerAccessToken, lawyer } = getState().auth;
  const { id } = lawyer || {};

  dispatch({ type: 'DISCONNECT_LAWYER_CALENDAR_REQUEST' });
  return axios({
    url: `${window.baseUrl}/calendars/type/${type}/lawyer/${id}`,
    method: 'DELETE',
    headers: {
      Authorization: `bearer ${lawyerAccessToken}`
    }
  })
    .then(() => {
      dispatch({ type: 'DISCONNECT_LAWYER_CALENDAR_SUCCESS' });
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      const errorMessage = message || error.message;

      dispatch({
        type: 'DISCONNECT_LAWYER_CALENDAR_FAILED',
        payload: { errorMessage }
      });
    });
}

export const getPracticeAreaWithinOrganization = () => (dispatch, getState) => {
  const { lawyerAccessToken, lawyer } = getState().auth;
  const { OrganizationId } = lawyer || {};

  dispatch({ type: 'GET_PRACTICE_AREA_WITHIN_ORGANIZATION_REQUEST' });
  return axios({
    url: `${window.baseUrl}/lawyers/practiceAreaByOrganization/${OrganizationId}`,
    method: 'GET',
    headers: {
      Authorization: `bearer ${lawyerAccessToken}`
    }
  })
    .then(({ data: result }) => {
      const { data } = result || {};

      dispatch({
        type: 'GET_PRACTICE_AREA_WITHIN_ORGANIZATION_SUCCESS',
        payload: { categories: data }
      });
    })     
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      const errorMessage = message || error.message;

      dispatch({
        type: 'GET_PRACTICE_AREA_WITHIN_ORGANIZATION_FAILED',
        payload: { errorMessage }
      });
    });
}

export const saveLawyerPracticeArea = ({ practiceAreas }) => (dispatch, getState) => {
  const { lawyerAccessToken, lawyer } = getState().auth;
  const { id } = lawyer || {};

  dispatch({ type: 'SAVE_LAWYER_PRECTICE_AREA_REQUEST' });
  return axios({
    url: `${window.baseUrl}/lawyers/${id}/practiceArea`,
    method: 'POST',
    data: {
      practiceAreas
    },
    headers: {
      Authorization: `bearer ${lawyerAccessToken}`
    }
  })
    .then(() => {
      dispatch({ type: 'SAVE_LAWYER_PRECTICE_AREA_SUCCESS' });
      return { success: true };
    })     
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      const errorMessage = message || error.message;

      dispatch({
        type: 'SAVE_LAWYER_PRECTICE_AREA_FAILED',
        payload: { errorMessage }
      });

      return { errorMessage };
    });
}

export const getLawyerPracticeArea = () => (dispatch, getState) => {
  const { lawyerAccessToken, lawyer } = getState().auth;
  const { id } = lawyer || {};

  dispatch({ type: 'GET_LAWYER_PRECTICE_AREA_REQUEST' });
  return axios({
    url: `${window.baseUrl}/lawyers/${id}/practiceArea`,
    method: 'GET',
    headers: {
      Authorization: `bearer ${lawyerAccessToken}`
    }
  })
    .then(({ data: result }) => {
      const { data } = result || {};

      dispatch({
        type: 'GET_LAWYER_PRECTICE_AREA_SUCCESS',
        payload: { practiceAreas: data }
      });
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      const errorMessage = message || error.message;

      dispatch({
        type: 'GET_LAWYER_PRECTICE_AREA_FAILED',
        payload: { errorMessage }
      });
    });
}

export const getLawyerAvailability = () => (dispatch, getState) => {
  const { lawyerAccessToken, lawyer } = getState().auth;
  const { id } = lawyer || {};

  dispatch({ type: 'GET_LAWYER_AVAILABILITY_REQUEST' });
  return axios({
    url: `${window.baseUrl}/lawyers/${id}/availability`,
    method: 'GET',
    headers: {
      Authorization: `bearer ${lawyerAccessToken}`
    }
  })
    .then(({ data: result }) => {
      let { data } = result || {};

      data = data.map(({ Day, ...rest }) => ({ ...rest, day: Day.name }));

      dispatch({
        type: 'GET_LAWYER_AVAILABILITY_SUCCESS',
        payload: { availability: data }
      });
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      const errorMessage = message || error.message;

      dispatch({
        type: 'GET_LAWYER_AVAILABILITY_FAILED',
        payload: { errorMessage }
      });
    });
}

export const saveLawyerAvailability = ({ availability }) => (dispatch, getState) => {
  const { lawyerAccessToken, lawyer } = getState().auth;
  const { id } = lawyer || {};

  dispatch({ type: 'SAVE_LAWYER_AVAILABILITY_REQUEST' });
  return axios({
    url: `${window.baseUrl}/lawyers/${id}/availability`,
    method: 'POST',
    headers: {
      Authorization: `bearer ${lawyerAccessToken}`
    },
    data: {
      lawyerAvailabilities: availability
    }
  })
    .then(({ data: result }) => {
      let { data } = result || {};

      data = data.map(({ Day, ...rest }) => ({ ...rest, day: Day.name }));

      dispatch({
        type: 'SAVE_LAWYER_AVAILABILITY_SUCCESS',
        payload: { availability: data }
      });
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      const errorMessage = message || error.message;

      dispatch({
        type: 'SAVE_LAWYER_AVAILABILITY_FAILED',
        payload: { errorMessage }
      });
    });
}
