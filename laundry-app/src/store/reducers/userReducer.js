import {
  USERS_BY_ID_FETCH_SUCCESS,
  USERS_FETCH_SUCCESS,
} from "../actions/actionType";

const inisialState = {
  users: [],
  user: {},
};

function userReducer(state = inisialState, action) {
  switch (action.type) {
    case USERS_FETCH_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case USERS_BY_ID_FETCH_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}

export default userReducer;
