import axios from "axios";

export const getLawyerProfile = ({ lawyerId }) => (dispatch, getState) => {
  const { auth } = getState().user;
  const { accessToken } = auth || {};

  dispatch({ type: "GET_LAWYER_PROFILE_REQUEST" });
  return axios({
    url: `${window.baseUrl}/lawyers/profile/${lawyerId}`,
    method: "get",
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
  })
    .then(({ data: result }) => {
      const { data:lawyerProfileDetails } = result || {};
        dispatch({
          type: "GET_LAWYER_PROFILE_SUCCESS",
          payload: { lawyerProfileDetails },
        });
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: "GET_LAWYER_PROFILE_FAILED",
        payload: { errorMessage: message || error.message },
      });
    });
};
