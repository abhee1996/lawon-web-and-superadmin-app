import axios from "axios";

export const getQuestions = () => (dispatch, getState) => {
  const { auth, questions } = getState().user;
  const { accessToken, user } = auth || {};
  const { id } = user || {};

  const { pagination, status } = questions || {};
  const { page, pageSize } = pagination;

  dispatch({ type: "GET_USER_QUESTION_REQUEST" });

  axios({
    url: `${window.baseUrl}/enquiries`,
    method: "GET",
    params: {
      UserId: id,
      skip: (page - 1) * pageSize,
      limit: pageSize,
      status: status === 'all' ? '' : status
    },
    headers: {
      Authorization: `bearer ${accessToken}`
    }
  })
    .then(({ data: result }) => {
      const { data, total } = result;

      return dispatch({
        type: "GET_USER_QUESTION_SUCCESS",
        payload: {
          questions: data,
          total
        }
      });
    })
    .catch(error => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: "GET_USER_QUESTION_FAILED",
        payload: { errorMessage: message || error.message }
      });
    });
};

export const markAsClose = ({ id }) => (dispatch, getState) => {
  const { auth } = getState().user;
  const { accessToken } = auth || {};

  dispatch({ type: "MARK_AS_CLOSE_QUESTION_REQUEST" });

  return axios({
    url: `${window.baseUrl}/enquiries/${id}`,
    method: "PUT",
    data: {
      status: 2
    },
    headers: {
      Authorization: `bearer ${accessToken}`
    }
  })
    .then(() => {
      return dispatch({ type: "MARK_AS_CLOSE_SUCCESS" });
    })
    .catch(error => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: "MARK_AS_CLOSE_FAILED",
        payload: { errorMessage: message || error.message }
      });
    });
};

export const getQuestionDetails = ({ conversationId }) => (dispatch, getState) => {
  const { auth } = getState().user;
  const { accessToken } = auth || {};

  dispatch({ type: "GET_DETAILS_FOR_QUESTION_REQUEST" });

  return axios({
    url: `${window.baseUrl}/enquiries/conversation/${conversationId}/detail`,
    method: "GET",
    headers: {
      Authorization: `bearer ${accessToken}`
    }
  })
    .then(({ data: result }) => {
      const { data } = result || {};

      return dispatch({
        type: "GET_DETAILS_FOR_QUESTION_SUCCESS",
        payload: { questionsDetails: data }
      });
    })
    .catch(error => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: "GET_DETAILS_FOR_QUESTION_FAILED",
        payload: { errorMessage: message || error.message }
      });
    });
}

export const getConversations = ({ id }) => (dispatch, getState) => {
  const { auth } = getState().user;
  const { accessToken } = auth || {};

  dispatch({ type: "GET_CONVERSATIONS_FOR_QUESTION_REQUEST" });

  return axios({
    url: `${window.baseUrl}/enquiries/${id}/conversation`,
    method: "GET",
    headers: {
      Authorization: `bearer ${accessToken}`
    }
  })
    .then(({ data: result }) => {
      const { data } = result || {};

      return dispatch({
        type: "GET_CONVERSATIONS_FOR_QUESTION_SUCCESS",
        payload: { conversation: data }
      });
    })
    .catch(error => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: "GET_CONVERSATIONS_FOR_QUESTION_FAILED",
        payload: { errorMessage: message || error.message }
      });
    });
}

export const getCategory = () => (dispatch) => {
  dispatch({ type: 'GET_CATEGORY_FOR_QURSTIONS_REQUEST' });

  return axios({
    url: `${window.baseUrl}/categories`,
    method: 'GET'
  })
    .then(({ data: result }) => {
      const { data } = result || {};

      return dispatch({
        type: 'GET_CATEGORY_FOR_QURSTIONS_SUCCESS',
        payload: { categories: data }
      });
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: 'GET_CATEGORY_FOR_QURSTIONS_FAILED',
        payload: { errorMessage: message || error.message }
      });
    });
}

export const getSubcategory = ({ categoryId }) => (dispatch) => {
  dispatch({ type: 'GET_SUBCATEGORY_FOR_QURSTIONS_REQUEST' });

  return axios({
    url: `${window.baseUrl}/subCategories`,
    method: 'GET',
    params: {
      CategoryId: categoryId
    }
  })
    .then(({ data: result }) => {
      const { data } = result || {};

      return dispatch({
        type: 'GET_SUBCATEGORY_FOR_QURSTIONS_SUCCESS',
        payload: { subcategories: data }
      });
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: 'GET_SUBCATEGORY_FOR_QURSTIONS_FAILED',
        payload: { errorMessage: message || error.message }
      });
    });
}

export const submitQuestion = ({ subcategoryId, title, problem, file }) => (dispatch, getState) => {
  const { auth } = getState().user;
  const { accessToken, user } = auth || {};
  const { id } = user || {};

  const questionToSubmit = {
    title,
    problem,
    UserId: id,
    CategoryId: subcategoryId,
    media: file
  }

  const formdata = new FormData();

  Object.keys(questionToSubmit)
    .forEach((key) => {
      if (questionToSubmit[key])
        formdata.append(key, questionToSubmit[key]);
    });

  dispatch({ type: 'SUBMIT_FOR_QURSTIONS_REQUEST' });

  return axios({
    url: `${window.baseUrl}/enquiries`,
    method: 'POST',
    data: formdata,
    headers: {
      Authorization: `bearer ${accessToken}`
    }
  })
    .then(({ data: result }) => {
      const { data } = result || {};

      dispatch({
        type: 'SUBMIT_FOR_QURSTIONS_SUCCESS',
        payload: { newQuestion: data }
      });

      return { newQuestion: data };
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: 'SUBMIT_FOR_QURSTIONS_FAILED',
        payload: { errorMessage: message || error.message }
      });
    });
}

export const clearNewQuestion = () => (dispatch) => {
  dispatch({ type: 'CLEAR_NEW_QUESTION_FOR_AFTER_SUBMIT' });
}


export const userReply = ({ replyContent, media, EnquiryConversationId }) => (dispatch, getState) => {
  dispatch({ type: "USER_REPLY_REQUEST" });
  const { auth } = getState().user;
  const { accessToken, user } = auth || {};
  const { id : UserId } = user || {};

  const dataToBeSubmit = {
    replyContent,
    media,
    UserId,
    EnquiryConversationId
  };

  const formData = new FormData();
  Object.keys(dataToBeSubmit)
  .forEach((key) => {
    if (dataToBeSubmit[key])
    formData.append(key, dataToBeSubmit[key]);
  });

  return axios({
    url: `${window.baseUrl}/enquiry/reply/user`,
    method: "post",
    data: formData,
    headers: {
      Authorization: `bearer ${accessToken}`
    }
  })
    .then(({ data: result }) => {
      const { data } = result || {};

      return { replySent: true };
    })
    .catch(error => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};
      const errorMessage = message || error.message;

      dispatch({
        type: "USER_REPLY_FAILED",
        payload: { errorMessage }
      });

      return { errorMessage };
    });
};

export const bookInstructByEnquiry = ({ details, enquiryId, lawyerId }) => (dispatch) => {
  dispatch({ type: "BOOK_INSTRUCTION_FOR_QUESTION_REQUEST" });

  return axios({
    url: `${window.baseUrl}/instructions/enquiry`,
    method: "post",
    data: {
      details,
      enquiryId,
      lawyerId
    }
  })
    .then(({ data: result }) => {
      const { data } = result || {};

      return dispatch({
        type: "BOOK_INSTRUCTION_FOR_QUESTION_SUCCESS"
      });
    })
    .catch(error => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};
      dispatch({
        type: "BOOK_INSTRUCTION_FOR_QUESTION_FAILED",
        payload: { errorMessage: message || error.message }
      });
    });
}

export const getFreeInterval = ({ lawyerId, date }) => (dispatch) => {
  dispatch({ type: 'GET_FREE_INTERVALS_FOR_ENQUIRY_CONSULTATION_REQUEST' });

  return axios({
    url: `${window.baseUrl}/lawyers/${lawyerId}/intervals/${date}`,
    method: 'GET'
  })
    .then(({ data: result }) => {
      const { data } = result || {};

      dispatch({
        type: 'GET_FREE_INTERVALS_FOR_ENQUIRY_CONSULTATION_SUCCESS',
        payload: { freeIntervals: data }
      });
    })
    .catch((error) => {
      const { response } = error;
      const { message } = response || {};

      dispatch({
        type: 'GET_FREE_INTERVALS_FOR_ENQUIRY_CONSULTATION_FAILED',
        payload: {
          errorMessage: message,
          freeIntervals: []
        }
      });
    });
}

export const setPage = ({ page }) => (dispatch) => {
  dispatch({
    type: 'SET_PAGE_FOR_USER_QUESTIONS',
    payload: { page }
  });
}

export const setStatusFilter = ({ status }) => (dispatch) => {
  dispatch({
    type: 'SET_STATUS_FILTER_FOR_QUESTION',
    payload: { status }
  });
}

export const setCategorySubcategory = ({ selectedCategory, selectedSubcategory}) => (dispatch) => {
  dispatch({
    type: 'SET_SELECTED_CATEGORY_SUBCATEGORY_FOR_ASK_QUESTION',
    payload: { selectedCategory, selectedSubcategory }
  });
}

export const closeConversation = ({ conversationId }) => (dispatch) => {
  dispatch({ type: "CLOSE_CONVERSATION_FOR_QUESTION_REQUEST" });

  return axios({
    url: `${window.baseUrl}/enquiries/conversation/${conversationId}/close`,
    method: "PUT",
  })
    .then(() => {
      dispatch({ type: "CLOSE_CONVERSATION_FOR_QUESTION_SUCCESS" });
      return { isClosed: true };
    })
    .catch(error => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};
      const errorMessage = message || error.message;

      dispatch({
        type: "CLOSE_CONVERSATION_QUESTION_FAILED",
        payload: { errorMessage }
      });

      return { errorMessage };
    });
}
