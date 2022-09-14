import axios from 'axios';

export const getConsultationByDate = () => (dispatch, getState) => {
  const { lawyerAccessToken, lawyer } = getState().auth;
  const { id } = lawyer || {};

  dispatch({ type: 'GET_LAWYER_CALENDAR_REQUEST' });

  return axios({
    url: `${window.baseUrl}/consultations/calendar/${id}`,
    method: 'GET',
    headers: {
      Authorization: `bearer ${lawyerAccessToken}`
    }
  })
    .then(({ data: result }) => {
      const { data } = result;

      dispatch({
        type: 'GET_LAWYER_CALENDAR_SUCCESS',
        payload: { calendars: data }
      });

    })
    .catch(({ response }) => {
      if (response) {
        const { data: { status, message } } = response;
        return dispatch({
          type: 'GET_LAWYER_CALENDAR_SUCCESS',
          payload: { calendars: [] }
        });
      }

      return dispatch({
        type: 'GET_LAWYER_CALENDAR_FAILED',
        payload: 'Network Error'
      });
    });
}
