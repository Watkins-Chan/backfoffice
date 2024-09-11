// apiClient.js
import axios from 'axios';
import { BASE_URL } from './constants';

const apiClient = axios.create({
  baseURL: BASE_URL,
});

export const fetchAll = async (endpoint) => {
  const { data } = await apiClient.get(endpoint);
  return data;
};

export const fetchOne = async (endpoint, id) => {
  const { data } = await apiClient.get(`${endpoint}/${id}`);
  return data;
};

export const createItem = async (endpoint, item) => {
  const { data } = await apiClient.post(endpoint, item);
  return data;
};

export const updateItem = async (endpoint, id, item) => {
  const { data } = await apiClient.put(`${endpoint}/${id}`, item);
  return data;
};


export const deleteItem = async (endpoint, id) => {
  const { data } = await apiClient.delete(`${endpoint}/${id}`);
  return data;
};
