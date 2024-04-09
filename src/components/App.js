import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from "./Header";
import Menu from "./Menu";
import { ProductList } from "./Home";
import Categories from './Categories';
import Login from '../pages/Login';
import Productdetails from './Productdetails';
import Addtocart from './Addtocart';
import Banner from './Banner';
import Wishlist from './Wishlist';
import Footer from './Footer';
import { useUser } from '../providers/userProvider'; // Ensure correct import path
import Register from '../pages/Register';
import Checkout from './Checkoutpage';
import Payment from './Payment';
import Sucessfull from './Sucessfull';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  //const [token, setToken] = useState(null); // State to manage token
  const [categoriesVisible, setCategoriesVisible] = useState(true); // State to control visibility of categories

  const { getToken } = useUser();
  function ProtectedRoute({ children }) {
    if (getToken) {

      return children;
    }
    else {
      return <Navigate to="/login" />;
    }

  }
  const handleClose = () => {
    // Close categories section by updating visibility state
    setCategoriesVisible(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setSelectedCategory(null);
    setSelectedProductId(null);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setMenuOpen(false);
    setSearchTerm("");
    setSelectedProductId(null);
  };

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  const handleLoginSuccess = (userToken) => {
    setLoggedIn(true);
    setShowLogin(false);
    setToken(userToken); // Set the token upon successful login
  };

  const openProductDetails = (productId) => {
    setSelectedProductId(productId);
  };

  const closeProductDetails = () => {
    setSelectedProductId(null);
  };
 

  return (
    <Router>
      <Header toggleMenu={toggleMenu} menuOpen={menuOpen} onSearch={handleSearchChange} toggleLogin={toggleLogin} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              {menuOpen && <Menu onSelectCategory={handleCategoryClick} />}
              <Banner />
              {!searchTerm && !selectedCategory && !loggedIn && (
                <>
                  <ProductList title="Deals of the Day" url="https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?sort={%22price%22:1}" />
                  <ProductList title="Top Trending Deals" url="https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?sort={%22rating%22:1}" />
                  <ProductList title="Television" url="https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?filter={%22subCategory%22:%22tv%22}" />
                </>
              )}
              {(searchTerm || selectedCategory) && (
                <Categories onClose={handleClose} searchTerm={searchTerm} selectedCategory={selectedCategory} />
              )}


            </>
          }
        />
        <Route path='/productdetails/:productId' element={<Productdetails />} />



        <Route
          path="/login"
          element={<Login handleLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/cart"
          element={<Addtocart />}
        />
        <Route
          path="/checkout"
          element={<Checkout></Checkout>}
        />
        <Route
          path="/payment"
          element={<Payment></Payment>}
        />
        <Route
          path="/wishlist"
          element={<ProtectedRoute><Wishlist token={getToken} /></ProtectedRoute>} // Wrap in ProtectedRoute
        />
        <Route
          path="/sucessfull"
          element={<ProtectedRoute><Sucessfull/></ProtectedRoute>} // Wrap in ProtectedRoute
        />

      </Routes>
      
      <Footer />
    </Router>
  );
}

export default App;