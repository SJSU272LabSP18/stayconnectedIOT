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
  FETCH_USER_LOGIN
} from './types';



export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/users');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchAllSites = (accessToken) => async dispatch => {
  const res = await axios.get('/api/sites', { headers: { Authorization: accessToken } });

  dispatch({ type: FETCH_SITES, payload: res.data });
};

export const fetchAllLocations = (accessToken) => async dispatch => {
  const res = await axios.get('/api/locations',  { headers: { Authorization: accessToken } });
  console.log('Location Data' + JSON.stringify(res.data));
  dispatch({ type: FETCH_LOCATIONS, payload: res.data });
};

export const fetchAllZones = (accessToken) => async dispatch => {
  const res = await axios.get('/api/zones', { headers: { Authorization: accessToken } });

  dispatch({ type: FETCH_ZONES, payload: res.data });
};
export const fetchAllNodes = (accessToken) => async dispatch => {
  const res = await axios.get('/api/nodes',{ headers: { Authorization: accessToken } });

  dispatch({ type: FETCH_NODES, payload: res.data });
};

export const fetchLocationZone = (locationId,accessToken) => async dispatch => {
  const res = await axios.get(`/api/locations/${locationId}/zones`,{ headers: { Authorization: accessToken } });

  dispatch({ type: FETCH_LOCATION_ZONES, payload: res.data });
};
export const fetchZoneNodes = (zoneId, accessToken) => async dispatch => {
  const res = await axios.get(`/api/zones/${zoneId}/nodes`,{ headers: { Authorization: accessToken } });
  dispatch({ type: FETCH_ZONE_NODES, payload: res.data });
};

export const fetchSiteLocations = (siteId, accessToken) => async dispatch => {
  const res = await axios.get(`/api/sites/${siteId}/locations`, { headers: { Authorization: accessToken } });

  dispatch({ type: FETCH_SITE_LOCATIONS, payload: res.data });
};

export const fetchLocationCharts = values => async dispatch => {
  console.log('fetching location charts');
  const res = await axios.get(
    `/api/locations/${values.locationId}/conditions/?startTime=${
      values.startTime
    }&endTime=${values.endTime}`, { headers: { Authorization: values.accessToken } }
  );

  dispatch({ type: FETCH_LOCATION_CHARTS, payload: res.data });
};

export const fetchZoneBarChart = values => async dispatch => {
  const res = await axios.get(
    `/api/zones/${values.zoneId}/conditions/?startTime=${
      values.startTime
    }&endTime=${values.endTime}`,{ headers: { Authorization: values.accessToken } }
  );
  console.log('fetching zone charts', res);
  dispatch({ type: FETCH_ZONE_CHARTS, payload: res.data });
};


export const fetchLogin = accessToken => async dispatch => {
    console.log('fetching user login info' +accessToken);
     const res = await axios.get(
         `api/users/verifyLogin`,
         {params: {accessToken: accessToken }}
     );
    // dispatch({ type: FETCH_USER_LOGIN, payload: res.data });
};



export const handleLogin = (authStatus) => {
    return function (dispatch) {
                    try {
                        dispatch(handleLoginD(authStatus));
                    }
                    catch (error) {
                        console.log(error);
                    }
    }


};

export function handleLoginD(data) {
    return {
        type: 'AUTH_STATUS',
        payload: data
    }
};