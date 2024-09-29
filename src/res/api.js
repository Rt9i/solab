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
export const getUserProfile = async userId => {
  try {
    const response = await appFetch(`${mainURL}/getUserByID/${userId}`);
    return response;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const updateUserProducts = async (userId, cart) => {
  if (!userId) return console.error('User ID is undefined');

  const cleanCart = cart.map(item => ({
    ...item,
    productId: item.productId || item.id,
    img: typeof item.img === 'string' ? item.img : item.img?.uri
  }));
  

  const payload = {
    _id: userId,
    updated: {products: cleanCart},
  };

  console.log('Cart sent to server:', JSON.stringify(payload));

  try {
    const response = await fetch(`${mainURL}/updateUserProducts/${userId}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error(
        'Failed to update cart on server:',
        result.errorMessage || result,
      );
    } else {
      console.log('Cart updated on server successfully');
    }
  } catch (e) {
   e
  }
};



export const getUserProducts = async userId => {
  try {
    if (!/^[0-9a-fA-F]{24}$/.test(userId)) {
      throw new Error('Invalid ObjectId format');
    }

    const response = await appFetch(`/getUserProducts/${userId}`, 'GET');

    // Check if the response has the `products` field
    if (!response.products) {
      throw new Error('Products not found in response');
    }

    // Log the products that we received
    console.log('Fetched user products:', response.products);

    return response.products; // Return the products array
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
    const response = await fetch(`${mainURL}/createUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName,
        phoneNumber,
        password,
        role: 'client',
      }),
    });

    const data = await response.json();
    console.log('User created:', data);
    return data; // Ensure the response is returned
  } catch (error) {
    console.error('Error creating user:', error);
    throw error; // Rethrow the error to handle it properly where the function is called
  }
};


// to add new items to the data base 
export const saveProductsToDatabase = async data => {
  try {
    // Map through the data to add the productId field
    const itemsWithProductId = data.map(item => ({
      ...item,
      productId: item.id, // Assign the id to productId
    }));

    const response = await fetch(`${mainURL}/saveProductsToDatabase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({items: itemsWithProductId}),
    });

    if (!response.ok) {
      const errorText = await response.text(); // Read the text response for debugging
      throw new Error(`Failed to save products: ${errorText}`);
    }

    const result = await response.json();
    console.log('Products saved successfully:', result);
  } catch (e) {
    console.error('Error saving products:', e);
  }
};

// Function to get all items from the database
export const getDataFromDataBase = async () => {
  try {
    const response = await fetch(`${mainURL}/getDataFromDataBase`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch data: ${errorText}`);
    }

    const items = await response.json();
    return items; // Return the fetched items
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getItemInDataBase = async (id) => {
  try {
    const response = await fetch(`${mainURL}/getItemInDatabase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }), 
    });

    const item = await response.json();
    if (!response.ok) {
      throw new Error(`Failed to get item: ${item.error}`);
    }

    return item; // Return the item
  } catch (e) {
    console.error("Error fetching item:", e);
    throw e;
  }
};

// setItemInDataBase to modify an existed item to the data base

export const setItemInDataBase = async (id, newItemData) => {
  try {
    const response = await fetch(`${mainURL}/setItemInDatabase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, newItemData }), 
    });

    const updatedItem = await response.json();
    if (!response.ok) {
      throw new Error(`Failed to update item: ${updatedItem.error}`);
    }

    return updatedItem; // Return the updated item
  } catch (e) {
    console.error("Error updating item:", e);
    throw e;
  }
};

export const removeItemFromDatabase = async (id) => {
  try {
    const response = await fetch(`${mainURL}/removeItemFromDatabase`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }), // Send the id in the body
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete item: ${errorText}`);
    }

    const result = await response.json();
    return result; // Return the result of the deletion
  } catch (error) {
    console.error('Error deleting item:', error);
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
      console.error(
        'HTTP Error:',
        response.status,
        response.statusText,
        errorText,
      );
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const textResponse = await response.text();
    console.log('Response:', textResponse);

    if (textResponse) {
      try {
        const jsonResponse = JSON.parse(textResponse);
        return jsonResponse;
      } catch (e) {
        console.error('Failed to parse JSON:', e);
        throw new Error('Response is not valid JSON');
      }
    } else {
      return {}; // Return an empty object or handle the empty response as needed
    }
  } catch (error) {
    console.error('Fetch error:', error.message);
    throw error;
  }
};
