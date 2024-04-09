import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GrPrevious, GrNext } from "react-icons/gr";
import Productdetails from './Productdetails';
import Productcard from './Productcard';
import { useNavigate } from 'react-router-dom';


const fetchData = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        projectID: 'rav6sl4o9c7d'
      }
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

// const settings = {
//   dots: false,
//   infinite: true,
//   speed: 500,
//   slidesToShow: 6,
//   slidesToScroll: 2,
//   nextArrow: <SampleNextArrow />,
//   prevArrow: <SamplePrevArrow />
// };
// const settings2 = {
//   dots: true,
//   infinite: true,
//   speed: 500,
//   slidesToShow: 1,
//   slidesToScroll: 1,
//   nextArrow: <SampleNextArrow />,
//   prevArrow: <SamplePrevArrow />
// };
// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//       <div
//           className={className}
//           style={{ ...style, display: "block", background: "red", opacity: 0.3, position: "absolute", zIndex: 100 }}
//           onClick={onClick}
//       />
//   );
// }

// function SamplePrevArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//       <div
//           className={className}
//           style={{ ...style, display: "block", background: "red", opacity: 0.3 }}
//           onClick={onClick}
//       />
//   );
//     }
const useFetchData = (url) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData(url).then((responseData) => {
      setData(responseData);
    });
  }, [url]);

  return data;
};

const ProductList = ({ title, url, loggedIn, token }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const dealOfTheDay = useFetchData(url);
  const navigate = useNavigate();

  const handleNext = () => {
    if (startIndex + 1 < dealOfTheDay.length && startIndex + 1 < dealOfTheDay.length / 4) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (startIndex - 1 >= 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleCardClick = (productId) => {
    setSelectedProductId(productId);
    setShowModal(true);
    navigate(`./productdetails/${productId}`);
  };


  const closeModal = () => {
    setShowModal(false);

  };

  return (
    <div className='pt-8  text-black'>
     
      <h1 className='ml-4 md:ml-52 mt-12 text-black text-2xl font-bold'>{title}</h1>
      <div className='flex justify-center items-center bg-121212 w-4/5 mt-8 m-auto overflow-hidden z-40'>
        <GrPrevious onClick={handlePrevious} className="bold text-white disabled:opacity-50" disabled={startIndex === 0} />
        <div className="overflow-hidden w-full mx-2" style={{ overflowX: 'hidden' }}>
          <div className="flex" style={{ transform: `translateX(-${startIndex * 100}%)`, transition: 'transform 1.7s ease' }}>
            {dealOfTheDay.map((product, index) => (
              <Productcard key={index} product={product} onClick={() => handleCardClick(product._id)} isAuthenticated={loggedIn} />
            ))}
          </div>
        </div>
        <GrNext onClick={handleNext} className="text-white disabled:opacity-50" disabled={startIndex + 4 >= dealOfTheDay.length} />
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close text-4xl cursor-pointer absolute top-20 right-5 z-50" onClick={closeModal}>&times;</span>
            <Productdetails productId={selectedProductId} />
          </div>
        </div>
      )}
    </div>
  );
};

export { ProductList };