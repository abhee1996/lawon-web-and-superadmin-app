import axios from "axios";
import { GOOGLE_API_KEY } from '../common/constants';

export const organizationAdminProfileSetup = ({ firstName, secondName }) => (
  dispatch,
  getState
) => {
  let lastName = secondName;
  const { auth } = getState();
  const { lawyer } = auth || {};
  const { id: lawyerID } = lawyer || {};
  dispatch({ type: "ORGANIZATION_ADMIN_PROFILE_SETUP_REQUEST" });
  return axios({
    url: `${window.baseUrl}/lawyers/${lawyerID}`,
    method: "put",
    data: { firstName, lastName },
  })
    .then(({ data: result }) => {
      const { data: organizationProfile } = result || {};
      return dispatch({
        type: "ORGANIZATION_ADMIN_PROFILE_SETUP_SUCCESS",
        payload: { organizationProfile },
      });
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};
      return dispatch({
        type: "ORGANIZATION_ADMIN_PROFILE_SETUP_FAILED",
        payload: { errorMessage: message || error.message },
      });
    });
};

export const organizationFirmProfileSetup = (data) => (dispatch, getState) => {
  const { auth } = getState();
  const { lawyer, lawyerAccessToken } = auth || {};
  const { OrganizationId } = lawyer || {};

  const fdata = new FormData();
  Object.keys(data).forEach((key) => {
    fdata.append(key, data[key]);
  });

  dispatch({ type: "ORGANIZATION_FIRM_PROFILE_SETUP_REQUEST" });
  return axios({
    url: `${window.baseUrl}/organizations/setting/${OrganizationId}`,
    method: "put",
    data: fdata,
    headers: {
      Authorization: `bearer ${lawyerAccessToken}`
    }
  })
    .then(({ data: results }) => {
      const { data } = results || {};
      dispatch({
        type: "ORGANIZATION_FIRM_PROFILE_SETUP_SUCCESS",
        payload: { firmProfileData: data },
      });

      const updatedLawyer = {
        ...lawyer,
        Organization: {
          ...lawyer.OrganizationId,
          ...data
        }
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

      return { firmProfileData: data }
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};
      const errorMessage = message || error.message

      dispatch({
        type: "ORGANIZATION_FIRM_PROFILE_SETUP_FAILED",
        payload: { errorMessage },
      });

      return { errorMessage };
    });
};

export const getColleagues = () => (dispatch, getState) => {
  const { auth } = getState();
  const { lawyer } = auth || {};
  const { OrganizationId } = lawyer || {};

  dispatch({ type: "GET_COLLEAGUES_REQUEST" });
  return axios({
    url: `${window.baseUrl}/lawyers`,
    method: 'GET',
    params: {
      OrganizationId,
      isTechnical: true
    }
  })
    .then(({ data: result }) => {
      const { data } = result;
      const { rows } = data || {};

      dispatch({
        type: "GET_COLLEAGUES_SUCCESS",
        payload: { colleagues: rows }
      });
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: "GET_COLLEAGUES_FAILED",
        payload: { errorMessage: message || error.message },
      });
    });
};

export const organizationInviteLawyers = ({ firstName, lastName, email }) => (dispatch, getState) => {
  const { auth } = getState();
  const { lawyer } = auth || {};
  const { id } = lawyer || {};

  dispatch({ type: "ORGANIZATION_INVITE_LAWYER_REQUEST" });
  return axios({
    url: `${window.baseUrl}/lawyers/invitation`,
    method: "post",
    data: {
      firstName,
      lastName,
      email,
      adminId: id
    },
  })
    .then(({ data: inviteLawyers }) => {
      dispatch({
        type: "ORGANIZATION_INVITE_LAWYER_SUCCESS",
        payload: { inviteLawyers },
      });
      return { data: inviteLawyers }
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      const errorMessage = message || error.message;

      dispatch({
        type: "ORGANIZATION_INVITE_LAWYER_FAILED",
        payload: { errorMessage }
      });

      return { errorMessage };
    });
};
export const clearError = () => (dispatch) => {
  dispatch({ type: "CLEAR_ERROR_MESSAGE_ORGANIZATION" });
};

export const addOrganizationCard = ({ token }) => (dispatch, getState) => {
  const { auth } = getState();
  const { lawyer } = auth || {};
  const { id: lawyerId } = lawyer || {};

  dispatch({ type: "ORGANIZATION_ADD_CARD_REQUEST" });
  return axios({
    url: `${window.baseUrl}/cards/lawyer`,
    method: "post",
    data: { lawyerId, token },
  })
    .then(({ data: result }) => {
      const { data:cards } = result || {};

      dispatch({
        type: "ORGANIZATION_ADD_CARD_SUCCESS",
        payload: { cards },
      });

      return { cardAdded: true };
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};
      const errorMessage = message || error.message;

      dispatch({
        type: "ORGANIZATION_ADD_CARD_FAILED",
        payload: { errorMessage },
      });

      return { errorMessage };
    });
};



export const getLatLngByPostcodeForFirm = ({ postcode }) => (dispatch) => {
  dispatch({ type: 'GET_LAT_LNG_FOR_ORGANIZATION_REQUEST' });

  return axios({
    url: 'https://maps.googleapis.com/maps/api/geocode/json',
    method: 'GET',
    params: {
      address: postcode,
      key: GOOGLE_API_KEY
    }
  })
    .then(({ data }) => {
      const { results, status, error_message } = data || {};

      if (status !== 'OK') {
        throw new Error(error_message);
      }

      dispatch({ type: 'GET_LAT_LNG_FOR_ORGANIZATION_SUCCESS' });
      
      const { geometry } = results[0] || {};
      const { location } = geometry || {};
      return { location };
    })
    .catch((error) => {
      const { response } = error;
      const { message } = response || {};

      dispatch({
        type: 'GET_LAT_LNG_FOR_ORGANIZATION_FAILED',
        payload: { errorMessage: message }
      });
    });
}