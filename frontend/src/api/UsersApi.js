import { auth, signIn } from '../fireBase.js';
import config from '../config.js'; 
import BaseApi from './BaseApi.js';
import { signOut } from '@firebase/auth';

const {apiBaseUrl } = config;

class UsersApi extends BaseApi{
  constructor(resourceUrl = "/users") {
    super(`${apiBaseUrl}${resourceUrl}`)
  }
  
  

  async registerUser(formData) {
    try {
      
      const response = await this.api.post('/register', formData);
      return response.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  }
  async loginUser(email, password) {
    try {
      
      // const response = await signIn(email, password);
      const response = await this.post("/login", {username: email, password});
      return response;
    } catch (error) {
      console.error('Error logging in user:', error);
      throw error;
    }
  };
  

  async logoutUser() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error logging out user:', error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const response = await this.get('/current-user');
      return response.data;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }


}
const UserApi = new UsersApi();
export default UserApi;
