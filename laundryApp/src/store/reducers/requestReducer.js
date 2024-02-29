import {
  REQUESTS_BY_ID_FETCH_SUCCESS,
  REQUESTS_FETCH_SUCCESS,
  REQUESTS_OWNER_FETCH_SUCCESS,
} from "../actions/actionType";

const inisialState = {
  requests: [],
  requestsOwner: [],
  request: {},
};

function requestReducer(state = inisialState, action) {
  switch (action.type) {
    case REQUESTS_FETCH_SUCCESS:
      return {
        ...state,
        requests: action.payload,
      };
    case REQUESTS_BY_ID_FETCH_SUCCESS:
      return {
        ...state,
        request: action.payload,
      };
    case REQUESTS_OWNER_FETCH_SUCCESS:
      return {
        ...state,
        requestsOwner: action.payload,
      };
    default:
      return state;
  }
}

export default requestReducer;
