import axios from 'axios';
import { INSTRUCTION_STATUS } from '../common/constants';

export const getInstructions = () => (dispatch, getState) => {
  const { lawyerAccessToken, lawyer } = getState().auth;
  const { id } = lawyer || {};

  const { pagination } = getState().instruction;
  const { page, pageSize } = pagination;

  dispatch({ type: 'GET_LAWYER_INSTRUCTION_REQUEST' });

  return axios({
    url: `${window.baseUrl}/instructions/all/lawyer/${id}`,
    method: 'GET',
    headers: {
      Authorization: `bearer ${lawyerAccessToken}`
    },
    params: {
      skip: (page - 1) * pageSize,
      limit: pageSize,
    }
  })
    .then(({ data: result }) => {
      const { data } = result;
      const { count: total, rows: instructions } = data || {};

      return dispatch({
        type: 'GET_LAWYER_INSTRUCTION_SUCCESS',
        payload: { instructions, total }
      });

    })
    .catch(({ response }) => {
      if (response) {
        const { data: { status, message } } = response;
        return dispatch({
          type: 'GET_LAWYER_INSTRUCTION_SUCCESS',
          payload: { instructions: [] }
        });
      }

      return dispatch({
        type: 'GET_LAWYER_INSTRUCTION_FAILED',
        payload: 'Network Error'
      });
    });
}

export const getInstructionsById = ({ id }) => (dispatch, getState) => {
  const { lawyerAccessToken } = getState().auth;

  dispatch({ type: 'GET_LAWYER_INSTRUCTION_BY_ID_REQUEST' });
  return axios({
    url: `${window.baseUrl}/instructions/${id}/lawyer`,
    method: 'GET',
    headers: {
      Authorization: `bearer ${lawyerAccessToken}`
    }
  })
    .then(({ data: result }) => {
      const { data } = result;

      return dispatch({
        type: 'GET_LAWYER_INSTRUCTION_BY_ID_SUCCESS',
        payload: { instructionDetails: data }
      });

    })
    .catch((error) => {
      const { response } = error || {};
      const { data } = response || {};
      const { message } = data || {};

      dispatch({ type: 'GET_LAWYER_INSTRUCTION_BY_ID_FAILED' });
    });
}

export const submitNote = ({ id, content }) => (dispatch, getState) => {
  const { lawyerAccessToken } = getState().auth;

  dispatch({ type: 'SUBMIT_INSTRUCTION_NOTE_REQUEST' });

  return axios({
    url: `${window.baseUrl}/instructions/notes`,
    method: 'POST',
    data: {
      InstructionId: id,
      content
    },
    headers: {
      Authorization: `bearer ${lawyerAccessToken}`
    }
  })
    .then(() => {
      dispatch({ type: 'SUBMIT_INSTRUCTION_NOTE_SUCCESS' });
      
      return { isSubmit: true };
    })
    .catch((error) => {
      const { response } = error || {};
      const { data } = response || {};
      const { message } = data || {};
      const errorMessage = message || error.message;

      dispatch({ type: 'GET_LAWYER_INSTRUCTION_FAILED' });
      
      return { errorMessage };
    });
}

export const markAsComplete = ({ id }) => (dispatch, getState) => {
  const { lawyerAccessToken } = getState().auth;

  dispatch({ type: 'MARK_INSTRUCTION_AS_COMPLETE_REQUEST' });

  return axios({
    url: `${window.baseUrl}/instructions/${id}`,
    method: 'PUT',
    data: {
      status: INSTRUCTION_STATUS.CLOSED
    },
    headers: {
      Authorization: `bearer ${lawyerAccessToken}`
    }
  })
    .then(() => {
      dispatch({ type: 'MARK_INSTRUCTION_AS_COMPLETE_SUCCESS' });
      
      return { isSubmit: true };
    })
    .catch((error) => {
      const { response } = error || {};
      const { data } = response || {};
      const { message } = data || {};
      const errorMessage = message || error.message;

      dispatch({ type: 'MARK_INSTRUCTION_AS_COMPLETE_FAILED' });
      
      return { errorMessage };
    });
}

export const setPage = ({ page }) => (dispatch) => {
  dispatch({
    type: 'SET_PAGE_FOR_LAWYER_INSTRUCTIONS',
    payload: { page }
  });
}
