import { FETCH_NODES, FETCH_ZONE_NODES } from '../actions/types';

export default function(state = null, action) {
  console.log(action.type);
  switch (action.type) {
    case FETCH_NODES:
    case FETCH_ZONE_NODES:
      return action.payload || false;

    default:
      return state;
  }
}
