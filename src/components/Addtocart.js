import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, getCartItems, removeAllFromCart,moveToWishlist, addToWishlist } from './Api';
// import {AlertProvider} from './AlertProvider ';
export const useCartQty = () => {
  const [cartItems, setCartItems] = useState([]);
  const userToken = localStorage.getItem('token');

  useEffect(() => {
    fetchCartItems();
  }, []); // Fetch cart items whenever userToken changes

  const fetchCartItems = () => {
    getCartItems(userToken)
      .then((data) => {
        setCartItems(data.data.items || []);
        // calculateTotalAmount(data.data.items || []);
      })
      .catch((error) => console.error('Error fetching cart items:', error.message));
  };

  return { cartQty: cartItems.length };
};


const CartItem = ({ item, removeFromCart, moveToWishlist }) => {
  // const { showAlert } = useAlert();
  // const useAlert = () => {
  //   const context = React.useContext(AlertContext);
  //   if (!context) {
  //     throw new Error("useAlert must be used within an AlertProvider");
  //   }
  //   return context;
  // };
  // const emiHandler = () => {
  //   showAlert("You are not eligible for EMI on this product");
  // };
  const removeHandler = () => {
     moveToWishlist(item.product._id)
    removeFromCart(item.product._id)

  };
  

  return (
    <div className="flex h-80 w-2/3 text-black bg-white ml-44 justify-between items-center border px-4 gap-4 py-4 mb-4 bg-transparent rounded-xl overflow-hidden shadow-md">
      <img src={item.product.displayImage} className="w-full h-72 object-cover" alt={item.product.name} />
      <div className="" style={{ width: "150rem" }}>
        <h3 className="text-xl font-semibold mb-2">{item.product.name}</h3>
        <p>Standard Delivery by <br/> tomorrow | ₹199</p>
        <button className="bg-blue-600 mt-3 justify-center w-52 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-800 mb-3 mr-8" onClick={removeHandler}>Move to Wishlist</button>
        <button className=" bg-transparent border hover:bg-red-600 font-bold w-40 bg-slate-300 py-3 px-4 rounded-lg hover:text-white" onClick={removeHandler}>Remove</button>
      </div>
      <div>
        <p className=" font-bold text-nowrap text-2xl mb-2">Price: ₹{item.product.price < 400 ? item.product.price * 83 : item.product.price}.00</p>
        <p className="text-right mb-1">(Incl. all Taxes)</p>
        <hr className="border-1 border-black" />
        <p className="my-1 text-zinc-500 line-through text-right">MRP ₹{item.product.price < 400 ? item.product.price * 83 : item.product.price + 1235}.00</p>
        <p className="text-right mb-3">Save(₹{item.product.price < 400 ? item.product.price * 83 : item.product.price}.00)</p>
        <hr className="border-1 border-black" />
        <p className="font-bold text-lg text-right">₹{Math.round(item.product.price < 400 ? item.product.price * 83 / 12 : item.product.price / 12)}/mo*</p>
        <p className="text-green-400 underline text-right " >EMI Options</p>
      </div>
    </div>
  );
};


const AddToCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();
  const userToken = localStorage.getItem('token');

  useEffect(() => {
    if (!userToken) {
      navigate('/login');
    } else {
      fetchCartItems();
    }
  }, [userToken, navigate]);

  const fetchCartItems = () => {
    getCartItems(userToken)
      .then((data) => {
        setCartItems(data.data.items || []);
        calculateTotalAmount(data.data.items || []);
      })
      .catch((error) => console.error('Error fetching cart items:', error.message));
  };

  const calculateTotalAmount = (items) => {
    let total = 0;
    items.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    setTotalAmount(total);
  };

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId)
      .then(() => {
        fetchCartItems();
      })
      .catch((error) => console.error('Error removing item from cart:', error.message));
  };

  const handleMoveToWishlist = (productId) => {
    addToWishlist(productId, userToken).then(() => {
      //handleRemoveFromCart(productId);
    }).catch((error) => alert(`Failed to move the product to wishlist:\n${(error)}`));
  };
  
  const handleRemoveAllFromCart = () => {
    removeAllFromCart()
      .then(() => {
        fetchCartItems();
      })
      .catch((error) => console.error('Error removing all items from cart:', error.message));
  };

  const handleCheckout = () => {
    navigate('/checkout'); // Navigate to the shipping page
  };
    localStorage.setItem('buy',totalAmount * 83 - 500)
  return (
    <div className="add-to-cart-container text-white pt-20">
      <div>
        <h2 className="font-bold text-2xl ml-44 my-10">YOUR CART</h2>
        {cartItems && cartItems.length > 0 ? (
          <div>
            {cartItems.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                removeFromCart={handleRemoveFromCart}
                moveToWishlist={handleMoveToWishlist}
              />
            ))}
            <div className="absolute top-48 border right-5 w-72 rounded-xl p-4 bg-white text-black">
              <h2 className="font-bold text-xl mb-4">Order Summary ({cartItems.length} items)</h2>
              <div className="flex justify-between mb-3">
                <p>Original Price</p><span>₹{totalAmount < 400 ? totalAmount * 83 : totalAmount}.00</span>
              </div>
              <div className="flex justify-between mb-3">
                <p>Savings </p><span className="ml-2">-₹500.00</span>
              </div>
              <div className="flex justify-between">
                <p className="inline-block mr-32">Total</p><span className="ml-2">₹{totalAmount < 400 ? totalAmount * 83 - 500 : totalAmount - 500}.00</span>
              </div>
              <button className="w-full mt-4 hover:bg-blue-800 bg-blue-600 text-white rounded-md font-bold p-2" onClick={handleCheckout}>Checkout</button>
              <button className="w-full mt-4 hover:bg-blue-800 bg-blue-600 text-white rounded-md font-bold p-2" onClick={handleRemoveAllFromCart}>Remove All Items</button>
            </div>
          </div>
        ) : (
          <p className="ml-44">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default AddToCart;






// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { removeFromCart, getCartItems, removeAllFromCart,moveToWishlist, addToWishlist } from './Api';

// export const useCartQty = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const userToken = localStorage.getItem('token');

//   useEffect(() => {
//     fetchCartItems();
//   }, []); // Fetch cart items whenever userToken changes

//   const fetchCartItems = () => {
//     getCartItems(userToken)
//       .then((data) => {
//         setCartItems(data.data.items || []);
//         // calculateTotalAmount(data.data.items || []);
//       })
//       .catch((error) => console.error('Error fetching cart items:', error.message));
//   };

//   return { cartQty: cartItems.length };
// };


// const CartItem = ({ item, removeFromCart, moveToWishlist }) => {
  
//   const removeHandler = () => {
//     moveToWishlist(item.product._id)
//     removeFromCart(item.product._id)

//   };

//   return (
//     <div className="flex h-80 w-2/3 text-black bg-white ml-44 justify-between items-center border px-4 gap-4 py-4 mb-4 bg-transparent rounded-xl overflow-hidden shadow-md">
//       <img src={item.product.displayImage} className="w-full h-72 object-cover" alt={item.product.name} />
//       <div className="" style={{ width: "150rem" }}>
//         <h3 className="text-xl font-semibold mb-2">{item.product.name}</h3>
//         <p>Standard Delivery by <br/> tomorrow | ₹199</p>
//         <button className="bg-teal-400 mt-3 justify-center w-52 text-black font-bold py-3 px-4 rounded-lg hover:bg-teal-600 mb-3 mr-8" onClick={removeHandler}>Move to Wishlist</button>
//         <button className=" bg-transparent border hover:bg-slate-600 font-bold w-40 bg-slate-300 py-3 px-4 rounded-lg hover:text-white" onClick={removeHandler}>Remove</button>
//       </div>
//       <div>
//         <p className=" font-bold text-nowrap text-2xl mb-2">Price: ₹{item.product.price < 400 ? item.product.price * 83 : item.product.price}.00</p>
//         <p className="text-right mb-1">(Incl. all Taxes)</p>
//         <hr className="border-1 border-black" />
//         <p className="my-1 text-zinc-500 line-through text-right">MRP ₹{item.product.price < 400 ? item.product.price * 83 : item.product.price + 1235}.00</p>
//         <p className="text-right mb-3">Save(₹{item.product.price < 400 ? item.product.price * 83 : item.product.price}.00)</p>
//         <hr className="border-1 border-black" />
//         <p className="font-bold text-lg text-right">₹{Math.round(item.product.price < 400 ? item.product.price * 83 / 12 : item.product.price / 12)}/mo*</p>
//         <p className="text-teal-400 underline text-right">EMI Options</p>
//       </div>
//     </div>
//   );
// };


// const AddToCart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const navigate = useNavigate();
//   const userToken = localStorage.getItem('token');

//   useEffect(() => {
//     if (!userToken) {
//       navigate('/login');
//     } else {
//       fetchCartItems();
//     }
//   }, [userToken, navigate]);

//   const fetchCartItems = () => {
//     getCartItems(userToken)
//       .then((data) => {
//         setCartItems(data.data.items || []);
//         calculateTotalAmount(data.data.items || []);
//       })
//       .catch((error) => console.error('Error fetching cart items:', error.message));
//   };

//   const calculateTotalAmount = (items) => {
//     let total = 0;
//     items.forEach((item) => {
//       total += item.product.price * item.quantity;
//     });
//     setTotalAmount(total);
//   };

//   const handleRemoveFromCart = (productId) => {
//     removeFromCart(productId)
//       .then(() => {
//         fetchCartItems();
//       })
//       .catch((error) => console.error('Error removing item from cart:', error.message));
//   };

//   const handleMoveToWishlist = (productId) => {
//     addToWishlist(productId, userToken).then(() => {
//       handleRemoveFromCart(productId);
//     }).catch((error) => alert(`Failed to move the product to wishlist`));
//   };
  
//   const handleRemoveAllFromCart = () => {
//     removeAllFromCart()
//       .then(() => {
//         fetchCartItems();
//       })
//       .catch((error) => console.error('Error removing all items from cart:', error.message));
//   };

//   const handleCheckout = () => {
//     navigate('/checkout'); // Navigate to the shipping page
//   };

//   return (
//     <div className="add-to-cart-container text-white pt-20">
//       <div>
//         <h2 className="font-bold text-2xl ml-44 my-10">YOUR CART</h2>
//         {cartItems && cartItems.length > 0 ? (
//           <div>
//             {cartItems.map((item) => (
//               <CartItem
//                 key={item._id}
//                 item={item}
//                 removeFromCart={handleRemoveFromCart}
//                 moveToWishlist={handleMoveToWishlist}
//               />
//             ))}
//             <div className="absolute top-48 border right-5 w-72 rounded-xl p-4 bg-white text-black">
//               <h2 className="font-bold text-xl mb-4">Order Summary ({cartItems.length} items)</h2>
//               <div className="flex justify-between mb-3">
//                 <p>Original Price</p><span>₹{totalAmount < 400 ? totalAmount * 83 : totalAmount}.00</span>
//               </div>
//               <div className="flex justify-between mb-3">
//                 <p>Savings </p><span className="ml-2">-₹500.00</span>
//               </div>
//               <div className="flex justify-between">
//                 <p className="inline-block mr-32">Total</p><span className="ml-2">₹{totalAmount < 400 ? totalAmount * 83 - 500 : totalAmount - 500}.00</span>
//               </div>
//               <button className="w-full mt-4 hover:bg-teal-600 bg-teal-400 rounded-md font-bold p-2" onClick={handleCheckout}>Checkout</button>
//               <button className="w-full mt-4 hover:bg-teal-600 bg-teal-400 rounded-md font-bold p-2" onClick={handleRemoveAllFromCart}>Remove All Items</button>
//             </div>
//           </div>
//         ) : (
//           <p className="ml-44">Your cart is empty.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddToCart;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import CartItem from './Cartitems';
// import { getCartItems, removeFromCart, removeAllFromCart } from './Api';



// const calculateTotalAmount = (items) => {
//   const [totalAmount, setTotalAmount] = useState(0);
//   let total = 0;
//   items.forEach((item) => {
//     total += item.product.price * item.quantity;
//   });
//   setTotalAmount(total);
// };


// export const useCartQty = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const userToken = localStorage.getItem('token');

//   useEffect(() => {
//     fetchCartItems();
//   }, []); // Fetch cart items whenever userToken changes

//   const fetchCartItems = () => {
//     getCartItems(userToken)
//       .then((data) => {
//         setCartItems(data.data.items || []);
//         calculateTotalAmount(data.data.items || []);
//       })
//       .catch((error) => console.error('Error fetching cart items:', error.message));
//     };
//     // console.log(cartItems);

//   return { cartQty: cartItems.length };
// };

// const AddToCart = () => {
//   const [cartItems, setCartItems] = useState([]);
 
//   const navigate = useNavigate();
//   const userToken = localStorage.getItem('token');
//     console.log(userToken);
//   useEffect(() => {
//     if (!userToken) {
//       navigate('/login');
//     } else {
//       fetchCartItems();
//     }
//   }, [userToken, navigate]);

//   const fetchCartItems = () => {
//     getCartItems(userToken)
//       .then((data) => {
//         setCartItems(data.data.items || []);
//         calculateTotalAmount(data.data.items || []);
//       })
//       .catch((error) => console.error('Error fetching cart items:', error.message));
//   };

  
//   // const handleRemoveFromCart = (productId) => {
   
//   //   removeFromCart(productId)
//   //     .then(() => {
//   //       fetchCartItems();
//   //     })
//   //     .catch((error) => console.error('Error removing item from cart:', error.message));
//   //     console.log(productId);
//   // };
//   const handleRemoveFromCart = async (productId) => {
//     try {
//       // Check if the product exists in the cart
//       const isProductInCart = cartItems.some(item => item.product._id === productId);
//       if (!isProductInCart) {
//         console.error("Product not found in cart");
//         return;
//       }
  
//       // If the product exists, proceed with removal
//       await removeFromCart(productId);
//       // Update cart items after successful removal
//       fetchCartItems();
//     } catch (error) {
//       console.error('Error removing item from cart:', error.message);
//     }
//   };
  
  

//   const handleMoveToWishlist = (productId) => {
//     console.log('Move item to wishlist with id:', productId);
//     navigate('/wishlist');
//   };


//   const handleRemoveAllFromCart = () => {
//     removeAllFromCart()
//       .then(() => {
//         fetchCartItems();
//       })
//       .catch((error) => console.error('Error removing all items from cart:', error.message));
//   };

//   const handleCheckout = () => {
//     navigate('/checkout'); // Navigate to the shipping page
//   };
 

//   return (
//     <div className="add-to-cart-container text-white pt-20">
//       <div>
//         <h2 className='font-bold text-2xl ml-44 my-10 '>YOUR CART</h2>
//         {cartItems && cartItems.length > 0 ? (
//           <div>
//             {cartItems.map((item) => (
//               <CartItem
//                 key={item._id}
//                 item={item}
//                 removeFromCart={handleRemoveFromCart}
//                 moveToWishlist={handleMoveToWishlist}
//               />
//             ))}
//             <div className=' absolute top-48 border right-5 w-72 rounded-xl p-4 bg-white text-black'>
//               <h2 className='font-bold text-xl mb-4'>Order Summary ({cartItems.length} items)</h2>
//               <div className='flex justify-between mb-3'><p>Original Price</p><span>₹{totalAmount}.00</span></div>
//               <div className='flex justify-between mb-3'><p>Savings </p><span className='ml-2'>-₹500.00</span></div>
//               <div className='flex justify-between'><p className='inline-block mr-32'>Total</p><span className='ml-2'>₹{totalAmount-500}.00</span></div>
//               <button className='w-full mt-4 hover:bg-green-600 hover:text-white bg-blue-700 rounded-md font-bold p-2' onClick={handleCheckout}>Checkout</button>
//               <button className='w-full mt-4 hover:bg-red-600 hover:text-white bg-blue-700 rounded-md font-bold p-2' onClick={handleRemoveAllFromCart}>Remove All Items</button>
//             </div>
//           </div>
//         ) : (
//           <p className='ml-44'>Your cart is empty.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddToCart;