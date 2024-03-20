// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import UsersApi from '../api/UsersApi.js';
import { signInWithToken } from '../fireBase.js';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const currentUser = await UsersApi.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error fetching current user:', error);
      } finally {
        setLoading(false);
      }
    };

    // Check if user token exists in local storage
    const token = localStorage.getItem('token');
    if (token) {
      signInWithToken(token)
        .then((userCredential) => {
          // User logged in successfully
          const user = userCredential.user;
          setUser(user);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error logging in with token:', error);
          setLoading(false);
        });
    } else {
      // No user token found in local storage
      fetchCurrentUser().finally(()=> {
        setLoading(false);
      })

    }

  }, []);

  const login = async (formData) => {
    try {
      
      const {user: loggedInUser, token: idToken} = await UsersApi.loginUser(formData.username, formData.password);
      localStorage.setItem('token', idToken); // Store the token in local storage

      setUser(loggedInUser);
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await UsersApi.logoutUser();
      setUser(null);
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
