
import config from '../config.js'; 
import axios from 'axios';

class BaseApi {
    constructor(baseURL) {
      this.api = axios.create({
        baseURL,
      });
       // Add a request interceptor to include the ID token in the request headers
        this.api.interceptors.request.use(
        async (config) => {
          const idToken = localStorage.getItem('token');
          if (idToken) {
            config.headers['Authorization'] = `Bearer ${idToken}`;
          }
          return config;
        },
        (error) => {
          console.error('Request interceptor error:', error);
          return Promise.reject(error);
        }
      );
    }
  
    async get(endpoint, params) {
      try {
        const response = await this.api.get(endpoint, { params });
        return response;
      } catch (error) {
        console.error(`Error getting data from ${endpoint}:`, error);
        throw error;
      }
    }
  
    async post(endpoint, data) {
      try {
        const response = await this.api.post(endpoint, data);
        return response;
      } catch (error) {
        console.error(`Error posting data to ${endpoint}:`, error);
        throw error;
      }
    }
  
    async put(endpoint, data) {
      try {
        const response = await this.api.put(endpoint, data);
        return response;
      } catch (error) {
        console.error(`Error putting data to ${endpoint}:`, error);
        throw error;
      }
    }
  
    async delete(endpoint) {
      try {
        const response = await this.api.delete(endpoint);
        return response;
      } catch (error) {
        console.error(`Error deleting data from ${endpoint}:`, error);
        throw error;
      }
    }
  }
  
  export default BaseApi;