import { FETCH_USER, FETCH_USER_LOGIN } from '../actions/types';

export default function(state = null, action) {
  console.log(action);
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;

    default:
      return state;
  }
}

export default function(state = null, action) {
    console.log(action);
    switch (action.type) {
        case FETCH_USER_LOGIN:
            return action.payload || false;

        default:
            return state;
    }
}
