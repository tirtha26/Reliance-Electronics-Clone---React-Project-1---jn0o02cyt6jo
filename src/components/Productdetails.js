import React, { useState, useEffect } from "react";
import axios from "axios";
import sanitizeHtml from "sanitize-html";
import { GrPrevious, GrNext } from "react-icons/gr";
import { useParams } from "react-router-dom";
import { addToCart } from "./Api"; // Import addToCart function
// import Checkout from './Checkoutpage';
import { useNavigate } from "react-router-dom";
const Productdetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth < 1100);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://academics.newtonschool.co/api/v1/ecommerce/product/${productId}`,
          {
            headers: { projectID: "rav6sl4o9c7d" },
          }
        );
        setProduct(response.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (product && product.images && product.images.length > 1) {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % product.images.length
        );
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [product]);

  const handleNextImage = () => {
    if (currentImageIndex < product.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  function formatPrice(price) {
    const [wholePart, decimalPart] = price.toFixed(2).toString().split(".");
    const formattedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formattedWholePart + (decimalPart ? `.${decimalPart}` : "");
  }

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleAddToCart = () => {
    const defaultQuantity = 1;
    addToCart(product._id, defaultQuantity)
      .then(() => {
        alert("Product added to cart successfully!");
      })
      .catch((error) => {
        alert("Failed to add product to cart. Please try again later.");
        console.error("Error adding product to cart:", error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const dotStyle = {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    margin: "0 5px",
    cursor: "pointer",
    background: "#fff",
    opacity: "0.5",
  };

  const activeDotStyle = {
    ...dotStyle,
    opacity: "1",
  };

  const checkout = () => {
    localStorage.setItem("buy", product.price * 83);
    navigate("/checkout");
  };

  return (
    <div className="container z-40 bg-white">
      <div className="text-black mx-auto lg:w-4/5 w-screen pt-40">
        <div className="lg:flex gap-10">
          {product.images && product.images.length > 0 && (
            <div className="mb-4 flex flex-col ">
              <div className="flex items-center">
                <GrPrevious className="" onClick={handlePreviousImage} />
                <div
                  className="flex flex-wrap justify-start overflow-x-auto overflow-y-hidden"
                  style={{ height: "500px", width: "600px", overflow: "auto" }}
                >
                  {product.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Product ${index + 1}`}
                      style={{
                        height: "auto",
                        maxWidth: "100%",
                        maxHeight: "100%",
                        marginBottom: "8px",
                        marginRight: "8px",
                        flex: "0 0 auto",
                        margin: "auto",
                      }}
                      className={` ${
                        index !== currentImageIndex ? "hidden" : ""
                      } rounded-2xl`}
                    />
                  ))}
                </div>
                <GrNext className="" onClick={handleNextImage} />
              </div>
              <div>
                <div className="flex justify-center mt-6">
                  {product.images.map((image, index) => (
                    <div
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      style={
                        index === currentImageIndex ? activeDotStyle : dotStyle
                      }
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div>
            <h1 className="lg:text-2xl text-lg font-bold mb-4 px-4 "  >
              {product.name}
            </h1>
            <span className="px-4 py-2 text-sm font-bold rounded-3xl text-white bg-red-700 ml-3 ">
              Limited Period Deal
            </span>
            <div className="my-7 lg:text-3xl text-lg pl-3">
              <p>
                ₹
                {formatPrice(
                  product.price < 400 ? product.price * 83 : product.price
                )}
              </p>
              <p className="text-sm text-blue-700 underline font-medium">
                Be the First One to Review
              </p>
            </div>
            {product.features && (
              <div
                className="mb-4 mt-8 p-7 border rounded-xl"
                
              >
                <h2 className="font-bold mb-4 text-lg">Key Features</h2>
                <ul>
                  {product.features.map((feature, index) => (
                    <li className="mt-1 list-disc ml-5 font-medium" key={index}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="mb-4 border p-8 m-8 rounded-xl">
            <h2 className="font-bold mb-2 text-2xl">Overview</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: showFullDescription
                  ? sanitizeHtml(product.description)
                  : sanitizeHtml(product.description.slice(0, 300)),
              }}
            />
            {product.description.length > 300 && (
              <button
                onClick={toggleDescription}
                className="px-3 mt-6 py-1 rounded-xl border text-black"
              >
                View {showFullDescription ? "Less" : "More"}
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="w-3/4 border mb-10 text-black p-7 mx-auto rounded-xl">
        <h2 className="font-bold mb-10 text-xl">Customer Ratings</h2>
        <p className="font-bold">Review this product</p>
        <p className="text-sm">Help other customers make their decision</p>
        <button className="py-2 px-20 mt-5 font-bold border rounded-xl">
          Write a Review
        </button>
      </div>
      <div className="flex justify-center items-center h-16 bg-red-700 fixed bottom-1 lg:w-full w-screen z-50 text-white">
        <div className="font-semibold">
          <h2 className="lg:text-lg text-[10px] pl-3">{product.name}</h2>
          <p className="lg:text-lg text-[13px] pl-3">
            ₹
            {formatPrice(
              product.price < 400 ? product.price * 83 : product.price
            )}
          </p>
        </div>
        <button
          className="bg-blue-700 ml-10 mr-3 text-white text-[10px] hover:bg-green-800 font-semibold py-2 px-4 rounded-lg lg:text-lg"
          onClick={checkout}
        >
          Buy Now
        </button>
        <button
          onClick={handleAddToCart}
          className="text-white bg-transparent  hover:bg-green-800 border py-2 px-4 rounded-lg text-[10px] mr-2 lg:text-lg"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Productdetails;
