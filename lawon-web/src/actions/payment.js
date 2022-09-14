import axios from "axios";

export const getCards = () => (dispatch, getState) => {
  let lawyerId = 3;
  dispatch({ type: "GET_LAWYER_CARDS_REQUEST" });

  return axios({
    url: `${window.baseUrl}/cards/lawyer/${lawyerId}`,
    method: "GET",
  })
    .then(({ data: { data } }) => {
      const { data: lawyercards } = data || {};

      return dispatch({
        type: "GET_LAWYER_CARDS_SUCCESS",
        payload: { lawyercards },
      });
    })
    .catch((error) => {
      const { response } = error;
      const { data, status } = response || {};
      const { message } = data || {};

      // if (status === 401) window.location = '/#/main/userdashboardmain';
      dispatch({
        type: "GET_LAWYER_CARDS_FAILED",
        payload: { errorMessage: message || error.message },
      });
    });
};

export const addCard = ({ token }) => (dispatch, getState) => {
  const { lawyer } = getState().auth;
  const { id } = lawyer || {};

  dispatch({ type: "LAWYER_ADD_CARD_REQUEST" });
  return axios({
    url: `${window.baseUrl}/cards/lawyer`,
    method: "post",
    data: {
      lawyerId: id,
      token
    },
  })
    .then(({ data: result }) => {
      const { data } = result;

      return dispatch({
        type: "LAWYER_ADD_CARD_SUCCESS",
        payload: { cards: data }
      });

    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: "LAWYER_ADD_CARD_FAILED",
        payload: { errorMessage: message || error.message },
      });

      return { error: message || error.message };
    });
};

export const deleteCard = ({ cardID }) => (dispatch, getState) => {
  const { lawyer } = getState().auth;
  const { id } = lawyer || {};

  dispatch({ type: "LAWYER_DELETE_CARD_REQUEST" });
  return axios({
    url: `${window.baseUrl}/cards/${cardID}/lawyer/${id}`,
    method: "delete",
  })
    .then(() => {
      dispatch({ type: "LAWYER_DELETE_CARD_SUCCESS" });

      return { success: true };
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({ type: "LAWYER_DELETE_CARD_FAILED" });

      return { error: message || error.message };
    });
};

export const clearError = () => (dispatch) => {
  dispatch({ type: "CLEAR_ERROR_MESSAGE" });
};

export const getInvoices = () => (dispatch, getState) => {
  const { lawyer } = getState().auth;
  const { id } = lawyer || {};


  dispatch({ type: "GET_LAWYER_INVOICES_REQUEST" });
  return axios({
    url: `${window.baseUrl}/transections/lawyer/${id}`,
    method: "GET",
  })
    .then(({ data: result }) => {
      const { data } = result || {};
      const { data: invoices } = data || {};
      
      dispatch({
        type: 'GET_LAWYER_INVOICES_SUCCESS',
        payload: { invoices }
      });
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: "GET_LAWYER_INVOICES_FAILED",
        payload: { errorMessage: message || error.message },
      });

      return { error: message || error.message };
    });
};

export const getNextBill = () => (dispatch, getState) => {
  const { organizationData } = getState().auth;
  const { id } = organizationData || {};


  dispatch({ type: "GET_LAWYER_NEXT_BILL_REQUEST" });
  return axios({
    url: `${window.baseUrl}/transections/lawyer/${id}/next-bill`,
    method: "GET",
  })
    .then(({ data: result }) => {
      const { data } = result || {};
      
      dispatch({
        type: 'GET_LAWYER_NEXT_BILL_SUCCESS',
        payload: { nextBill: data }
      });
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: "GET_LAWYER_NEXT_BILL_FAILED",
        payload: { errorMessage: message || error.message },
      });

      return { error: message || error.message };
    });
};

export const getBillingDetails = () => (dispatch, getState) => {
  const { lawyer } = getState().auth;
  const { id } = lawyer || {};


  dispatch({ type: "GET_LAWYER_BILLING_DETAILS_REQUEST" });
  return axios({
    url: `${window.baseUrl}/transections/lawyer/${id}/details`,
    method: "GET",
  })
    .then(({ data: result }) => {
      const { data } = result || {};
      
      dispatch({
        type: 'GET_LAWYER_BILLING_DETAILS_SUCCESS',
        payload: { billingDetails: data }
      });
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: "GET_LAWYER_BILLING_DETAILS_FAILED",
        payload: { errorMessage: message || error.message },
      });

      return { error: message || error.message };
    });
};

export const setDefaultCard = ({ cardId }) => (dispatch, getState) => {
  const { lawyer } = getState().auth;
  const { id } = lawyer || {};


  dispatch({ type: "SET_LAWYER_DEFAULT_CARD_REQUEST" });
  return axios({
    url: `${window.baseUrl}/cards/${cardId}/lawyer/${id}`,
    method: "PUT"
  })
    .then(() => {
      dispatch({ type: 'SET_LAWYER_DEFAULT_CARD_SUCCESS' });
      return { success: true };
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({ type: "SET_LAWYER_DEFAULT_CARD_FAILED" });

      return { error: message || error.message };
    });
};
