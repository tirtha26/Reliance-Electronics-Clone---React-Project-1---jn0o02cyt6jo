// These functions should handle API requests to interact with the wishlist backend
import axios from 'axios';
const API_BASE_URL = 'https://academics.newtonschool.co/api/v1/ecommerce/wishlist';


export const addToWishlist = async (productId, token) => {
   console.log(productId, token);
  try {
    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'projectID': 'rav6sl4o9c7d'
      },
      body: JSON.stringify({ productId })
    };

    const response = await fetch(API_BASE_URL, requestOptions);
    if (!response.ok) {
      alert("This product is already in your wishlist!")
    }
  } catch (error) {
    throw new Error('Failed to add product to wishlist: ' + error.message);
  }
};



// Example function to remove a product from the wishlist
export const removeFromWishlist = async (productId, token) => {
  console.log(productId, token);
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'projectID': 'rav6sl4o9c7d'
    }
  };

  const response = await fetch(`${API_BASE_URL}/${productId}`, requestOptions);
  if (!response.ok) {
    throw new Error('Failed to remove product from wishlist');
  }
};

// Example function to fetch user's wishlist

export const getWishlist = async (token) => {

  const requestOptions = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'projectID': 'rav6sl4o9c7d'
    }
  };

  const response = await fetch(API_BASE_URL, requestOptions);
  // console.log(response);
  if (!response.ok) {
    throw new Error('Failed to fetch wishlist');
  }
  const wishlistData = await response.json();
  // console.log(wishlistData);
  return wishlistData;
};

// Example function to remove all products from the wishlist
export const removeAllFromWishlist = async (token) => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'projectID': 'rav6sl4o9c7d'
    }
  };

  const response = await fetch(API_BASE_URL, requestOptions);
  if (!response.ok) {
    throw new Error('Failed to remove all products from wishlist');
  }
};


// cart Api
// Api.jS

const token = localStorage.getItem('token');
const projectID = 'rav6sl4o9c7d';

export const getCartItems = async () => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'projectID': projectID
      },
    };

    const url = `https://academics.newtonschool.co/api/v1/ecommerce/cart/${projectID}`;
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error('Failed to fetch cart items: ' + response.statusText);
    }
    // console.log(await response.json());
    return await response.json();
  } catch (error) {
    throw new Error('Error fetching cart items: ' + error.message);
  }
};

export const removeAllFromCart = async () => {
  try {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'projectID': projectID
      }
    };

    const url =' https://academics.newtonschool.co/api/v1/ecommerce/cart';
    const response = await fetch(url, requestOptions);
    
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to remove all items from cart: ${errorMessage}`);
    }
  } catch (error) {
    throw new Error(`Error removing all items from cart: ${error.message}`);
  }
};


export const removeFromCart = async (productId) => {
  // console.log(productId);
  try {
    const url = `https://academics.newtonschool.co/api/v1/ecommerce/cart/${productId}`;
    const response = await axios.delete(url, {
      headers: {
        'Authorization':`Bearer ${token}`,
        'projectID': 'rav6sl4o9c7d'
      }
    });

    // console.log(response);

    if (!response.status === 200) {
      throw new Error('Failed to remove item from cart');
    }

    return response.data; // Return data if needed
  } catch (error) {
    throw new Error(`Failed to remove item from cart: ${error.message}`);
  }
};



export const addToCart = async (productId, quantity) => { // Accept quantity parameter
  // console.log(token, productId, quantity);
  const body = {
    "quantity": quantity,
  }
  try {
    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'projectID': projectID
      },
      
      body: JSON.stringify(body) // Include quantity in the request body
    };
    
    const url = `https://academics.newtonschool.co/api/v1/ecommerce/cart/${productId}`;
    const response = await fetch(url, requestOptions);
    console.log(await response.json())
    if (!response.ok) {
      throw new Error('Failed to add product to cart: ' + response.statusText);
    }
  } catch (error) {
    throw new Error('Failed to add product to cart: ' + error.message);
  }
};


// // These functions should handle API requests to interact with the wishlist backend
// import axios from 'axios';
// const API_BASE_URL = 'https://academics.newtonschool.co/api/v1/ecommerce/wishlist';


// export const addToWishlist = async (productId, token) => {
//    console.log(productId, token);
//   try {
//     const requestOptions = {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//         'projectID': 'rav6sl4o9c7d'
//       },
//       body: JSON.stringify({ productId })
//     };

//     const response = await fetch(API_BASE_URL, requestOptions);
//     if (!response.ok) {
//       alert("This product is already in your wishlist!")
//     }
//   } catch (error) {
//     throw new Error('Failed to add product to wishlist: ' + error.message);
// }
// };



// // Example function to remove a product from the wishlist
// export const removeFromWishlist = async (productId, token) => {
//   // console.log(productId, token);
//   const requestOptions = {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`,
//       'projectID': 'rav6sl4o9c7d'
//     }
//   };

//   const response = await fetch(`${API_BASE_URL}/${productId}`, requestOptions);
//   // console.log(response);
//   if (!response.ok) {
//     throw new Error('Failed to remove product from wishlist');
//   }
 
// };

// // Example function to fetch user's wishlist

// export const getWishlist = async (token) => {

//   const requestOptions = {
//     method: 'GET',
//     headers: {
//       'Authorization': `Bearer ${token}`,
//       'projectID': 'rav6sl4o9c7d'
//     }
//   };

//   const response = await fetch(API_BASE_URL, requestOptions);
//   // console.log(response);
//   if (!response.ok) {
//     throw new Error('Failed to fetch wishlist');
//   }
//   const wishlistData = await response.json();
//   // console.log(wishlistData);
//   return wishlistData;
// };

// // Example function to remove all products from the wishlist
// export const removeAllFromWishlist = async (token) => {
//   const requestOptions = {
//     method: 'DELETE',
//     headers: {
//       'Authorization': `Bearer ${token}`,
//       'projectID': 'rav6sl4o9c7d'
//     }
//   };

//   const response = await fetch(API_BASE_URL, requestOptions);
//   if (!response.ok) {
//     throw new Error('Failed to remove all products from wishlist');
//   }
// };


// // cart Api
// // Api.jS

// const token = localStorage.getItem('token');
// const projectID = 'rav6sl4o9c7d';

// export const getCartItems = async () => {

//   try {
//     const requestOptions = {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//         'projectID': projectID
//       },
//     };
//     const url = `https://academics.newtonschool.co/api/v1/ecommerce/cart/${projectID}`;
//     const response = await fetch(url, requestOptions);
//     // console.log(response);
    
//     if (!response.ok) {
//       throw new Error('Failed to fetch cart items: ' + response.statusText);
//     }
//     return await response.json();
//   } catch (error) {
//     throw new Error('Error fetching cart items: ' + error.message);
//   }
// };

// export const removeAllFromCart = async () => {
//   try {
//     const requestOptions = {
//       method: 'DELETE',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'projectID': projectID
//       }
//     };

//     const url = `https://academics.newtonschool.co/api/v1/ecommerce/cart`;
//     const response = await fetch(url, requestOptions);
    
//     if (!response.ok) {
//       const errorMessage = await response.text();
//       throw new Error(`Failed to remove all items from cart: ${errorMessage}`);
//     }
//   } catch (error) {
//     throw new Error(`Error removing all items from cart: ${error.message}`);
//   }
// };


// export const removeFromCart = async (productId) => {
//   try {
//     const requestOptions = {
//       method: 'DELETE',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'projectID': projectID
//       }
//     };

//     const url = `https://academics.newtonschool.co/api/v1/ecommerce/cart/${productId}`;
//     const response = await fetch(url, requestOptions);
//     // console.log(response);
//     // console.log(productId);


//     if (!response.ok) {
//       const errorMessage = await response.text();
//       throw new Error(`Failed to remove item from cart: ${errorMessage}`);
//     }
//   } catch (error) {
//     throw new Error(`Error removing item from cart: ${error.message}`);
//   }
// };


// export const addToCart = async (productId, quantity) => { // Accept quantity parameter
//   // console.log(token, productId, quantity);
//   try {
//     const requestOptions = {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//         'projectID': projectID
//       },
//       body: JSON.stringify({ quantity }) // Include quantity in the request body
//     };
    
//     const url = `https://academics.newtonschool.co/api/v1/ecommerce/cart/${productId}`;
//     const response = await fetch(url, requestOptions);
//     // console.log(response);
//     console.log(await response.json());
//     if (!response.ok) {
//       throw new Error('Failed to add product to cart: ' + response.statusText);
//     }
//   } catch (error) {
//     throw new Error('Failed to add product to cart: ' + error.message);
//   }
// };