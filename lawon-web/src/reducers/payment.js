const initialState = {
  loading: false,
  cards: [],
  invoices: [],
  nextBill: {},
  billingDetails: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LAWYER_DEFAULT_CARD_REQUEST':
    case 'GET_LAWYER_BILLING_DETAILS_REQUEST':
    case 'GET_LAWYER_NEXT_BILL_REQUEST':
    case "GET_LAWYER_INVOICES_REQUEST":
    case "LAWYER_ADD_CARD_REQUEST":
    case "GET_LAWYER_CARDS_REQUEST": {
      return {
        ...state,
        loading: true,
      };
    }
    case 'SET_LAWYER_DEFAULT_CARD_FAILED':
    case 'SET_LAWYER_DEFAULT_CARD_SUCCESS':
    case "GET_LAWYER_BILLING_DETAILS_FAILED":
    case "GET_LAWYER_BILLING_DETAILS_SUCCESS":
    case 'GET_LAWYER_NEXT_BILL_FAILED':
    case 'GET_LAWYER_NEXT_BILL_SUCCESS':
    case 'GET_LAWYER_INVOICES_SUCCESS':
    case 'GET_LAWYER_INVOICES_FAILED':
    case 'LAWYER_DELETE_CARD_SUCCESS':
    case "LAWYER_ADD_CARD_SUCCESS" :
    case "GET_LAWYER_CARDS_SUCCESS": {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
