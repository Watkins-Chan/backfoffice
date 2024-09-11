// apiClient.js
import axios from 'axios';
import { BASE_URL } from './constants';
import _get from 'lodash/get'
export const apiClient = axios.create({
  baseURL: BASE_URL,
});

export const fetchAll = async (endpoint, { pageSize, currentPage }) => {
  const response = await apiClient.get(`${endpoint}?pageSize=${pageSize}&currentPage=${currentPage}`);
  const result = _get(response, 'data', null) 
  return result;
};

export const fetchOne = async (endpoint) => {
  const { data } = await apiClient.get(`${endpoint}`);
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
