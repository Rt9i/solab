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
export const getUserProfile = async (userId) => {
  try {
    const response = await appFetch(`${mainURL}/getUserByID/${userId}`);
    return response;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};
export const updateUserCart = async (userId, cart) => {
  if (!userId) {
    console.error('User ID is undefined');
    return;
  }
  const cartItems = cart.map(item => ({
    productId: item.id,
    price: item.price,
    brand: item.brand,
    taste: item.taste,
    img: item.img,
    dis: item.dis,
    category: item.category,
    petType: item.petType,
    quantity: item.quantity,
    saleAmmount: item.saleAmmount,
    salePrice: item.salePrice,
  }));

  const payload = {cartItems};
  console.log('Payload to be sent:', JSON.stringify(payload));

  try {
    const response = await fetch(`${mainURL}/updateUserProducts/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    console.log('Server response:', text);

    let result;
    try {
      result = JSON.parse(text);
    } catch (e) {
      console.error('Failed to parse JSON:', e);
      throw new Error('Response is not valid JSON');
    }

    if (!response.ok) {
      console.error(
        'Failed to update cart on server:',
        result.errorMessage || result,
      );
    } else {
      console.log('Cart updated on server successfully');
    }
  } catch (error) {
    console.error('Failed to update cart on server:', error);
  }
};

export const loadCart = async userId => {
  if (!userId) {
    console.error('User ID is undefined or invalid');
    return;
  }

  try {
    const response = await appFetch(`/getUserProducts/${userId}`, 'GET');
    return response.products || []; // Extract products directly from response
  } catch (error) {
    console.error('Failed to load cart from server:', error);
    throw error;
  }
};

export const getUserProducts = async userId => {
  try {
    // Ensure `userId` is a valid ObjectId string
    if (!/^[0-9a-fA-F]{24}$/.test(userId)) {
      throw new Error('Invalid ObjectId format');
    }
    return await appFetch(`/getUserProducts/${userId}`, 'GET');
  } catch (error) {
    console.error('Failed to fetch user products:', error);
    throw error;
  }
};

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
    return await appFetch('/createUser', 'POST', {
      userName,
      phoneNumber,
      password,
    });
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
    console.log('Request body:', params.body);
  }

  try {
    const response = await fetch(url, params);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('HTTP Error:', response.status, errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const textResponse = await response.text();
    console.log('Response:', textResponse);

    let jsonResponse;
    try {
      jsonResponse = JSON.parse(textResponse);
    } catch (e) {
      console.error('Failed to parse JSON:', e);
      throw new Error('Response is not valid JSON');
    }

    return jsonResponse;
  } catch (error) {
    console.error('Fetch error:', error.message);
    throw error;
  }
};

