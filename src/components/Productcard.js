import React, { useState } from 'react';
import { FaHeart } from "react-icons/fa";
import { GrFavorite } from "react-icons/gr";
import { TiStar } from "react-icons/ti";
import { removeFromWishlist, addToWishlist } from './Api';


const Productcard = ({ product, onClick, isAuthenticated }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = (event) => {
    event.stopPropagation();
    const token = localStorage.getItem('token'); // Prevent propagation to the parent card click event
    // console.log(isAuthenticated);
    // console.log(token);
    if (true) {
      if (isFavorite) {
        // console.log(product._id);
        // console.log(token);
        removeFromWishlist(product._id, token);
      } else {
        // console.log(product._id, "token" ,token);
        addToWishlist(product._id, token);
      }
      setIsFavorite(!isFavorite);
    } else {
      alert("Please login first");
    }
  };

  const handleCardClick = () => {
    // Call the onClick function passed as a prop
    onClick();
    //  console.log(product._id, "inside the productcard");
    //Productdetails(product._id)
  };

  return (
    <div className="relative flex-shrink-0 bg-red-600 rounded-md overflow-hidden shadow-lg mx-4 py-5" style={{ width: "260px", height: "360px" }} onClick={handleCardClick}>

      <div className="absolute top-0 right-0 m-2" onClick={handleFavoriteClick}>
        {isFavorite ? <FaHeart className='text-teal-400 my-5 mr-2' /> : <GrFavorite className='text-white my-5 mr-2' />}
      </div>

      <div style={{ height: "200px", overflow: "hidden" }}>
        <img src={product.displayImage} alt={product.name} className="w-full h-full object-fill" />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold overflow-hidden text-white " style={{ maxHeight: "3rem" }}>{product.name}</h3>
        <p className="text-white text-xl my-2">₹{product.price < 400 ? product.price * 83 : product.price}.00</p>
        <div className="flex items-center mt-2">
          {Array.from({ length: Math.min(product.ratings, 5) }).map((_, i) => (
            <TiStar key={i} className="text-blue-700" />
          ))}
          {Array.from({ length: Math.max(5 - product.ratings, 0) }).map((_, i) => (
            <TiStar key={i} className="text-white" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Productcard;