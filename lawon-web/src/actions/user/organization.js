import axios from "axios";

export const getOrganization = ({ id }) => (dispatch, getState) => {
  const { auth } = getState().user;
  const { accessToken } = auth || {};

  dispatch({ type: "GET_ORGANIZATION_DETAILS_REQUEST" });

  axios({
    url: `${window.baseUrl}/organizations/profile/${id}`,
    method: "GET",
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
  })
    .then(({ data: result }) => {
      const { data } = result;

      return dispatch({
        type: "GET_ORGANIZATION_DETAILS_SUCCESS",
        payload: { organizationDetails: data },
      });
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: "GET_ORGANIZATION_DETAILS_FAILED",
        payload: { errorMessage: message || error.message },
      });
    });
};
