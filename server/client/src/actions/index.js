import axios from 'axios';
import {
  FETCH_USER,
  FETCH_SITES,
  FETCH_LOCATIONS,
  FETCH_ZONES,
  FETCH_LOCATION_ZONES,
  FETCH_SITE_LOCATIONS,
  FETCH_ZONE_NODES,
  FETCH_LOCATION_CHARTS,
  FETCH_ZONE_CHARTS,
  FETCH_NODES,
  FETCH_REMOTEDATA
} from './types';

export const FetchRemoteData = () => async dispatch => {
  console.log('testing start');
  const res = await axios.get('/api/data');
  dispatch({ type: FETCH_REMOTEDATA, payload: res.data });
  console.log(res.data);

}

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/users');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchAllSites = () => async dispatch => {
  const res = await axios.get('/api/sites');

  dispatch({ type: FETCH_SITES, payload: res.data });
};

export const fetchAllLocations = () => async dispatch => {
  const res = await axios.get('/api/locations');
  console.log('Location Data' + JSON.stringify(res.data));
  dispatch({ type: FETCH_LOCATIONS, payload: res.data });
};

export const fetchAllZones = () => async dispatch => {
  const res = await axios.get('/api/zones');

  dispatch({ type: FETCH_ZONES, payload: res.data });
};
export const fetchAllNodes = () => async dispatch => {
  const res = await axios.get('/api/nodes');

  dispatch({ type: FETCH_NODES, payload: res.data });
};

export const fetchLocationZone = locationId => async dispatch => {
  const res = await axios.get(`/api/locations/${locationId}/zones`);

  dispatch({ type: FETCH_LOCATION_ZONES, payload: res.data });
};
export const fetchZoneNodes = zoneId => async dispatch => {
  const res = await axios.get(`/api/zones/${zoneId}/nodes`);
  dispatch({ type: FETCH_ZONE_NODES, payload: res.data });
};

export const fetchSiteLocations = siteId => async dispatch => {
  const res = await axios.get(`/api/sites/${siteId}/locations`);

  dispatch({ type: FETCH_SITE_LOCATIONS, payload: res.data });
};

export const fetchLocationCharts = values => async dispatch => {
  console.log('fetching location charts');
  const res = await axios.get(
    `/api/locations/${values.locationId}/conditions/?startTime=${
      values.startTime
    }&endTime=${values.endTime}`
  );

  dispatch({ type: FETCH_LOCATION_CHARTS, payload: res.data });
};

export const fetchZoneBarChart = values => async dispatch => {
  const res = await axios.get(
    `/api/zones/${values.zoneId}/conditions/?startTime=${
      values.startTime
    }&endTime=${values.endTime}`
  );
  console.log('fetching zone charts', res);
  dispatch({ type: FETCH_ZONE_CHARTS, payload: res.data });
};
