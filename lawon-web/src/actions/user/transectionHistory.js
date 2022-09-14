import axios from "axios";

export const userTransectionHistory = () => (dispatch, getState) => {
  const { auth } = getState().user;
  const { accessToken, user } = auth || {};
  // const { id } = user || {};
  let id = 2;
  dispatch({ type: "USER_TRANSECTION_HISTORY_REQUEST" });

  axios({
    url: `${window.baseUrl}/transections/user?userId=${id}`,
    method: "GET",
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
  })
    .then(({ data: { data: alltransection } }) => {
      return dispatch({
        type: "USER_TRANSECTION_HISTORY_SUCCESS",
        payload: { alltransection },
      });
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: "USER_TRANSECTION_HISTORY_FAILED",
        payload: { errorMessage: message || error.message },
      });
    });
};

export const userTransectionHistoryFilter = ({ searchData }) => (
  dispatch,
  getState
) => {
  const { auth } = getState().user;
  const { accessToken, user } = auth || {};
  // const { id } = user || {};
  let id = 2;
  dispatch({ type: "USER_TRANSECTION_HISTORY_FILTER_REQUEST" });

  axios({
    url: `${
      window.baseUrl
    }/transections/user?userId=${id}&searchTerm=${searchData}`,
    method: "GET",
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
  })
    .then(({ data: { data: alltransection } }) => {
      return dispatch({
        type: "USER_TRANSECTION_HISTORY_FILTER_SUCCESS",
        payload: { alltransection },
      });
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: "USER_TRANSECTION_HISTORY_FILTER_FAILED",
        payload: { errorMessage: message || error.message },
      });
    });
};

export const clearError = () => (dispatch) => {
  dispatch({ type: "CLEAR_ERROR_MESSAGE" });
};
