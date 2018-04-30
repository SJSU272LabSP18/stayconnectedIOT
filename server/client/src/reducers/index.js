import { combineReducers } from 'redux';
import authReducer from './authReducer';
import siteReducer from './siteReducer';
import locationReducer from './locationReducer';
import zoneReducer from './zoneReducer';
import chartReducer from './chartReducer';
export default combineReducers({
  auth: authReducer,
  sites: siteReducer,
  locations: locationReducer,
  zones: zoneReducer,
  charts: chartReducer
});
