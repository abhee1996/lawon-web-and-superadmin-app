import axios from "axios";

export const getAllEnquiries = () => (dispatch, getState) => {
  const { lawyer } = getState().auth;
  const { id } = lawyer || {};

  const { pagination } = getState().enquiries;
  const { page, pageSize } = pagination;

  dispatch({ type: "GET_ALL_ENQUIRIES_FOR_LAWYERS_REQUEST" });

  return axios({
    url: `${window.baseUrl}/enquiries/lawyer/${id}`,
    method: 'GET',
    params: {
      skip: (page - 1) * pageSize,
      limit: pageSize
    }
  })
    .then(({ data: result }) => {
      const { data } = result || {};
      const { rows, count } = data || {};

      dispatch({
        type: "GET_ALL_ENQUIRIES_FOR_LAWYERS_SUCCESS",
        payload: {
          enquiries: rows,
          total: count
        },
      });
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: "GET_ALL_ENQUIRIES_FOR_LAWYERS_FAILED",
        payload: { errorMessage: message || error.message },
      });
    });
};

export const getOpenEnquiries = () => (dispatch, getState) => {
  const { lawyer } = getState().auth;
  const { id } = lawyer || {};

  const { pagination } = getState().enquiries;
  const { page, pageSize } = pagination;

  dispatch({ type: "GET_OPEN_ENQUIRIES_FOR_LAWYERS_REQUEST" });

  return axios({
    url: `${window.baseUrl}/enquiries/lawyer/${id}/open-enquiries`,
    method: 'GET',
    params: {
      skip: (page - 1) * pageSize,
      limit: pageSize
    }
  })
    .then(({ data: result }) => {
      const { data } = result || {};
      const { rows, count } = data || {};

      dispatch({
        type: "GET_OPEN_ENQUIRIES_FOR_LAWYERS_SUCCESS",
        payload: {
          enquiries: rows,
          total: count
        },
      });
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: "GET_OPEN_ENQUIRIES_FOR_LAWYERS_FAILED",
        payload: { errorMessage: message || error.message },
      });
    });
};

export const getAllFirmOpenEnquiries = () => (dispatch) => {
  dispatch({ type: "GET_OPEN_ENQUIRIES_REQUEST" });
  let lawyerID = 2;
  return axios({
    url: `${
      window.baseUrl
    }/enquiries/organization/${lawyerID}/${"?status=1&isOpen=1"}`,
    method: "get",
  })
    .then(({ data: { data: allOpenEnquiries } }) => {
      dispatch({
        type: "GET_OPEN_ENQUIRIES_REQUEST_SUCCESS",
        payload: { allOpenEnquiries },
      });
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: "GET_OPEN_ENQUIRIES_REQUEST_FAILED",
        payload: { errorMessage: message || error.message },
      });
    });
};

export const getAllFirmArchivedEnquiries = () => (dispatch) => {
  dispatch({ type: "GET_ARCHIVED_ENQUIRIES_REQUEST" });
  let lawyerID = 2;
  return axios({
    url: `${
      window.baseUrl
    }/enquiries/organization/${lawyerID}/${"?status=1&isArchive=1"}`,
    method: "get",
  })
    .then(({ data: { data: allArchiveEnquiries } }) => {
      dispatch({
        type: "GET_ARCHIVED_ENQUIRIES_REQUEST_SUCCESS",
        payload: { allArchiveEnquiries },
      });
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: "GET_ARCHIVED_ENQUIRIES_REQUEST_FAILED",
        payload: { errorMessage: message || error.message },
      });
    });
};

export const getEnquiryDetails = ({ id: enquiryId }) => (dispatch, getState) => {
  const { lawyer } = getState().auth;
  const { id } = lawyer || {};

  dispatch({ type: "GET_ENQUIRIES_DETAILS_REQUEST" });
  return axios({
    url: `${window.baseUrl}/enquiries/${enquiryId}/detail`,
    method: 'GET',
    params: {
      lawyerId: id 
    }
  })
    .then(({ data: { data: enquireyDetails } }) => {
      dispatch({
        type: "GET_ENQUIRIES_DETAILS_SUCCESS",
        payload: { enquireyDetails },
      });
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: "GET_ENQUIRIES_DETAILS_FAILED",
        payload: { errorMessage: message || error.message },
      });
    });
};

export const submitNote = ({ enquiryId, note }) => (dispatch, getState) => {
  const { lawyer } = getState().auth;
  const { id } = lawyer || {};

  dispatch({ type: "SUBMIT_ENQUIRY_NOTE_FOR_LAWYER_REQUEST" });
  return axios({
    url: `${window.baseUrl}/enquiries/${enquiryId}/notes/lawyer/${id}`,
    method: 'POST',
    data: { content: note }
  })
    .then(() => {
      dispatch({ type: "SUBMIT_ENQUIRY_NOTE_FOR_LAWYER_SUCCESS" });

      return { isSubmit: true };
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};
      const errorMessage = message || error.message;

      dispatch({
        type: "SUBMIT_ENQUIRY_NOTE_FOR_LAWYER_FAILED",
        payload: { errorMessage: message || error.message },
      });

      return { errorMessage };
    });
};

export const getNotes = ({ enquiryId }) => (dispatch, getState) => {
  const { lawyer } = getState().auth;
  const { id } = lawyer || {};

  dispatch({ type: "GET_ENQUIRY_NOTE_FOR_LAWYER_REQUEST" });
  return axios({
    url: `${window.baseUrl}/enquiries/${enquiryId}/notes/lawyer/${id}`,
    method: 'GET',
  })
    .then(({ data: result }) => {
      const { data } = result || {};
      const { EnquriyNotes } = data || {};

      dispatch({
        type: "GET_ENQUIRY_NOTE_FOR_LAWYER_SUCCESS",
        payload: { enquiryNotes: EnquriyNotes }
      });
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};
      const errorMessage = message || error.message;

      dispatch({
        type: "GET_ENQUIRY_NOTE_FOR_LAWYER_FAILED",
        payload: { errorMessage: message || error.message },
      });

      return { errorMessage };
    });
};

export const submitReply = ({ enquiryId, content, quotation }) => (dispatch, getState) => {
  const { lawyer } = getState().auth;
  const { id } = lawyer || {};

  dispatch({ type: "SUBMIT_ENQUIRY_REPLY_FOR_LAWYER_REQUEST" });
  return axios({
    url: `${window.baseUrl}/enquiries/${enquiryId}/reply/lawyer/${id}`,
    method: 'POST',
    data: {
      content,
      quotation
    }
  })
    .then(() => {
      dispatch({ type: "SUBMIT_ENQUIRY_REPLY_FOR_LAWYER_SUCCESS"});
      return { isSubmit: true };
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};
      const errorMessage = message || error.message;

      dispatch({
        type: "SUBMIT_ENQUIRY_REPLY_FOR_LAWYER_FAILED",
        payload: { errorMessage: message || error.message },
      });

      return { errorMessage };
    });
};

export const getLawyerConversation = ({ enquiryId }) => (dispatch, getState) => {
  const { lawyer } = getState().auth;
  const { id } = lawyer || {};

  dispatch({ type: "GET_ENQUIRY_REPLY_FOR_LAWYER_REQUEST" });
  return axios({
    url: `${window.baseUrl}/enquiries/${enquiryId}/conversation/lawyer/${id}`,
    method: 'GET'
  })
    .then(({ data: result }) => {
      const { data } = result || {};

      dispatch({
        type: "GET_ENQUIRY_REPLY_FOR_LAWYER_SUCCESS",
        payload: { conversation: data }
      });
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};
      const errorMessage = message || error.message;

      dispatch({
        type: "GET_ENQUIRY_REPLY_FOR_LAWYER_FAILED",
        payload: { errorMessage },
      });
    });
};

export const markAsArchived = ({ enquiryId, isArchived }) => (dispatch, getState) => {
  const { lawyer } = getState().auth;
  const { id } = lawyer || {};

  dispatch({ type: "MARK_ENQUIRY_AS_ARCHIVED_FOR_LAWYER_REQUEST" });
  return axios({
    url: `${window.baseUrl}/enquiries/${enquiryId}/archive/lawyer/${id}`,
    method: 'PUT',
    data: {
      isArchived
    }
  })
    .then(() => {
      dispatch({ type: "MARK_ENQUIRY_AS_ARCHIVED_FOR_LAWYER_SUCCESS" });
      
      return { isArchived: true };
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};
      const errorMessage = message || error.message;

      dispatch({
        type: "MARK_ENQUIRY_AS_ARCHIVED_FOR_LAWYER_FAILED",
        payload: { errorMessage },
      });

      return { errorMessage };
    });
};

export const getArchivedEnquiries = () => (dispatch, getState) => {
  const { lawyer } = getState().auth;
  const { id } = lawyer || {};

  const { pagination } = getState().enquiries;
  const { page, pageSize } = pagination;

  dispatch({ type: "GET_ARCHIVED_ENQUIRIES_FOR_LAWYER_REQUEST" });
  return axios({
    url: `${window.baseUrl}/enquiries/archive/lawyer/${id}`,
    method: 'GET',
    params: {
      skip: (page - 1) * pageSize,
      limit: pageSize
    }
  })
    .then(({ data: result }) => {
      const { data } = result || {};
      const { rows, count } = data || {}

      dispatch({
        type: "GET_ARCHIVED_ENQUIRIES_FOR_LAWYER_SUCCESS",
        payload: {
          enquiries: rows,
          total: count
        }
      });

    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};
      const errorMessage = message || error.message;

      dispatch({
        type: "GET_ARCHIVED_ENQUIRIES_FOR_LAWYER_FAILED",
        payload: { errorMessage }
      });

    });
};

export const setPage = ({ page }) => (dispatch) => {
  return dispatch({
    type: 'SET_PAGE_FOR_LAWYER_ENQUIRY',
    payload: { page }
  });
}

export const setPageSize = ({ pageSize }) => (dispatch) => {
  return dispatch({
    type: 'SET_PAGE_SIZE_FOR_LAWYER_ENQUIRY',
    payload: { pageSize }
  });
}
