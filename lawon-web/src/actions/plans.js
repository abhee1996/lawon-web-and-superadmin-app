import axios from 'axios';

export const getPlans = () => (dispatch) => {
  dispatch({ type: 'GET_SUBSCRIPTION_PLANS_REQUEST' });

  axios({
    url: `${window.baseUrl}/subscriptions`,
    method: 'GET'
  })
    .then(({ data: result }) => {
      const { data: plans } = result || {};
      
      dispatch({
        type: 'GET_SUBSCRIPTION_PLANS_SUCCESS',
        payload: { plans }
      });
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};

      dispatch({
        type: "GET_SUBSCRIPTION_PLANS_FAILED",
        payload: { errorMessage: message || error.message }
      });
    });
}