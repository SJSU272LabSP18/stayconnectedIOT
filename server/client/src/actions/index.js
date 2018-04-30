import axios from 'axios';
import {
  FETCH_USER,
  FETCH_SITES,
  FETCH_LOCATIONS,
  FETCH_ZONES,
  FETCH_LOCATION_ZONES,
  FETCH_SITE_LOCATIONS,
  FETCH_LOCATION_CHARTS
} from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchAllSites = () => async dispatch => {
  const res = await axios.get('/api/sites');

  dispatch({ type: FETCH_SITES, payload: res.data });
};

export const fetchAllLocations = () => async dispatch => {
  const res = await axios.get('/api/locations');

  dispatch({ type: FETCH_LOCATIONS, payload: res.data });
};

export const fetchAllZones = () => async dispatch => {
  const res = await axios.get('/api/zones');

  dispatch({ type: FETCH_ZONES, payload: res.data });
};

export const fetchLocationZone = locationId => async dispatch => {
  const res = await axios.get(`/api/locations/${locationId}/zones`);

  dispatch({ type: FETCH_LOCATION_ZONES, payload: res.data });
};

export const fetchSiteLocations = siteId => async dispatch => {
  const res = await axios.get(`/api/sites/${siteId}/locations`);

  dispatch({ type: FETCH_SITE_LOCATIONS, payload: res.data });
};

export const fetchLocationCharts = values => async dispatch => {
  console.log('fetching location charts');
  const res = await axios.get(
    `/conditions/locations/${values.locationId}/?startTime=${
      values.startTime
    }&endTime=${values.endTime}`
  );

  dispatch({ type: FETCH_LOCATION_CHARTS, payload: res.data });
};
