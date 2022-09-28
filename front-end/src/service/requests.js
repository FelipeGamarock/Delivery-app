import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT || '3001'}`,
});

export const requestLogin = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const requestData = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const requestDataAuth = async (endpoint, auth) => {
  const { data } = await api.get(endpoint, { headers: { authorization: auth } });
  return data;
};

export const requestPost = async (endpoint, body, auth) => {
  const { data } = await api.post(endpoint, body, { headers: { authorization: auth } });
  return data;
};

export const requestPatch = async (endpoint, body, auth) => {
  const { data } = await api.patch(endpoint, body, { headers: { authorization: auth } });
  return data;
};
