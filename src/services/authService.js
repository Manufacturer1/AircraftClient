// src/services/authService.js
const API_URL = 'https://localhost:7237/api/Auth';


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

export const getAllUsers = async () => {
  const response = await fetch(`${API_URL}/getusers`);
  return await response.json();
};