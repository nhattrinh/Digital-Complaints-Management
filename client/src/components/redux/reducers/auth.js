import { LOGIN, LOGOUT } from '../actions/types';

const INITIAL_STATE = {
  user: null
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload
      };

    case LOGOUT:
      return INITIAL_STATE;

    default:
      return state;
  } 
}
