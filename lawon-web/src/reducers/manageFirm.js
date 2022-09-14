const initialState = {
    loading: false,
    errorMessage: '',
    awards:[],
    branches:[],
    firmAllInfo:[],
    categories: []
  }
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'DELETE_FIRM_REWARD_REQUEST':
      case 'GET_FIRM_BRANCHES_REQUEST':
      case 'SAVE_ORGANIZATION_PRACTICE_AREA_REQUEST':
      case 'GET_SUBCATEGORY_FOR_MANAGE_FIRM_REQUEST':
      case 'GET_CATEGORY_FOR_MANAGE_FIRM_REQUEST':
      case 'GET_FIRM_AWARDS_REQUEST':
      case 'SAVE_FIRM_AWARDS_REQUEST': {
        return {
          ...state,
          loading: true
        };
      }
      case 'DELETE_FIRM_REWARD_FAILED':
      case 'DELETE_FIRM_REWARD_SUCCESS':
      case 'GET_FIRM_BRANCHES_FAILED':
      case 'GET_FIRM_BRANCHES_SUCCESS':
      case 'SAVE_ORGANIZATION_PRACTICE_AREA_FAILED':
      case 'SAVE_ORGANIZATION_PRACTICE_AREA_SUCCESS':
      case 'GET_ORGANIZATION_PRACTICE_AREA_FAILED':
      case 'GET_ORGANIZATION_PRACTICE_AREA_SUCCESS':
      case 'GET_SUBCATEGORY_FOR_MANAGE_FIRM_FAILED':
      case 'GET_SUBCATEGORY_FOR_MANAGE_FIRM_SUCCESS':
      case 'GET_CATEGORY_FOR_MANAGE_FIRM_FAILED':
      case 'GET_CATEGORY_FOR_MANAGE_FIRM_SUCCESS':
      case 'GET_FIRM_AWARDS_FAILED':
      case 'GET_FIRM_AWARDS_SUCCESS':
      case 'SAVE_FIRM_AWARDS_FAILED':
      case 'SAVE_FIRM_AWARDS_SUCCESS': {
        return {
          ...state,
          loading: false,
          ...action.payload
        };
      }


      case 'SAVE_FIRM_BRANCH_REQUEST': {
        return {
          ...state,
          loading: true
        };
      }
      case 'SAVE_FIRM_BRANCH_REQUEST_SUCCESS': {
        return {
          ...state,
          loading: false,
          ...action.payload
        };
      }
      case 'SAVE_FIRM_BRANCH_REQUEST_FAILED': {
        return {
          ...state,
          loading: false,
          errorMessage: action.payload
        };
      }

      default: {
        return state;
      }
    }
  }
  
  export default reducer;