import React, { useState, useEffect } from 'react';
import { CiCalendar } from "react-icons/ci";
import { getWishlist, removeFromWishlist, removeAllFromWishlist, addToCart } from './Api';

const Wishlist = ({ token }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getWishlist(token)
      .then((wishlistData) => {
        if (Array.isArray(wishlistData.data.items)) {
          setWishlistItems(wishlistData.data.items);
          console.log(wishlistData.data.items);
        } else {
          throw new Error('Wishlist data is not an array');
        } 
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [token]);
  const handleRemoveFromWishlist = async (productId) => {
    try {
      await removeFromWishlist(productId, token);
      setWishlistItems(prevItems => prevItems.filter(item => item.products._id !== productId));
    } catch (error) {
      console.error('Error removing product from wishlist:', error);
    }
  };

  const addToCartHandler = async (productId) => {
    const quantity = 1;
    try {
      await addToCart(productId, quantity); // Await the addToCart function
      await removeFromWishlist(productId, token);
      setWishlistItems(prevItems => prevItems.filter(item => item.products._id !== productId));
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const handleRemoveAllFromWishlist = async () => {
    try {
      await removeAllFromWishlist(token);
      setWishlistItems([]);
    } catch (error) {
      console.error('Error removing all products from wishlist:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-4 pt-20 text-black w-3/4 mx-auto">
      <h2 className="text-3xl my-8 font-semibold">My Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <>
          <div className="flex-col">
            {wishlistItems.map((item) => (
              <div key={item.products._id} className="flex h-80 justify-between items-center border px-20 gap-4 py-4 mb-4 bg-transparent rounded-lg overflow-hidden shadow-md">
                <div className=''>
                 {item.products.displayImage && (
        <img src={item.products.displayImage} alt={item.products.name} className="w-full h-72 object-cover" />
      )}
                </div>
                <div className="p-4 text-black">
                  <h3 className="text-xl font-semibold mb-2">{item.products.name}</h3>
                  <p className="text-black font-bold text-2xl mb-2">Price: ₹{item.products.price < 100 ? item.products.price * 83 : item.products.price}</p>
                  <p>Product ID: {item.products._id}</p>
                  <p className='font-bold mt-2'><CiCalendar className=' inline mr-2'/>Added on: {new Date().toLocaleDateString('en-GB')}</p>
                </div>
                <div>
                  <button onClick={()=>addToCartHandler(item.products._id)} className="bg-blue-600 flex justify-center w-52 text-white  font-bold py-3 px-4 rounded-md hover:bg-blue-800 mb-3 mr-2">Add to Cart</button>
                  <button className=" bg-transparent border font-bold w-52 text-black hover:bg-red-600 hover:text-white py-3 px-4 rounded-md " onClick={() => handleRemoveFromWishlist(item.products._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
          <button onClick={handleRemoveAllFromWishlist} className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Remove All</button>
        </>
      )}
    </div>
  );
};

export default Wishlist;


// import { CiCalendar } from "react-icons/ci";
// import { getWishlist, removeFromWishlist, removeAllFromWishlist, addToCart } from './Api';

// const Wishlist = ({ token }) => {
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     getWishlist(token)
//       .then((wishlistData) => {
//         if (Array.isArray(wishlistData.data.items)) {
//           setWishlistItems(wishlistData.data.items);
//         } else {
//           throw new Error('Wishlist data is not an array');
//         } 
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError(error);
//         setLoading(false);
//       });
//   }, [token]);

//   console.log(wishlistItems);
//   const handleRemoveFromWishlist = async (productId) => {
//     try {
//       await removeFromWishlist(productId, token);
//       setWishlistItems(prevItems => prevItems.filter(item => item.products._id !== productId));
//     } catch (error) {
//       console.error('Error removing product from wishlist:', error);
//     }
//   };

//   const addToCartHandler = async (productId) => {
//     const quantity = 1;
//     try {
//       await addToCart(productId, quantity); // Await the addToCart function
//       await removeFromWishlist(productId, token);
//       setWishlistItems(prevItems => prevItems.filter(item => item.products._id !== productId));
//     } catch (error) {
//       console.error('Error adding product to cart:', error);
//     }
//   };

//   const handleRemoveAllFromWishlist = async () => {
//     try {
//       await removeAllFromWishlist(token);
//       setWishlistItems([]);
//     } catch (error) {
//       console.error('Error removing all products from wishlist:', error);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <div className="p-4 pt-20 text-white w-3/4 mx-auto">
//       <h2 className="text-3xl my-8 font-semibold">My Wishlist</h2>
//       {wishlistItems.length === 0 ? (
//         <p>Your wishlist is empty.</p>
//       ) : (
//         <>
//           <div className="flex-col">
//             {wishlistItems.map((item) => (
//               <div key={item.products._id} className="flex h-80 justify-between items-center border px-20 gap-4 py-4 mb-4 bg-transparent rounded-lg overflow-hidden shadow-md">
//                 <div className=''>
//                   <img src={item.products.displayImage} alt={item.products.name} className="w-full h-72 object-cover" />
//                 </div>
//                 <div className="p-4 text-white">
//                   <h3 className="text-xl font-semibold mb-2">{item.products.name}</h3>
//                   <p className="text-white font-bold text-2xl mb-2">Price: ₹{item.products.price < 100 ? item.products.price * 83 : item.products.price}</p>
//                   <p>Product ID: {item.products._id}</p>
//                   <p className='font-bold mt-2'><CiCalendar className=' inline mr-2'/>Added on: {new Date().toLocaleDateString('en-GB')}</p>
//                 </div>
//                 <div>
//                   <button onClick={()=>addToCartHandler(item.products._id)} className="bg-teal-400 flex justify-center w-52 text-black font-bold py-3 px-4 rounded-md hover:bg-teal-600 mb-3 mr-2">Add to Cart</button>
//                   <button className=" bg-transparent border font-bold w-52 text-white py-3 px-4 rounded-md " onClick={() => handleRemoveFromWishlist(item.products._id)}>Delete</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <button onClick={handleRemoveAllFromWishlist} className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Remove All</button>
//         </>
//       )}
//     </div>
//   );
// };

// export default Wishlist;