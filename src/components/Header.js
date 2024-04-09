import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "./Assests/logo.svg";
import { IoMenuOutline, IoClose } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { MdLocationOn } from "react-icons/md";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { IoPencil } from "react-icons/io5";
import { useUser } from '../providers/userProvider';
import { getWishlist } from './Api';
import { useCartQty } from "./Addtocart";

const Header = ({ onSearch, toggleMenu, menuOpen }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { getToken, getName, onTokenHandler, onNameHandler } = useUser();
  const [showOptions, setShowOptions] = useState(false);
  // const [showCart, setShowCart] = useState(false); // Added state for cart visibility
  const logoutHandler = () => {
    onTokenHandler(null);
    onNameHandler(null);
    localStorage.removeItem('token');
    localStorage.removeItem('name');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleWishlistClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      getWishlist(token)
        .then((wishlistData) => {
          // console.log(wishlistData);
        })
        .catch((error) => {
          console.error('Error fetching wishlist:', error);
        });
    }
  };

  const qty = useCartQty().cartQty;
  
  return (
    <>
      <header className='bg-red-600 fixed top-0 w-full z-50 text-white flex justify-between h-20'>
        <div className='hidden mx-44 items-center justify-between w-full md:flex'>
          <div className='p-3 flex items-center gap-12 w-4/5'>
            <Link to="/">
              <div className='w-32 min-w-[128px]'>
                <img src={logo} className="w-full" alt="Logo" />
              </div>
            </Link>
            <div className='flex items-center' onMouseEnter={toggleMenu} >

              {menuOpen ? (
                <IoClose className='text-3xl' />
              ) : (
                <IoMenuOutline className='text-3xl' />
              )}
              <p className='text-sm'>Menu</p>
            </div>
            <div className={`flex items-center bg-white h-10 w-full max-w-md px-2 rounded-md `}>
              <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="What are you looking for ?" className='w-full bg-transparent outline-none border-none px-3 placeholder:text-sm text-black ' />
              <CiSearch className='text-black text-2xl ' />
            </div>
          </div>

          <div className='flex items-center gap-9'>
            <div className="relative">
              <div className="flex items-center gap-2">
                <MdLocationOn className='text-xl' />
                <p className='whitespace-nowrap text-sm'>Mumbai 400049</p>
                <IoPencil className='text-xs' />
              </div>      
            </div>

            <div className="relative inline-block text-left">
              <div className="inline-flex rounded-md">
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:bg-gray-100 active:text-gray-700"
                  id="options-menu"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onMouseEnter={() => setShowOptions(!showOptions)}
                >
                  {getName ? getName : <FaUser className='text-xl' />}
                </button>
              </div>

              {showOptions && (
                <div
                onMouseLeave={() => setShowOptions(!showOptions)}
                 className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <div className="py-1" role="none">
                    {getToken ? (
                      <>
                        <Link
                          to="/wishlist"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          // onClick={handleWishlistClick}
                          role="menuitem"
                        >
                          My Wishlist
                        </Link>
                        <Link
                          to="/login"
                          onClick={logoutHandler}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          Logout
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          Login
                        </Link>
                        <Link
                          to="/register"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          Register
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className=' relative text-2xl'>
              {/* Updated the cart icon to navigate to "/cart" */}
              <Link to="/cart">
                <FaShoppingCart  />
                
              </Link>
              <p className=' absolute -top-2 -right-2 bg-blue-700 text-white text-center px-1 font-bold text-xs rounded-3xl'>{qty}</p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;