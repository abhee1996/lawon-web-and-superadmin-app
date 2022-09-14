import axios from 'axios';
import { findIndex } from 'lodash';

export const getConsultations = () => (dispatch, getState) => {
  const { auth, consultation } = getState();
  const { lawyer, lawyerAccessToken } = auth;
  const { id } = lawyer || {};

  const { pagination } = getState().consultation;
  const { page, pageSize } = pagination;
  const { status, isArchived } = consultation || {};

  dispatch({ type: 'GET_LAWYER_CONSULTATION_REQUEST' });

  axios({
    url: `${window.baseUrl}/consultations`,
    method: 'GET',
    params: {
      lawyerId: id,
      status,
      isArchived,
      skip: (page - 1) * pageSize,
      limit: pageSize
    },
    headers: {
      Authorization: `bearer ${lawyerAccessToken}`
    }
  })
    .then(({ data: result }) => {
      const { data } = result || {};

      return dispatch({
        type: 'GET_LAWYER_CONSULTATION_SUCCESS',
        payload: { consultations: data }
      });

    })
    .catch((error) => {
      const { response } = error || {};
      const { message } = response || {};

      return dispatch({
        type: 'GET_LAWYER_CONSULTATION_FAILED',
        payload: {
          errorMessage: message || error.message,
          consultations: []
        }
      });
    });
}

export const getConsultationDetails = ({ id }) => (dispatch, getState) => {
  const { auth } = getState();
  const { lawyerAccessToken } = auth;

  dispatch({ type: 'GET_LAWYER_CONSULTATION_DETAILS_REQUEST' });

  return axios({
    url: `${window.baseUrl}/consultations/${id}/detail-lawyer`,
    method: 'GET',
    headers: {
      Authorization: `bearer ${lawyerAccessToken}`
    }
  })
    .then(({ data: result }) => {
      const { data } = result || {};

      return dispatch({
        type: 'GET_LAWYER_CONSULTATION_DETAILS_SUCCESS',
        payload: { consultationDetails: data }
      });

    })
    .catch((error) => {
      const { response } = error || {};
      const { data } = response || {};
      const { message } = data || {};

      return dispatch({
        type: 'GET_LAWYER_CONSULTATION_DETAILS_FAILED',
        payload: {
          errorMessage: message || error.message
        }
      });
    });
}

export const setConsultaionStatus = (status) => (dispatch) => {
  dispatch({
    type: 'SET_CONSULTATION_STATUS',
    payload: { status }
  });
};

export const setConsultaionArchived = (isArchived) => (dispatch, getState) => {
  dispatch({
    type: 'SET_CONSULTATION_ARCHIVED',
    payload: { isArchived }
  });
};

export const saveQuotation = ({
  legalFee,
  estimatedDisbursements,
  other,
  ConsultationId,
  vatTax
}) => (dispatch, getState) => {
  const { lawyerAccessToken } = getState().auth;
  dispatch({ type: 'SUBMIT_QUOTATION_REQUEST' });

  return axios({
    url: `${window.baseUrl}/consultation/quotations`,
    method: 'post',
    data: {
      legalFee,
      estimatedDisbursements,
      other,
      ConsultationId,
      vatTax
    },
    headers: {
      Authorization: `bearer ${lawyerAccessToken}`
    }
  })
    .then(() => {
      dispatch({ type: 'SUBMIT_QUOTATION_SUCCESS' })

      return { isSubmit: true };
    })
    .catch((error) => {
      const { response } = error || {};
      const { data } = response || {};
      const { message } = data || {};

      dispatch({ type: 'SUBMIT_QUOTATION_FAILED' });

      return { errorMessage: message || error.message };
    });
}

export const submitNote = ({ consultationId, content }) => (dispatch, getState) => {
  const { lawyerAccessToken } = getState().auth;
  dispatch({ type: 'SUBMIT_CONSULTATION_NOTE_REQUEST' });

  return axios({
    url: `${window.baseUrl}/consultation/notes`,
    method: 'POST',
    data: {
      ConsultationId: consultationId,
      content
    },
    headers: {
      Authorization: `bearer ${lawyerAccessToken}`
    }
  })
    .then(() => {
      dispatch({ type: 'SUBMIT_CONSULTATION_NOTE_SUCCESS' });

      return { isSubmit: true };
    })
    .catch((error) => {
      const { response } = error || {};
      const { data } = response || {};
      const { message } = data || {}

      dispatch({ type: 'SUBMIT_CONSULTATION_NOTE_FAILED' });

      return { errorMessage: message || error.message };
    });
}

export const makeCall = ({ consultationId }) => (dispatch, getState) => {
  const { auth } = getState();
  const { lawyerAccessToken } = auth || {};

  dispatch({ type: 'MAKE_CALL_FOR_CONSULTATION_NOTE_REQUEST' });

  axios({
    url: `${window.baseUrl}/consultations/call`,
    method: 'POST',
    data: {
      id: consultationId,
    },
    headers: {
      Authorization: `bearer ${lawyerAccessToken}`
    }
  })
    .then(({ data: result }) => {
      const { data } = result || {};

      dispatch({
        type: 'MAKE_CALL_FOR_CONSULTATION_NOTE_SUCCESS',
        payload: { ...data }
      });

    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      return dispatch({
        type: 'MAKE_CALL_FOR_CONSULTATION_NOTE_FAILED',
        payload: { error: message || error.message }
      });
    });
}

export const setSession = ({ sessionId, token }) => (dispatch) => {
  dispatch({
    type: 'SET_SESSIONS_TO_REJOIN_CALL_FOR_CONSULTATION',
    payload: { sessionId, token }
  })
}

export const setPage = ({ page }) => (dispatch) => {
  dispatch({
    type: 'SET_PAGE_FOR_LAWYER_CONSULTATION',
    payload: { page }
  });
}

export const setPageSize = ({ pageSize }) => (dispatch) => {
  dispatch({
    type: 'SET_PAGE_SIZE_FOR_LAWYER_CONSULTATION',
    payload: { pageSize }
  });
}
