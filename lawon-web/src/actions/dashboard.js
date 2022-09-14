import axios from 'axios';

export const getOpenEnquiries = () => (dispatch, getState) => {
  const { lawyer } = getState().auth;
  const { id } = lawyer || {};

  dispatch({ type: "GET_OPEN_ENQUIRIES_FOR_LAWYERS_DASHBOARD_REQUEST" });

  return axios({
    url: `${window.baseUrl}/enquiries/lawyer/${id}/open-enquiries`,
    method: 'GET',
    params: {
      skip: 0,
      limit: 5
    }
  })
    .then(({ data: result }) => {
      const { data } = result || {};
      const { rows } = data || {};

      dispatch({
        type: "GET_OPEN_ENQUIRIES_FOR_LAWYERS_DASHBOARD_SUCCESS",
        payload: { openEnquiries: rows },
      });
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: "GET_OPEN_ENQUIRIES_FOR_LAWYERS_DASHBOARD_FAILED",
        payload: { errorMessage: message || error.message },
      });
    });
};
