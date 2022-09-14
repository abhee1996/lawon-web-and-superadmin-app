import axios from "axios";
import { GOOGLE_API_KEY } from "../../common/constants";

export const getConsultaion = () => (dispatch, getState) => {
  const { auth, userConsultation } = getState().user;
  const { accessToken, user } = auth || {};
  const { id } = user || {};

  const { pagination, status } = userConsultation || {};
  const { page, pageSize } = pagination;

  dispatch({ type: "GET_CONSULTATION_REQUEST" });

  axios({
    url: `${window.baseUrl}/consultations`,
    method: "GET",
    params: {
      userId: id,
      skip: (page - 1) * pageSize,
      limit: pageSize,
      status: status === 'all' ? '' : status
    },
    headers: {
      Authorization: `bearer ${accessToken}`,
    }
  })
    .then(({ data: result }) => {
      const { data, total } = result;

      return dispatch({
        type: "GET_CONSULTATION_SUCCESS",
        payload: {
          allConsultations: data,
          total
        },
      });
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: "GET_CONSULTATION_FAILED",
        payload: { errorMessage: message || error.message },
      });
    });
};

export const getCategory = () => (dispatch) => {
  dispatch({ type: "GET_CATEGORY_FOR_CONSULTATION_REQUEST" });

  return axios({
    url: `${window.baseUrl}/categories`,
    method: "GET",
  })
    .then(({ data: result }) => {
      const { data } = result || {};

      return dispatch({
        type: "GET_CATEGORY_FOR_CONSULTATION_SUCCESS",
        payload: { categories: data },
      });
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: "GET_CATEGORY_FOR_CONSULTATION_FAILED",
        payload: { errorMessage: message || error.message },
      });
    });
};

export const getSubcategory = ({ categoryId, id }) => (dispatch) => {
  dispatch({ type: "GET_SUBCATEGORY_FOR_CONSULTATION_REQUEST" });

  return axios({
    url: `${window.baseUrl}/subCategories`,
    method: "GET",
    params: {
      CategoryId: categoryId,
      id,
    },
  })
    .then(({ data: result }) => {
      const { data } = result || {};

      return dispatch({
        type: "GET_SUBCATEGORY_FOR_CONSULTATION_SUCCESS",
        payload: { subcategories: data },
      });
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: "GET_SUBCATEGORY_FOR_CONSULTATION_FAILED",
        payload: { errorMessage: message || error.message },
      });
    });
};

export const getAddressByLatLng = ({ lat, lng }) => (dispatch) => {
  dispatch({ type: "GET_ADDRESS_FOR_CONSULTATION_REQUEST" });

  return axios({
    url: `https://maps.googleapis.com/maps/api/geocode/json`,
    method: "GET",
    params: {
      latlng: `${lat},${lng}`,
      key: GOOGLE_API_KEY,
    },
  })
    .then(({ data }) => {
      const { results, status, error_message } = data || {};

      if (status !== "OK") {
        throw new Error(error_message);
      }

      dispatch({ type: "GET_ADDRESS_FOR_CONSULTATION_SUCCESS" });

      return { address: results[0] };
    })
    .catch((error) => {
      const { response } = error;
      const { message } = response || {};

      dispatch({
        type: "GET_ADDRESS_FOR_CONSULTATION_FAILED",
        payload: { errorMessage: message },
      });
    });
};

export const getLawyers = ({ subCategoryId, latlng, keyword, radius }) => (dispatch) => {
  dispatch({ type: "GET_LAWYERS_FOR_CONSULTATION_REQUEST" });

  return axios({
    url: `${window.baseUrl}/lawyers/consultations`,
    method: "GET",
    params: {
      subCategoryId,
      keyword,
      latlng,
      radius
    },
  })
    .then(({ data: result }) => {
      const { data } = result || {};

      dispatch({
        type: "GET_LAWYERS_FOR_CONSULTATION_SUCCESS",
        payload: { lawyers: data },
      });
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: "GET_LAWYERS_FOR_CONSULTATION_FAILED",
        payload: { errorMessage: message },
      });
    });
};




export const getLawyer = ({ lawyerId }) => (dispatch) => {
  dispatch({ type: "GET_LAWYER_BY_ID_FOR_CONSULTATION_REQUEST" });

  return axios({
    url: `${window.baseUrl}/lawyers`,
    method: "GET",
    params: {
      id: lawyerId,
    },
  })
    .then(({ data: result }) => {
      const { data } = result || {};
      const { rows } = data || {};
      const lawyer = rows[0] || {};

      dispatch({
        type: "GET_LAWYER_BY_ID_FOR_CONSULTATION_SUCCESS",
        payload: { lawyer },
      });
    })
    .catch((error) => {
      const { response } = error;
      const { message } = response || {};

      dispatch({
        type: "GET_LAWYER_BY_ID_FOR_CONSULTATION_FAILED",
        payload: {
          errorMessage: message,
          freeIntervals: [],
        },
      });
    });
};

export const newConsultation = ({
  UserId,
  LawyerId,
  startTime,
  channel,
  mobile,
  email,
  SubCategoryId,
  detail,
  file,
  enquiryId,
}) => (dispatch, getState) => {
  const dataTobeSent = {
    UserId,
    LawyerId,
    startTime,
    channel,
    mobile,
    email,
    SubCategoryId,
    detail,
    file,
    conversationId: enquiryId,
  };

  const { auth } = getState().user;
  const { accessToken } = auth || {};

  const formData = new FormData();
  Object.keys(dataTobeSent).forEach((key) => {
    if (dataTobeSent[key]) {
      formData.append(key, dataTobeSent[key]);
    }
  });

  dispatch({ type: "BOOK_CONSULATION_CONSULTATION_REQUEST" });

  return axios({
    url: `${window.baseUrl}/consultations`,
    method: "POST",
    data: formData,
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
  })
    .then(({ data: result }) => {
      const { data } = result || {};

      dispatch({
        type: "BOOK_CONSULATION_CONSULTATION_SUCCESS",
        payload: { consultation: data },
      });

      return { consultation: data };
    })
    .catch((error) => {
      const { response } = error;
      const { message } = response || {};

      dispatch({
        type: "BOOK_CONSULATION_CONSULTATION_FAILED",
        payload: { errorMessage: message || error.message },
      });

      return { error: message || error.message };
    });
};

export const getConsultation = ({ id }) => (dispatch, getState) => {
  const { auth } = getState().user;
  const { accessToken } = auth || {};

  dispatch({ type: "GET_CONSULATTION_BY_ID_CONSULTATION_REQUEST" });

  return axios({
    url: `${window.baseUrl}/consultations/${id}`,
    method: "GET",
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
  })
    .then(({ data: result }) => {
      const { data } = result || {};

      dispatch({
        type: "GET_CONSULATTION_BY_ID_CONSULTATION_SUCCESS",
        payload: { consultation: data },
      });

      return { consultation: data };
    })
    .catch((error) => {
      const { response } = error;
      const { message } = response || {};

      dispatch({
        type: "GET_CONSULATTION_BY_ID_CONSULTATION_FAILED",
        payload: {
          errorMessage: message || error.message,
        },
      });

      return { error: message || error.message };
    });
};

export const consultationUploadDocument = ({ media }) => (
  dispatch,
  getState
) => {
  let consultationId = 11;
  const dataTobeSent = {
    media,
    consultationId,
  };

  const { auth, userConsultation } = getState().user;
  const { accessToken } = auth || {};
  const { consultationDocument } = userConsultation || {};

  const formData = new FormData();
  Object.keys(dataTobeSent).forEach((key) => {
    if (dataTobeSent[key]) {
      formData.append(key, dataTobeSent[key]);
    }
  });

  dispatch({ type: "CONSULTATION_UPLOAD_DOCUMENT_REQUEST" });

  return axios({
    url: `${window.baseUrl}/consultation/attachment`,
    method: "POST",
    data: formData,
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
  })
    .then(({ data: result }) => {
      const { data } = result || {};
      // const index = findIndex(consultationDocument, ({ id }) => id === instructionId);

      consultationDocument.push(data);
      dispatch({
        type: "CONSULTATION_UPLOAD_DOCUMENT_SUCCESS",
        payload: { consultationDocument },
      });

      return { consultationDocument };
    })
    .catch((error) => {
      const { response } = error;
      const { message } = response || {};

      dispatch({
        type: "CONSULTATION_UPLOAD_DOCUMENT_FAILED",
        payload: {
          errorMessage: message || error.message,
        },
      });

      return { error: message || error.message };
    });
};

export const contactUpdate = ({ mobile }) => (dispatch, getState) => {
  const { auth, userConsultation } = getState().user;
  const { accessToken } = auth || {};
  const { bookConsultation } = userConsultation || {};
  const { consultation } = bookConsultation || {};
  const { id } = consultation || {};
  let consultationId = id;

  const dataTobeSent = { mobile };
  const formData = new FormData();
  Object.keys(dataTobeSent).forEach((key) => {
    if (dataTobeSent[key]) {
      formData.append(key, dataTobeSent[key]);
    }
  });

  dispatch({ type: "CONSULTATION_UPDATE_PROFILE_REQUEST" });

  return axios({
    url: `${window.baseUrl}/consultation/${consultationId}`,
    method: "PUT",
    data: formData,
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
  })
    .then(({ data: result }) => {
      const { data } = result || {};

      dispatch({
        type: "CONSULTATION_UPDATE_PROFILE_SUCCESS",
        payload: { data },
      });
    })
    .catch((error) => {
      const { response } = error;
      const { message } = response || {};

      dispatch({
        type: "CONSULTATION_UPDATE_PROFILE_FAILED",
        payload: {
          errorMessage: message || error.message,
        },
      });

      return { error: message || error.message };
    });
};

export const consultationCallType = ({ channel }) => (dispatch, getState) => {
  const { auth, userConsultation } = getState().user;
  const { accessToken } = auth || {};
  const { bookConsultation } = userConsultation || {};
  const { consultation } = bookConsultation || {};
  const { id } = consultation || {};
  let consultationId = id;
  const dataTobeSent = { channel };
  const formData = new FormData();
  Object.keys(dataTobeSent).forEach((key) => {
    if (dataTobeSent[key]) {
      formData.append(key, dataTobeSent[key]);
    }
  });

  dispatch({ type: "CONSULTATION_CALLTYPE_UPDATE_REQUEST" });

  return axios({
    url: `${window.baseUrl}/consultations/${consultationId}`,
    method: "PUT",
    data: formData,
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
  })
    .then(({ data }) => {
      // const { data } = result || {};

      dispatch({
        type: "CONSULTATION_CALLTYPE_UPDATE_SUCCESS",
        payload: { data },
      });
    })
    .catch((error) => {
      const { response } = error;
      const { message } = response || {};

      dispatch({
        type: "CONSULTATION_CALLTYPE_UPDATE_FAILED",
        payload: {
          errorMessage: message || error.message,
        },
      });

      return { error: message || error.message };
    });
};

export const consultationCancel = ({ id }) => (dispatch, getState) => {
  const { auth } = getState().user;
  const { accessToken } = auth || {};

  dispatch({ type: "CONSULTATION_CANCEL_REQUEST" });

  return axios({
    url: `${window.baseUrl}/consultations/cancel/${id}`,
    method: "delete",
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
  })
    .then(({ data: result }) => {
      const { data } = result || {};

      dispatch({
        type: "CONSULTATION_CANCEL_SUCCESS",
        payload: { data },
      });

      return { isCancelled: true };
    })
    .catch((error) => {
      const { response } = error;
      const { message } = response || {};

      dispatch({
        type: "CONSULTATION_CANCEL_FAILED",
        payload: {
          errorMessage: message || error.message,
        },
      });

      return { error: message || error.message };
    });
};

export const getFreeInterval = ({ lawyerId, date }) => (dispatch) => {
  dispatch({ type: "GET_FREE_INTERVALS_FOR_CONSULTATION_REQUEST" });

  return axios({
    url: `${window.baseUrl}/lawyers/${lawyerId}/intervals/${date}`,
    method: "GET",
  })
    .then(({ data: result }) => {
      const { data } = result || {};

      dispatch({
        type: "GET_FREE_INTERVALS_FOR_CONSULTATION_SUCCESS",
        payload: { freeIntervals: data },
      });
    })
    .catch((error) => {
      const { response } = error;
      const { message } = response || {};

      dispatch({
        type: "GET_FREE_INTERVALS_FOR_CONSULTATION_FAILED",
        payload: {
          errorMessage: message,
          freeIntervals: [],
        },
      });
    });
};

export const getGoogleAuthUrl = ({ consultationId }) => (dispatch) => {
  dispatch({ type: "GET_GOOGLE_AUTH_URL_FOR_CALENDAR_REQUEST" });

  return axios({
    url: `${window.baseUrl}/calendars/auth/google`,
    method: "GET",
    params: {
      consultationId
    }
  })
    .then(({ data: result }) => {
      const { data } = result || {};

      dispatch({
        type: "GET_GOOGLE_AUTH_URL_FOR_CALENDAR_SUCCESS",
        payload: { url: data },
      });
      return { url: data };
    })
    .catch((error) => {
      dispatch({ type: "GET_GOOGLE_AUTH_URL_FOR_CALENDAR_FAILED" });
      return { error };
    });
};

export const setPage = ({ page }) => (dispatch) => {
  dispatch({
    type: 'SET_PAGE_FOR_USER_CONSULTATION',
    payload: { page }
  });
}

export const setStatusFilter = ({ status }) => (dispatch) => {
  dispatch({
    type: 'SET_STATUS_FILTER_FOR_CONSULTATION',
    payload: { status }
  });
}

export const uploadAttachment = ({ consultationId, file }) => (dispatch, getState) => {
  const { auth } = getState().user;
  const { accessToken } = auth || {};

  const formData = new FormData();
  formData.append('media', file);

  dispatch({ type: "UPLOAD_CONSULTATION_ATTACHMENT_FOR_USER_CONSULATION_REQUEST" });

  return axios({
    url: `${window.baseUrl}/consultations/${consultationId}/attachment`,
    method: "POST",
    data: formData,
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
    onUploadProgress: ({ loaded, total }) => {
      dispatch({
        type: 'UPLOAD_CONSULTATION_ATTACHMENT_FOR_USER_CONSULATION_PROGRESS',
        payload: { progress: (loaded / total) * 100 }
      });
    }
  })
    .then(() => {

      dispatch({
        type: "UPLOAD_CONSULTATION_ATTACHMENT_FOR_USER_CONSULATION_SUCCESS"
      });

      return { isUploaded: true };
    })
    .catch((error) => {
      dispatch({ type: "UPLOAD_CONSULTATION_ATTACHMENT_FOR_USER_CONSULATION_FAILED" });
      return { error };
    });
}

export const deleteAttachment = ({ id }) => (dispatch, getState) => {
  const { auth } = getState().user;
  const { accessToken } = auth || {};


  dispatch({ type: "DELETE_CONSULTATION_ATTACHMENT_FOR_USER_CONSULATION_REQUEST" });

  return axios({
    url: `${window.baseUrl}/consultations/${id}/attachment`,
    method: "DELETE",
    headers: {
      Authorization: `bearer ${accessToken}`,
    }
  })
    .then(() => {
      dispatch({
        type: "DELETE_CONSULTATION_ATTACHMENT_FOR_USER_CONSULATION_SUCCESS"
      });

      return { isDeleted: true };
    })
    .catch((error) => {
      dispatch({ type: "DELETE_CONSULTATION_ATTACHMENT_FOR_USER_CONSULATION_FAILED" });
      return { error };
    });
}

export const reschedule = ({ id, date, time }) => (dispatch, getState) => {
  const { auth } = getState().user;
  const { accessToken } = auth || {};


  dispatch({ type: "RESCHEDULE_CONSULTATION_FOR_USER_CONSULATION_REQUEST" });

  return axios({
    url: `${window.baseUrl}/consultations/${id}/reschedule`,
    method: "PUT",
    data: {
      date,
      time
    },
    headers: {
      Authorization: `bearer ${accessToken}`,
    }
  })
    .then(() => {
      dispatch({
        type: "RESCHEDULE_CONSULTATION_FOR_USER_CONSULATION_SUCCESS"
      });

      return { rescheduled: true };
    })
    .catch((error) => {
      const { response } = error || {};
      const { data } = response || {};
      const { message } = data || {};

      dispatch({ type: "RESCHEDULE_CONSULTATION_FOR_USER_CONSULATION_FAILED" });
      return { message: message || error.message };
    });
}

export const setConsultationData = ({ attachments, phone, email, callType, description }) => (dispatch) => {
  dispatch({
    type: 'SET_BOOK_CONSUTATION_DATA_FOR_USER_CONSULTATION',
    payload: {
      attachments,
      phone,
      email,
      callType,
      description
    }
  });
}
