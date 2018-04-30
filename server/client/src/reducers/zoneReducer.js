import { FETCH_ZONES, FETCH_LOCATION_ZONES } from '../actions/types';

export default function(state = null, action) {
  console.log(action.type);
  switch (action.type) {
    case FETCH_ZONES:
    case FETCH_LOCATION_ZONES:
      return action.payload || false;

    default:
      return state;
  }
}
