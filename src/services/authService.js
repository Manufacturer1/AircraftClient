import axios from 'axios';

const API_URL = import.meta.env.VITE_LOGIN_API_URL;


export const registerUser = async (registerData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registerData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Registration failed');
  }

  return await response.json();
};

export const loginUser = async (loginData) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }
  const data = await response.json();
  return{
    token:data.token
  };
};

export const getAllUsers = async (token) => {
  try{
    const response = await axios.get(`${API_URL}/getusers`,{
      headers:{
        'Authorization' : `Bearer ${token}`,
        'Content-Type': "application/json"
      },
    })

    return response.data;
  }
  catch(error){
    throw new Error(error.response?.data?.message || "Failed to fetch users.");
  }
};
