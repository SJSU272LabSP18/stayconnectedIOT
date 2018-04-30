import { FETCH_LOCATION_CHARTS } from '../actions/types';

export default function(state = null, action) {
  console.log(action.type);
  switch (action.type) {
    case FETCH_LOCATION_CHARTS:
      return action.payload || false;

    default:
      return state;
  }
}
