const initialState = {
  loading: false,
  cards: [],
  quotation: {},
  payments: [],
  total: 0,
  pagination: {
    page: 1,
    pageSize: 10
  },
  searchTerm: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PAYMENY_HISTORY_FOR_USER_REQUEST':
    case 'DELETE_USER_CARD_FOR_PAYMENT_REQUEST':
    case 'GET_CONSULTATION_QUOTATION_REQUEST':
    case "PAY_USER_INSTRUCTION_BY_QUESTION_REQUEST":
    case "GET_USER_QUESTION_QUOTATION_REQUEST":
    case "GET_USER_CARDS_REQUEST": {
      return {
        ...state,
        loading: true
      };
    }
    case 'SET_SEARCH_FILTER_FOR_USER_PAYMENT':
    case 'GET_PAYMENY_HISTORY_FOR_USER_FAILED':
    case 'GET_PAYMENY_HISTORY_FOR_USER_SUCCESS':
    case 'DELETE_USER_CARD_FOR_PAYMENT_FAILED':
    case 'DELETE_USER_CARD_FOR_PAYMENT_SUCCESS':
    case 'GET_CONSULTATION_QUOTATION_FAILED':
    case 'GET_CONSULTATION_QUOTATION_SUCCESS':
    case "PAY_USER_INSTRUCTION_BY_QUESTION_FAILED":
    case "PAY_USER_INSTRUCTION_BY_QUESTION_SUCCESS":
    case 'GET_USER_QUESTION_QUOTATION_SUCCESS':
    case 'GET_USER_QUESTION_QUOTATION_FAILED':
    case 'GET_USER_CARDS_FAILED':
    case "GET_USER_CARDS_SUCCESS": {
      return {
        ...state,
        loading: false,
        ...action.payload
      };
    }
    case 'SET_PAGE_FOR_USER_PAYMENT_HISTOEY': {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...action.payload
        }
      }
    }
    default: {
      return state;
    }
  }
};

export default reducer;
