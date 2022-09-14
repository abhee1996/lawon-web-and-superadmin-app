import axios from 'axios';

export const saveFirmAwards = (dataFile) => (dispatch, getState) => {
  const { lawyerAccessToken, lawyer } = getState().auth;
  const { OrganizationId } = lawyer || {};

  dispatch({ type: 'SAVE_FIRM_AWARDS_REQUEST' });
  return axios({
    url: `${window.baseUrl}/organizations/${OrganizationId}/rewards`,
    method: 'POST',
    data: dataFile,
    headers: {
      Authorization: `bearer ${lawyerAccessToken}`
    }
  })
    .then(() => {
      dispatch({ type: 'SAVE_FIRM_AWARDS_SUCCESS' });

      return { isSubmit: true };
    })
    .catch((error) => {
      const { response } = error || {};
      const { data } = response || {};
      const { message } = data || {};
      const errorMessage = message || error.message;

      dispatch({
        type: 'SAVE_FIRM_AWARDS_FAILED',
        payload: { errorMessage }
      });

      return { errorMessage };
    });
}

export const getFirmAwards = () => (dispatch, getState) => {
  const { lawyerAccessToken, lawyer } = getState().auth;
  const { OrganizationId } = lawyer || {};

  dispatch({ type: 'GET_FIRM_AWARDS_REQUEST' });
  return axios({
    url: `${window.baseUrl}/organizations/${OrganizationId}/rewards`,
    method: 'GET',
    headers: {
      Authorization: `bearer ${lawyerAccessToken}`
    }
  })
    .then(({ data: result }) => {
      const { data } = result || {};

      dispatch({
        type: 'GET_FIRM_AWARDS_SUCCESS',
        payload: { awards: data }
      });
    })
    .catch((error) => {
      const { response } = error || {};
      const { data } = response || {};
      const { message } = data || {};
      const errorMessage = message || error.message;

      dispatch({
        type: 'GET_FIRM_AWARDS_FAILED',
        payload: { errorMessage }
      });
    });
}

export const saveFirmBranch = (data) => (dispatch, getState) => {
  const { lawyerAccessToken, lawyer } = getState().auth;
  const { OrganizationId } = lawyer || {};

  dispatch({ type: 'SAVE_FIRM_BRANCH_REQUEST' });
  return axios({
    url: `${window.baseUrl}/organizations/branch`,
    method: 'post',
    data: {
      ...data,
      organizationId: OrganizationId
    },
    headers: {
      Authorization: `bearer ${lawyerAccessToken}`
    }
  })
    .then(() => {
      dispatch({ type: 'SAVE_FIRM_BRANCH_REQUEST_SUCCESS' });

      return { isSubmit: true };
    })
    .catch((error) => {
      const { response } = error || {};
      const { data } = response || {};
      const { message } = data || {};
      const errorMessage = message || error.message;

      dispatch({ type: 'SAVE_FIRM_BRANCH_REQUEST_FAILED' });
      return { errorMessage };
    });
}

export const saveOrganizationPracticeArea = ({ practiceAreas }) => (dispatch, getState) => {
  const { auth } = getState();

  const { lawyer, lawyerAccessToken } = auth || {};
  const { OrganizationId } = lawyer || {};

  practiceAreas = practiceAreas.map(({ SubCategoryId }) => ({
    SubCategoryId,
    OrganizationId
  }));


  dispatch({ type: 'SAVE_ORGANIZATION_PRACTICE_AREA_REQUEST' });
  return axios({
    url: `${window.baseUrl}/organizations/practiceArea/${OrganizationId}`,
    method: 'POST',
    data: {
      organizationPracticeAreas: practiceAreas
    },
    headers: {
      Authorization: `bearer ${lawyerAccessToken}`
    }
  })
    .then(() => {
      dispatch({ type: 'SAVE_ORGANIZATION_PRACTICE_AREA_SUCCESS' });
      return { isSubmit: true };
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response || {};
      const { message } = data || {};
      const errorMessage = message || error.message || {};

      dispatch({
        type: 'SAVE_ORGANIZATION_PRACTICE_AREA_FAILED',
        payload: { errorMessage }
      });

      return { errorMessage };
    });
}

export const getOrganizationPracticeArea = () => (dispatch, getState) => {
  const { auth } = getState();
  const { lawyerAccessToken, lawyer } = auth || {};
  const { OrganizationId } = lawyer || {};


  dispatch({ type: 'GET_ORGANIZATION_PRACTICE_AREA_REQUEST' });
  return axios({
    url: `${window.baseUrl}/organizations/practicearea`,
    method: 'get',
    params: {
      OrganizationId
    },
    headers: {
      Authorization: `bearer ${lawyerAccessToken}`
    }
  })
    .then(({ data: result }) => {
      const { data = [] } = result || {};

      dispatch({
        type: 'GET_ORGANIZATION_PRACTICE_AREA_SUCCESS',
        payload: { practiceArea: data }
      });

      return { practiceAreas: data };
    })
    .catch((error) => {
      const { response } = error || {};
      const { data } = response || {};
      const { message } = data || {};
      const errorMessage = message || error.message;
      dispatch({
        type: 'GET_ORGANIZATION_PRACTICE_AREA_FAILED',
        payload: { errorMessage }
      });

      return { errorMessage };
    });
}

export const getCategory = () => (dispatch) => {
  dispatch({ type: 'GET_CATEGORY_FOR_MANAGE_FIRM_REQUEST' });
  axios({
    url: `${window.baseUrl}/categories`,
    method: 'GET',
  })
    .then(({ data: result }) => {
      const { data } = result || {};

      dispatch({
        type: 'GET_CATEGORY_FOR_MANAGE_FIRM_SUCCESS',
        payload: { categories: data }
      });
    })
    .catch((error) => {
      dispatch({
        type: 'GET_CATEGORY_FOR_MANAGE_FIRM_FAILED',
        payload: { errorMessage: error.message }
      });
    });
}

export const getSubCategory = ({ categoryId }) => (dispatch) => {
  dispatch({ type: 'GET_SUBCATEGORY_FOR_MANAGE_FIRM_REQUEST' });
  return axios({
    url: `${window.baseUrl}/subCategories`,
    method: 'get',
    params: {
      CategoryId: categoryId
    }
  })
    .then(({ data: result }) => {
      const { data } = result || {};

      dispatch({
        type: 'GET_SUBCATEGORY_FOR_MANAGE_FIRM_SUCCESS',
        payload: { subCategories: data }
      });
    })
    .catch((error) => {
      dispatch({
        type: 'GET_SUBCATEGORY_FOR_MANAGE_FIRM_FAILED',
        payload: { errorMessage: error.message }
      });
    });
}

export const getBranches = () => (dispatch, getState) => {
  const { lawyerAccessToken, lawyer } = getState().auth;
  const { OrganizationId } = lawyer || {};

  dispatch({ type: 'GET_FIRM_BRANCHES_REQUEST' });
  axios({
    url: `${window.baseUrl}/organizations/${OrganizationId}/branch`,
    method: 'GET',
    headers: {
      Authorization: `bearer ${lawyerAccessToken}`
    }
  })
    .then(({ data: result }) => {
      const { data } = result || {};

      dispatch({
        type: 'GET_FIRM_BRANCHES_SUCCESS',
        payload: { branches: data }
      });
    })
    .catch((error) => {
      const { response } = error || {};
      const { data } = response || {};
      const { message } = data || {};

      dispatch({ type: 'GET_FIRM_BRANCHES_FAILED' });
    });
}

export const deleteBranches = ({ id }) => (dispatch, getState) => {
  const { lawyerAccessToken } = getState().auth;

  dispatch({ type: 'DELETE_FIRM_BRANCHES_REQUEST' });
  return axios({
    url: `${window.baseUrl}/organizations/branch/${id}`,
    method: 'DELETE',
    headers: {
      Authorization: `bearer ${lawyerAccessToken}`
    }
  })
    .then(() => {
      dispatch({ type: 'DELETE_FIRM_BRANCHES_SUCCESS' });
      return { isDeleted: true };
    })
    .catch((error) => {
      const { response } = error || {};
      const { data } = response || {};
      const { message } = data || {};

      dispatch({ type: 'DELETE_FIRM_BRANCHES_FAILED' });
      return { error: message || error.message };
    });
}

export const deleteReward = ({ id }) => (dispatch, getState) => {
  const { lawyerAccessToken } = getState().auth;

  dispatch({ type: 'DELETE_FIRM_REWARD_REQUEST' });
  return axios({
    url: `${window.baseUrl}/organizations/rewards/${id}`,
    method: 'DELETE',
    headers: {
      Authorization: `bearer ${lawyerAccessToken}`
    }
  })
    .then(() => {
      dispatch({ type: 'DELETE_FIRM_REWARD_SUCCESS' });
      return { isDeleted: true };
    })
    .catch((error) => {
      const { response } = error || {};
      const { data } = response || {};
      const { message } = data || {};

      dispatch({ type: 'DELETE_FIRM_REWARD_FAILED' });
      return { error: message || error.message };
    });
}
