import { combineReducers } from 'redux';
import authReducer from './authReducer';
import siteReducer from './siteReducer';
import locationReducer from './locationReducer';
import zoneReducer from './zoneReducer';
import chartReducer from './chartReducer';
import nodeReducer from './nodeReducer';
import noaaReducer from './noaaReducer';
export default combineReducers({
  auth: authReducer,
  sites: siteReducer,
  locations: locationReducer,
  zones: zoneReducer,
  charts: chartReducer,
  nodes: nodeReducer,
  noaa: noaaReducer
});
