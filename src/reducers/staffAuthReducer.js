const initialState = {
    accessToken: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    staffInfo: null, 
  };
  
  const staffAuthReducer = (state = initialState, action) => {
    switch (action.type) {
      case "STAFF_AUTH_LOADING":
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      case "STAFF_AUTH_DONE":
        return {
          ...state,
          isLoading: false,
        };
      case "STAFF_LOGIN_SUCCESS":
        return {
          ...state,
          accessToken: action.payload.accessToken,
          isAuthenticated: true,
          staffInfo: action.payload.staffInfo || null,
          error: null,
          isLoading: false,
        };
      case "STAFF_LOGIN_FAILURE":
        return {
          ...state,
          accessToken: null,
          isAuthenticated: false,
          staffInfo: null,
          error: action.payload,
          isLoading: false,
        };
      case "STAFF_SET_AUTH":
        return {
          ...state,
          accessToken: action.payload.accessToken,
          staffInfo: action.payload.staffInfo || null,
          isAuthenticated: true,
          error: null,
          isLoading: false,
        };
      case "STAFF_LOGOUT":
        return {
          ...state,
          accessToken: null,
          isAuthenticated: false,
          staffInfo: null,
          error: null,
          isLoading: false,
        };
      default:
        return state;
    }
  };
  
  export default staffAuthReducer;
  