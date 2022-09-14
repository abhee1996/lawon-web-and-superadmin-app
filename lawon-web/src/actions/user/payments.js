import axios from "axios";

export const getSavedCards = () => (dispatch, getState) => {
  const { auth } = getState().user;
  const { accessToken, user } = auth || {};
  const { id } = user || {};

  dispatch({ type: "GET_USER_CARDS_REQUEST" });

  return axios({
    url: `${window.baseUrl}/cards/user/${id}`,
    method: "GET",
    headers: {
      Authorization: `bearer ${accessToken}`
    }
  })
    .then(({ data: result }) => {
      const { data } = result;
      const { data: cards } = data || {}

      return dispatch({
        type: "GET_USER_CARDS_SUCCESS",
        payload: { cards }
      });
    })
    .catch(error => {
      const { response } = error;
      const { data, status } = response || {};
      const { message } = data || {};

      dispatch({
        type: "GET_USER_CARDS_FAILED",
        payload: { errorMessage: message || error.message }
      });
    });
};

export const getQuestionQuotation = ({ conversationId }) => (dispatch, getState) => {
  const { auth } = getState().user;
  const { accessToken } = auth || {};

  dispatch({ type: "GET_USER_QUESTION_QUOTATION_REQUEST" });

  return axios({
    url: `${window.baseUrl}/enquiries/conversation/${conversationId}/qoutation`,
    method: "GET",
    headers: {
      Authorization: `bearer ${accessToken}`
    }
  })
    .then(({ data: result }) => {
      const { data } = result;

      return dispatch({
        type: "GET_USER_QUESTION_QUOTATION_SUCCESS",
        payload: { quotation: data }
      });
    })
    .catch(error => {
      const { response } = error;
      const { data, status } = response || {};
      const { message } = data || {};

      if (status === 401) window.location = '/#/main/userdashboardmain';
      dispatch({
        type: "GET_USER_QUESTION_QUOTATION_FAILED",
        payload: { errorMessage: message || error.message }
      });
    });
};

export const payInstructionByQuestion = ({ conversationId, saveCard, cardId, card }) => (dispatch, getState) => {
  const { auth } = getState().user;
  const { accessToken } = auth || {};

  dispatch({ type: "PAY_USER_INSTRUCTION_BY_QUESTION_REQUEST" });

  return axios({
    url: `${window.baseUrl}/instructions/enquiry`,
    method: "post",
    data: {
      conversationId,
      saveCard,
      card,
      cardId
    },
    headers: {
      Authorization: `bearer ${accessToken}`
    }
  })
    .then(({ data: result }) => {
      const { data } = result;

      dispatch({
        type: "PAY_USER_INSTRUCTION_BY_QUESTION_SUCCESS",
        payload: { instruction: data }
      });

      return { instruction: data };
    })
    .catch(error => {
      const { response } = error;
      const { data, status } = response || {};
      const { message } = data || {};

      // if (status === 401) window.location = '/#/main/userdashboardmain';
      dispatch({
        type: "PAY_USER_INSTRUCTION_BY_QUESTION_FAILED",
        payload: { errorMessage: message || error.message }
      });

      return { error: message || error.message };
    });
};

export const getConsultationQuotation = ({ consultationId }) => (dispatch, getState) => {
  const { auth } = getState().user;
  const { accessToken } = auth || {};

  dispatch({ type: "GET_CONSULTATION_QUOTATION_REQUEST" });

  return axios({
    url: `${window.baseUrl}/consultations/${consultationId}/quotation`,
    method: "GET",
    headers: {
      Authorization: `bearer ${accessToken}`
    }
  })
    .then(({ data: result }) => {
      const { data } = result;

      dispatch({
        type: "GET_CONSULTATION_QUOTATION_SUCCESS",
        payload: { quotation: data }
      });

      return { quotation: data };
    })
    .catch(error => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};
      const errorMessage = message || error.message;

      dispatch({
        type: "GET_CONSULTATION_QUOTATION_FAILED",
        payload: { errorMessage }
      });

      return { errorMessage };
    });
};

export const payInstructionByConsultaiton = ({ consultationId, saveCard, cardId, card }) => (dispatch, getState) => {
  const { auth } = getState().user;
  const { accessToken } = auth || {};

  dispatch({ type: "PAY_USER_INSTRUCTION_BY_CONSULTATION_REQUEST" });

  return axios({
    url: `${window.baseUrl}/instructions/consultation`,
    method: "POST",
    data: {
      consultationId,
      saveCard,
      card,
      cardId
    },
    headers: {
      Authorization: `bearer ${accessToken}`
    }
  })
    .then(({ data: result }) => {
      const { data } = result;

      dispatch({
        type: "PAY_USER_INSTRUCTION_BY_CONSULTATION_SUCCESS",
        payload: { instruction: data }
      });

      return { instruction: data };
    })
    .catch(error => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: "PAY_USER_INSTRUCTION_BY_CONSULTATION_FAILED",
        payload: { errorMessage: message || error.message }
      });

      return { error: message || error.message };
    });
};

export const deleteUserCard = ({ cardId }) => (dispatch, getState) => {
  const { auth } = getState().user;
  const { accessToken, user } = auth || {};
  const { id } = user

  dispatch({ type: "DELETE_USER_CARD_FOR_PAYMENT_REQUEST" });

  return axios({
    url: `${window.baseUrl}/cards/${cardId}/user/${id}`,
    method: 'DELETE',
    headers: {
      Authorization: `bearer ${accessToken}`
    }
  })
    .then(() => {
      dispatch({ type: "DELETE_USER_CARD_FOR_PAYMENT_SUCCESS" });

      return { isDeleted: false };
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: "DELETE_USER_CARD_FOR_PAYMENT_FAILED",
        payload: { errorMessage: message || error.message }
      });

      return { error: message || error.message };
    });
};

export const getPaymentHistory = () => (dispatch, getState) => {
  const { auth, payments } = getState().user;
  const { accessToken, user } = auth || {};
  const { id } = user

  const { pagination, searchTerm } = payments || {};
  const { page, pageSize } = pagination || {};

  dispatch({ type: "GET_PAYMENY_HISTORY_FOR_USER_REQUEST" });

  return axios({
    url: `${window.baseUrl}/transections/user/${id}`,
    method: 'GET',
    headers: {
      Authorization: `bearer ${accessToken}`
    },
    params: {
      skip: (page - 1) * pageSize,
      limit: pageSize,
      searchTerm
    }
  })
    .then(({ data: result }) => {
      const { data } = result || {};
      const { rows, count } = data || {}

      dispatch({
        type: "GET_PAYMENY_HISTORY_FOR_USER_SUCCESS",
        payload: {
          payments: rows,
          total: count
        }
      });
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: "GET_PAYMENY_HISTORY_FOR_USER_FAILED",
        payload: { errorMessage: message || error.message }
      });
    });
};

export const setPage = ({ page }) => (dispatch) => {
  dispatch({ type: 'SET_PAGE_FOR_USER_PAYMENT_HISTOEY', payload: { page }});
}
export const setSearshFilter = ({ value }) => (dispatch) => {
  dispatch({ type: 'SET_SEARCH_FILTER_FOR_USER_PAYMENT', payload: { searchTerm: value  }});
}
