import { FETCH_SITES } from '../actions/types';

export default function(state = null, action) {
  console.log(action.type);
  switch (action.type) {
    case FETCH_SITES:
      return action.payload || false;

    default:
      return state;
  }
}
