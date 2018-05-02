import { FETCH_LOCATIONS, FETCH_SITE_LOCATIONS } from '../actions/types';

export default function(state = null, action) {
  console.log(action.type);
  switch (action.type) {
    case FETCH_LOCATIONS:
      return action.payload || false;
    case FETCH_SITE_LOCATIONS:
      return action.payload || false;

    default:
      return state;
  }
}
