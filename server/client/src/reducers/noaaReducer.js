import { FETCH_NOAA } from '../actions/types';

export default function(state = null, action) {
  console.log(action);
  switch (action.type) {
    case FETCH_NOAA:
      return action.payload || false;

    default:
      return state;
  }
}
