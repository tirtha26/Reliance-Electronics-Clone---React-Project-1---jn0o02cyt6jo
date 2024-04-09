// import React from 'react';

// const CartItem = ({ item, removeFromCart, moveToWishlist }) => {

//   console.log(item._id);
//   return (
//     <div className="flex h-80 w-2/3 text-black bg-white ml-44 justify-between items-center border px-4 gap-4 py-4 mb-4 bg-transparent rounded-xl overflow-hidden shadow-md">
//       <img src={item.product.displayImage} className="w-full h-72 object-cover" alt={item.product.name} />
//       <div className='' style={{ width: "150rem" }}>
//         <h3 className='text-xl font-semibold mb-2'>{item.product.name}</h3>
//         <p>Standard Delivery by <br/> tomorrow | ₹199</p>
//         <button className="bg-blue-700 mt-3 justify-center w-52 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-800 mb-3 mr-8" onClick={() => moveToWishlist(item._id)}>Move to Wishlist</button>
//         <button className=" bg-transparent border hover:bg-red-600 font-bold w-40 bg-slate-300 py-3 px-4 rounded-lg hover:text-white" onClick={() => removeFromCart(item.product._id)}>Remove</button>
//       </div>
//       <div>
//         <p className=" font-bold text-nowrap text-2xl mb-2">Price: ₹{item.product.price < 400 ? item.product.price * 83 : item.product.price}.00</p>
//         <p className=' text-right mb-1'>(Incl. all Taxes)</p>
//         <hr className='border-1 border-black' />
//         <p className=' my-1 text-zinc-500 line-through text-right'>MRP ₹{item.product.price < 400 ? item.product.price * 83 : item.product.price+1235}.00</p>
//         <p className='text-right mb-3'>Save(₹{item.product.price < 400 ? item.product.price * 83 : item.product.price}.00)</p>
//         <hr className='border-1 border-black' />
//         <p className='font-bold text-lg text-right'>₹{Math.round(item.product.price < 400 ? item.product.price * 83/12 : item.product.price/12)}/mo*</p>
//         <p className='text-blue-600 underline text-right hover:text-green-600'>EMI Options</p>
//       </div>
//     </div>
//   );
// };

// export default CartItem;