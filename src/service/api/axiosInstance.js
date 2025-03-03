// src/services/api/axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  baseURL: "http://54.179.35.186:3000/",
});

// instance.urlImage = "http://54.179.35.186:3200/images/";

instance.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  }
);

export default instance;
