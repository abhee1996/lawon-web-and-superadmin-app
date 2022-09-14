import axios from 'axios';
import { findIndex } from 'lodash';

export const registerInvitedLawyer = ({ password, token }) => (dispatch) => {
  dispatch({ type: 'REGISTER_INVITED_LAWYER_REQUEST' });

  axios({
    url: window.baseUrl + '/auth/lawyer/invite-signup',
    method: 'POST',
    data: {
      password,
      token
    }
  })
    .then(({ data: result, status }) => {
      if( status === 201 || status === 200) {
        const { data, accessToken } = result;

        localStorage.setItem('lawyerAccessToken', accessToken);
        localStorage.setItem('sessionData', JSON.stringify({
          lawyer: data,
          isLawyerLogin: true
        }));

        dispatch({
          type: 'SAVE_LAWYER_REGISTRATION_DATA',
          lawyerRegistrationData: { lawyer: data }
        });
        
        return dispatch({
          type: 'REGISTER_INVITED_LAWYER_SUCCESS',
          payload: data
        });
      }

      return dispatch({
        type: 'REGISTER_INVITED_LAWYER_FAILD',
      });
      
    })
    .catch(({ response }) => {
      return dispatch({
        type: 'REGISTER_INVITED_LAWYER_FAILED',
        payload: response ? response.data.message : 'Network Error'
      });
    });
}

export const getLawyers = () => (dispatch, getState) => {
  const { lawyer } = getState().auth;
  const { OrganizationId } = lawyer || {};

  dispatch({ type: 'GET_LAWYERS_REQUEST' });
  axios({
    url: `${window.baseUrl}/lawyers`,
    method: 'get',
    params: {
      OrganizationId,
      isTechnical: true
    }
  })
    .then(({ data: result }) => {
      const { data } = result || {};
      const { rows: lawyers = [], count: total = 0 } = data || {};

      dispatch({
        type: 'GET_LAWYERS_SUCCESS',
        payload: { lawyers, total }
      });
    })
    .catch((error) => {
      dispatch({
        type: 'GET_LAWYERS_FAILED',
        payload: { errorMessage: error.message }
      });
    });
}

export const inviteLawyer = ({ firstName, lastName, email }) => (dispatch, getState) => {
  const { lawyer, lawyerAccessToken } = getState().auth;
  const { id } = lawyer || {};

  dispatch({ type: 'INVITE_LAWYERS_REQUEST' });
  axios({
    url: `${window.baseUrl}/lawyers/invitation`,
    method: 'post',
    data: {
      firstName,
      lastName,
      email,
      adminId: id
    },
    headers: {
      Authorization: `bearer ${lawyerAccessToken}`
    }
  })
    .then(({ data: result }) => {
      const { data } = result || {};

      dispatch({
        type: 'INVITE_LAWYERS_SUCCESS',
        payload: { newLawyer: data }
      });
    })
    .catch(({ message, response }) => {
      const { data } = response || {};
      if (data) {
        return dispatch({
          type: 'INVITE_LAWYERS_FAILED',
          payload: { errorMessage: data.message }
        });
      }
      dispatch({
        type: 'INVITE_LAWYERS_FAILED',
        payload: { errorMessage: message }
      });
    });
}

export const clearErrorMessage = () => (dispatch) => {
  dispatch({ type: 'CLEAR_ERROR_MESSAGE_FOR_LAWYERS' });
}

export const clearNewLawyer = () => (dispatch) => {
  dispatch({ type: 'CLEAR_NEW_FOR_LAWYERS' });
}

export const editLawyer = ({
  firstName,
  lastName,
  jobTitle,
  phoneNumber,
  id: lawyerId
}) => (dispatch, getState) => {
  const { common, lawyer } = getState();
  const { accessToken } = common || {};
  const { manageLawers } = lawyer || {};
  const { lawyers } = manageLawers || {};

  const lawyerFormData = new FormData();
  const fieldsToUpdate = { firstName, lastName, jobTitle, phoneNumber };

  Object.keys(fieldsToUpdate)
    .forEach((key) => {
      lawyerFormData.append(key, fieldsToUpdate[key]);
    });

  dispatch({ type: 'UPDATE_LAWYERS_REQUEST' });
  axios({
    url: `${window.baseUrl}/lawyers/personalSetting/${lawyerId}`,
    method: 'put',
    data: lawyerFormData,
    headers: {
      Authorization: `bearer ${accessToken}`
    }
  })
    .then(({ data: result }) => {
      const { data } = result || {};

      const index = findIndex(lawyers, ({ id }) => id === lawyerId);
      let lawyer = lawyers[index];

      lawyer = {
        ...lawyer,
        ...data
      };

      lawyers[index] = lawyer;

      dispatch({
        type: 'UPDATE_LAWYERS_SUCCESS',
        payload: { lawyers }
      });
    })
    .catch(({ message, response }) => {
      const { data } = response || {};
      if (data) {
        return dispatch({
          type: 'UPDATE_LAWYERS_FAILED',
          payload: { errorMessage: data.message }
        });
      }
      dispatch({
        type: 'UPDATE_LAWYERS_FAILED',
        payload: { errorMessage: message }
      });
    });
}


export const reInvitation = ({ id }) => (dispatch, getState) => {
  const { common } = getState();
  const { accessToken } = common || {};

  dispatch({ type: 'REINVITATION_LAWYERS_REQUEST' });
  axios({
    url: `${window.baseUrl}/lawyers/invitation/${id}`,
    method: 'get',
    headers: {
      Authorization: `bearer ${accessToken}`
    }
  })
    .then(() => {
      dispatch({ type: 'REINVITATION_LAWYERS_SUCCESS' });
    })
    .catch(({ message, response }) => {
      const { data } = response || {};
      if (data) {
        return dispatch({
          type: 'REINVITATION_LAWYERS_FAILED',
          payload: { errorMessage: data.message }
        });
      }
      dispatch({
        type: 'REINVITATION_LAWYERS_FAILED',
        payload: { errorMessage: message }
      });
    });
}

export const deleteLawyer = ({ id }) => (dispatch, getState) => {
  const { common } = getState();
  const { accessToken } = common || {};

  dispatch({ type: 'DELETE_LAWYERS_REQUEST' });
  axios({
    url: `${window.baseUrl}/lawyers/deleteLawyer/${id}`,
    method: 'post',
    headers: {
      Authorization: `bearer ${accessToken}`
    }
  })
    .then(() => {
      dispatch({ type: 'DELETE_LAWYERS_SUCCESS' });
    })
    .catch(({ message, response }) => {
      const { data } = response || {};
      if (data) {
        return dispatch({
          type: 'DELETE_LAWYERS_FAILED',
          payload: { errorMessage: data.message }
        });
      }
      dispatch({
        type: 'DELETE_LAWYERS_FAILED',
        payload: { errorMessage: message }
      });
    });
}

export const makeLawyerActive = ({ isActive, lawyerId }) => (dispatch, getState) => {
  const { common, lawyer } = getState();
  const { accessToken } = common || {};
  const { manageLawers } = lawyer || {};
  const { lawyers } = manageLawers || {};


  const lawyerFormData = new FormData();
  const fieldsToUpdate = { isActive };

  Object.keys(fieldsToUpdate)
    .forEach((key) => {
      lawyerFormData.append(key, fieldsToUpdate[key]);
    });

  dispatch({ type: 'MAKE_ACTIVE_LAWYERS_REQUEST' });
  return axios({
    url: `${window.baseUrl}/lawyers/personalSetting/${lawyerId}`,
    method: 'put',
    data: lawyerFormData,
    headers: {
      Authorization: `bearer ${accessToken}`
    }
  })
    .then(({ data: result }) => {
      debugger
      const { data } = result || {};

      const index = findIndex(lawyers, ({ id }) => id === lawyerId);
      let lawyer = lawyers[index];

      lawyer = {
        ...lawyer,
        ...data
      };

      lawyers[index] = lawyer;

      dispatch({
        type: 'MAKE_ACTIVE_LAWYERS_SUCCESS',
        payload: { lawyers }
      });
    })
    .catch(({ message, response }) => {
      const { data } = response || {};
      if (data) {
        return dispatch({
          type: 'MAKE_ACTIVE_LAWYERS_FAILED',
          payload: { errorMessage: data.message }
        });
      }
      dispatch({
        type: 'MAKE_ACTIVE_LAWYERS_FAILED',
        payload: { errorMessage: message }
      });
    });
}

