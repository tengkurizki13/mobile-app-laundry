import {
  TRACKS_FETCH_SUCCESS,
} from "../actions/actionType";

const inisialState = {
  tracks: [],
};

function trackReducer(state = inisialState, action) {
  switch (action.type) {
    case TRACKS_FETCH_SUCCESS:
      return {
        ...state,
        tracks: action.payload,
      };
    default:
      return state;
  }
}

export default trackReducer;
