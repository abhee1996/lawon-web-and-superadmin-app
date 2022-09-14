let initialState = {
  loading: false,
  errorMessage: "",
  organizationProfile: {},
  data: {},
  firmProfileData: {},
  inviteLawyers: {},
  cards: {},
  colleagues: []
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ORGANIZATION_ADMIN_PROFILE_SETUP_REQUEST": {
      return {
        ...state,
        loading: true,
      };
    }
    case "ORGANIZATION_ADMIN_PROFILE_SETUP_SUCCESS": {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }
    case "ORGANIZATION_ADMIN_PROFILE_SETUP_FAILED": {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }
    case "ORGANIZATION_FIRM_PROFILE_SETUP_REQUEST": {
      return {
        ...state,
        loading: true,
      };
    }
    case "ORGANIZATION_FIRM_PROFILE_SETUP_SUCCESS": {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }
    case "ORGANIZATION_FIRM_PROFILE_SETUP_FAILED": {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }

    case "GET_COLLEAGUES_REQUEST": {
      return {
        ...state,
        loading: true,
      };
    }
    case "GET_COLLEAGUES_SUCCESS": {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }
    case "GET_COLLEAGUES_FAILED": {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }
    case "ORGANIZATION_INVITE_LAWYER_REQUEST": {
      return {
        ...state,
        loading: true,
      };
    }
    case "ORGANIZATION_INVITE_LAWYER_SUCCESS": {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }
    case "ORGANIZATION_INVITE_LAWYER_FAILED": {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }
    case "ORGANIZATION_ADD_CARD_REQUEST": {
      return {
        ...state,
        loading: true,
      };
    }
    case "ORGANIZATION_ADD_CARD_SUCCESS": {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }
    case "ORGANIZATION_ADD_CARD_FAILED": {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }
    case "GET_LAT_LNG_FOR_ORGANIZATION_REQUEST": {
      return {
        ...state,
        loading: true,
      };
    }
    case "GET_LAT_LNG_FOR_ORGANIZATION_SUCCESS": {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }
    case "GET_LAT_LNG_FOR_ORGANIZATION_FAILED": {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }

    case "CLEAR_ERROR_MESSAGE_ORGANIZATION": {
      return {
        ...state,
        loading: false,
        errorMessage: "",
      };
    }

    default: {
      return initialState;
    }
  }
};

export default reducer;
