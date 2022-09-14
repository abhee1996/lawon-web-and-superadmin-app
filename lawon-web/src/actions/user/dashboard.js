import axios from "axios";

export const getEnqueryState = () => (dispatch, getState) => {
  const { auth } = getState().user;
  const { accessToken, user } = auth || {};
  const { id } = user || {};

  dispatch({ type: "GET_ENQUERY_STATES_FOR_USER_DASHBOARD_REQUEST" });
  return axios({
    url: `${window.baseUrl}/dashboard/user/${id}/enquery`,
    method: "GET",
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
  })
    .then(({ data: result }) => {
      const { data } = result || {};
        dispatch({
          type: "GET_ENQUERY_STATES_FOR_USER_DASHBOARD_SUCCESS",
          payload: { state: data },
        });
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: "GET_ENQUERY_STATES_FOR_USER_DASHBOARD_FAILED",
        payload: { errorMessage: message || error.message },
      });
    });
};

export const getConsultationState = () => (dispatch, getState) => {
  const { auth } = getState().user;
  const { accessToken, user } = auth || {};
  const { id } = user || {};

  dispatch({ type: "GET_CONSULTATION_STATES_FOR_USER_DASHBOARD_REQUEST" });
  return axios({
    url: `${window.baseUrl}/dashboard/user/${id}/consultation`,
    method: "GET",
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
  })
    .then(({ data: result }) => {
      const { data } = result || {};
        dispatch({
          type: "GET_CONSULTATION_STATES_FOR_USER_DASHBOARD_SUCCESS",
          payload: { consultationState: data },
        });
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: "GET_CONSULTATION_STATES_FOR_USER_DASHBOARD_FAILED",
        payload: { errorMessage: message || error.message },
      });
    });
};

export const getInstructionState = () => (dispatch, getState) => {
  const { auth } = getState().user;
  const { accessToken, user } = auth || {};
  const { id } = user || {};

  dispatch({ type: "GET_INSTRUCTION_STATES_FOR_USER_DASHBOARD_REQUEST" });
  return axios({
    url: `${window.baseUrl}/dashboard/user/${id}/instructions`,
    method: "GET",
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
  })
    .then(({ data: result }) => {
      const { data } = result || {};
        dispatch({
          type: "GET_INSTRUCTION_STATES_FOR_USER_DASHBOARD_SUCCESS",
          payload: { instructionState: data },
        });
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: "GET_INSTRUCTION_STATES_FOR_USER_DASHBOARD_FAILED",
        payload: { errorMessage: message || error.message },
      });
    });
};

export const getHistory = () => (dispatch, getState) => {
  const { auth, dashboard } = getState().user;
  const { accessToken, user } = auth || {};
  const { id } = user || {};

  const { history } = dashboard || {};
  const { year} = history || {};

  dispatch({ type: "GET_HISTORY_FOR_USER_DASHBOARD_REQUEST" });
  return axios({
    url: `${window.baseUrl}/dashboard/user/${id}/history/${year}`,
    method: "GET",
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
  })
    .then(({ data: result }) => {
      const { data } = result || {};
        dispatch({
          type: "GET_HISTORY_FOR_USER_DASHBOARD_SUCCESS",
          payload: { historyStats: data },
        });
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: "GET_HISTORY_FOR_USER_DASHBOARD_FAILED",
        payload: { errorMessage: message || error.message },
      });
    });
};

export const getUpcomingEvents = () => (dispatch, getState) => {
  const { auth } = getState().user;
  const { accessToken, user } = auth || {};
  const { id } = user || {};

  dispatch({ type: "GET_UPCOMING_EVENT_FOR_USER_DASHBOARD_REQUEST" });
  return axios({
    url: `${window.baseUrl}/dashboard/user/${id}/upcoming-events`,
    method: "GET",
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
  })
    .then(({ data: result }) => {
      const { data } = result || {};
        dispatch({
          type: "GET_UPCOMING_EVENT_FOR_USER_DASHBOARD_SUCCESS",
          payload: { events: data },
        });
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: "GET_UPCOMING_EVENT_FOR_USER_DASHBOARD_FAILED",
        payload: { errorMessage: message || error.message },
      });
    });
};

export const setHistoryFilter = ({ year }) => (dispatch) => {
  dispatch({
    type: 'SET_YEAR_FILTER_FOR_USER_DASHBOARD',
    payload: { year }
  })
}

export const getActivities = () => (dispatch, getState) => {
  const { auth } = getState().user;
  const { accessToken, user } = auth || {};
  const { id } = user || {};

  dispatch({ type: "GET_ACTIVITIES_FOR_USER_DASHBOARD_REQUEST" });
  return axios({
    url: `${window.baseUrl}/dashboard/user/${id}/activities`,
    method: "GET",
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
  })
    .then(({ data: result }) => {
      const { data } = result || {};
        dispatch({
          type: "GET_ACTIVITIES_FOR_USER_DASHBOARD_SUCCESS",
          payload: { activities: data },
        });
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: "GET_ACTIVITIES_FOR_USER_DASHBOARD_FAILED",
        payload: { errorMessage: message || error.message },
      });
    });
};
