import axios from "axios";

export const getInstructions = () => (dispatch, getState) => {
  const { auth, instruction } = getState().user;
  const { accessToken, user } = auth || {};
  const { id } = user || {};

  const { pagination, status } = instruction || {}
  const { page, pageSize } = pagination;

  dispatch({ type: "GET_USER_INSTRUCTIONS_REQUEST" });

  axios({
    url: `${window.baseUrl}/instructions`,
    method: "GET",
    params: {
      userId: id,
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
        type: "GET_USER_INSTRUCTIONS_SUCCESS",
        payload: {
          instructions: data,
          total
        }
      });
    })
    .catch(error => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: "GET_USER_INSTRUCTIONS_FAILED",
        payload: { errorMessage: message || error.message }
      });
    });
};

export const getInstructionsById = ({ id }) => (dispatch, getState) => {
  const { auth } = getState().user;
  const { accessToken } = auth || {};

  dispatch({ type: "GET_USER_INSTRUCTIONS_DETAILS_REQUEST" });

  axios({
    url: `${window.baseUrl}/instructions/${id}`,
    method: "GET",
    headers: {
      Authorization: `bearer ${accessToken}`
    }
  })
    .then(({ data: result }) => {
      const { data } = result;

      return dispatch({
        type: "GET_USER_INSTRUCTIONS_DETAILS_SUCCESS",
        payload: { instructionDetails: data }
      });
    })
    .catch(error => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: "GET_USER_INSTRUCTIONS_DETAILS_FAILED",
        payload: { errorMessage: message || error.message }
      });
    });
};

export const setPage = ({ page }) => (dispatch) => {
  dispatch({
    type: 'SET_PAGE_FOR_USER_INSTRUCTION',
    payload: { page }
  });
}

export const setStatusFilter = ({ status }) => (dispatch) => {
  dispatch({
    type: 'SET_STATUS_FILTER_FOR_INSTRUCTION',
    payload: { status }
  });
}
