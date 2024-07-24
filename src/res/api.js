import {useEffect} from 'react';

const mainURL = 'https://solab-server.onrender.com';
// fetch('url' , params)

export const getAllUsers = async () => {
  try {
    return await appFetch('/getAllUsers');
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
};
// res/api.js

export const getUserByID = async id => {
  try {
    // Ensure `id` is a valid ObjectId string
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      throw new Error('Invalid ObjectId format');
    }
    return await appFetch(`/getUserByID/${id}`, 'GET');
  } catch (error) {
    console.error('Failed to fetch user by ID:', error);
    throw error;
  }
};

export const logIn = async (phoneNumber, password) => {
  try {
    return await appFetch('/logIn', 'POST', {phoneNumber, password});
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const createUser = async (userName, phoneNumber, password) => {
  try {
    return await appFetch('/createUser', 'POST', { userName, phoneNumber, password });
  } catch (error) {
    console.error('User creation failed:', error);
    throw error;
  }
};





const appFetch = async (route, method = 'GET', body = null) => {
  const url = `${mainURL}${route}`;

  const params = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    params.body = JSON.stringify(body);
    console.log('Request body:', params.body); // Log the request body
  }

  try {
    const response = await fetch(url, params);
    const textResponse = await response.text(); // Get response as text

    console.log('Response:', textResponse); // Log response

    let jsonResponse;
    try {
      jsonResponse = JSON.parse(textResponse); // Attempt to parse JSON
    } catch (e) {
      console.error('Failed to parse JSON:', e);
      throw new Error('Response is not valid JSON');
    }

    if (!response.ok) {
      throw new Error(jsonResponse.errorMessage || 'Something went wrong');
    }

    return jsonResponse;
  } catch (error) {
    console.error('fetch error: ', error);
    throw error;
  }
};

