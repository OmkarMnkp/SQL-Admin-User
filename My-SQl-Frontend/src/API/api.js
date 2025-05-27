import axios from 'axios';

// Base URL
export const BASE_URL = 'http://localhost:7000/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getToken = () => localStorage.getItem("token");

export const getUser = () => {
  const user = localStorage.getItem("token");
  return user ? JSON.parse(user) : null;
};

export const apiRequest = async (endpoint, data = {}, method = "get") => {
  const token = getToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  try {
    const response = await axiosInstance.request({
      url: endpoint,
      method,
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("API error", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Auth APIs
export const loginAPI = async (payload) => {
  const data = await apiRequest('/user/login', payload, "post");
  if (data?.token) {
    localStorage.setItem('token', data.token);
  }
  return data;
};

export const logoutAPI = () => {
  localStorage.removeItem("token");
};

export const getUserInfo = async () => {
  return await apiRequest("/user/getUserInfo", {}, "get");
};

// Category APIs
export const addNewCategory = async (payload) => {
  return await apiRequest("/category/create", payload, "post");
};

export const getAllCategory = async () => {
  return await apiRequest("/category/getAll", {}, "get");
};

export const deleteCategory = async (ID) => {
  return await apiRequest(`/category/delete/${ID}`, {}, "delete");
};

export const updateCategory = async (ID,payload)=>{
  return await apiRequest(`category/update/${ID}`,payload,"put")
}


// Brand APIs
export const getAllBrands = async () => {
  return await apiRequest('/brand/getAllBrand', {}, "get");
};

export const addNewBrand = async (payload) => {
  return await apiRequest("/brand/create", payload, "post");
};

export const deleteBrand = async (ID) => {
  return await apiRequest(`/brand/deleteBrand/${ID}`, {}, "delete");
};

export const updateBrand = async (ID, payload) => {
  return await apiRequest(`/brand/updateBrand/${ID}`, payload, "put");
};

// Product APIs
export const getAllProducts = async () => {
  return await apiRequest('/product/getAllProducts', {}, "get");
};

export const addNewProduct = async (payload) => {
  return await apiRequest('/product/createProducts', payload, 'post');
};

export const deleteProduct = async (ID) => {
  return await apiRequest(`/product/deleteProduct/${ID}`, {}, "delete");
};

export const updateProduct = async (ID, payload) => {
  return await apiRequest(`/product/updateProduct/${ID}`, payload, "put");
};

export default axiosInstance;
