import { useEffect, useState } from 'react';
import { GrFavorite } from "react-icons/gr";
import { TiStar } from "react-icons/ti";
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import Productdetails from './Productdetails';
import { useNavigate } from 'react-router-dom';
import { removeFromWishlist, addToWishlist } from './Api';
import { FaHeart } from "react-icons/fa";


const Categories = ({ searchTerm, selectedCategory, onClose }) => {
    const [products, setProducts] = useState([]);
    const [selectedProductID, setSelectedProductID] = useState(null); // State to store the selected product ID
    const [loading, setLoading] = useState(false);
    const [categoriesVisible, setCategoriesVisible] = useState(true);
    const navigate = useNavigate();
    const [wishlist, setWishlist] = useState([]);
    const token = localStorage.getItem('token');
    const [sortBy, setSortBy] = useState('topRated');


    useEffect(() => {
        let timer;
        const delay = 800;

        const fetchProducts = async () => {
            setLoading(true);
            try {
                let url = 'https://academics.newtonschool.co/api/v1/ecommerce/electronics/products';

                if (searchTerm) {
                    url += `?filter={"subCategory":"${searchTerm}"}`;
                } else if (selectedCategory) {
                    url += `?filter={"subCategory":"${selectedCategory}"}`;
                }

                const response = await axios.get(url, { headers: { projectID: 'rav6sl4o9c7d' } });
                const jsonData = response.data;
                setProducts(jsonData.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(fetchProducts, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [searchTerm, selectedCategory]);

    useEffect(() => {
        // Fetch wishlist when component mounts
        if (token) {
            const fetchWishlist = async () => {
                try {
                    const response = await axios.get('wishlistEndpoint', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setWishlist(response.data);
                } catch (error) {
                    console.error("Error fetching wishlist:", error);
                }
            };
            fetchWishlist();
        }
    }, [token]);

    useEffect(() => {
        let timer;
        const delay = 800; // Adjust delay time as needed

        const fetchProducts = async () => {
            setLoading(true);
            try {
                let url = 'https://academics.newtonschool.co/api/v1/ecommerce/electronics/products';

                if (searchTerm) {
                    url += `?filter={"subCategory":"${searchTerm}"}`;
                } else if (selectedCategory) {
                    url += `?filter={"subCategory":"${selectedCategory}"}`;
                }

                console.log("Fetching data from URL:", url);

                const response = await axios.get(url, { headers: { projectID: 'rav6sl4o9c7d' } });
                const jsonData = response.data;
                let sortedProducts = [...jsonData.data]; // Copy the products array
                // Sorting logic based on selected value
                if (sortBy === 'topRated') {
                    sortedProducts.sort((a, b) => b.ratings - a.ratings); // Sort by ratings (descending)
                } else if (sortBy === 'priceLow') {
                    sortedProducts.sort((a, b) => a.price - b.price); // Sort by price (ascending)
                } else if (sortBy === 'priceHigh') {
                    sortedProducts.sort((a, b) => b.price - a.price); // Sort by price (descending)
                }
                setProducts(sortedProducts);
                setFilterOptions({
                    categories: jsonData.filterOptions.categories,
                    brands: jsonData.filterOptions.brands,
                    sellerTags: jsonData.filterOptions.sellerTags
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        // Debouncing the API call
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(fetchProducts, delay);

        // Cleanup function to clear timer
        return () => {
            clearTimeout(timer);
        };
    }, [searchTerm, selectedCategory, sortBy]);

    const renderRatingStars = (rating) => {
        const filledStars = Array.from({ length: Math.min(rating, 5) }, (_, i) => <TiStar key={`filled_${i}`} className="text-white" />);
        const emptyStars = Array.from({ length: Math.max(5 - rating, 0) }, (_, i) => <TiStar key={`empty_${i}`} className="text-red-600" />);
        return [...filledStars, ...emptyStars];
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleFavoriteClick = async (event, productId) => {
        event.stopPropagation();
        if (!token) {
            alert("Please login first");
            return;
        }
        try {
            if (isInWishlist(productId)) {
                await removeFromWishlist(productId, token);
                setWishlist(wishlist.filter(item => item._id !== productId));
            } else {
                await addToWishlist(productId, token);
                setWishlist([...wishlist, { _id: productId }]);
            }
        } catch (error) {
            console.error("Error toggling wishlist:", error);
        }
    };

    const isInWishlist = (productId) => {
        return wishlist.some(item => item._id === productId);
    };

    const handleProductClick = (productId) => {
        setSelectedProductID(productId); // Set the selected product ID when a product is clicked
        navigate(`./productdetails/${productId}`);
    };

    return (
        <>
            {categoriesVisible && (
                <div className=' w-full absolute top-20 bg-white pb-8'>
                    <h1 className='text-black text-2xl font-bold lg:mb-6 lg:ml-48 lg:mt-16 ml-16 mt-20'>Results for "{searchTerm || selectedCategory}"</h1>
                    <div className='lg:mt-6  mt-10 lg:ml-36 '>
                        <label className="text-white font-semibold ">Sort By: </label>
                        {/* <select value={sortBy} onChange={handleSortChange} className="bg-red-600 text-white px-2 py-1 rounded-md lg:w-11 w-20 "style={{padding:'11px',marginTop:'10px',width:'11%'}}> */}
                        <select value={sortBy} onChange={handleSortChange} className="bg-red-600 text-white px-2 py-1 rounded-md lg:w-36 w-28 ">
                            <option value="topRated">Top Rated</option>
                            <option value="priceLow">Price (Lowest First)</option>
                            <option value="priceHigh">Price (Highest First)</option>
                        </select>
                    </div>
                    {loading ? (
                        <p className="text-black ml-52">Loading...</p>
                    ) : (
                        <div className='grid lg:grid-cols-3 gap-4 justify-center items-center bg-121212 mx-auto lg:max-w-7xl '>
                            {products.map((product) => (
                                <div onClick={() => handleProductClick(product._id)} className="relative flex-shrink-0 rounded-2xl bg-red-600 overflow-hidden px-2 shadow-lg mx-4 my-4 transform transition duration-300 hover:scale-105 lg:w-96 lg:h-96 h-96"  key={product._id}>
                                    <div className="absolute top-0 right-0 m-2" onClick={(event) => handleFavoriteClick(event, product._id)}>
                                        {isInWishlist(product._id) ? <FaHeart className='text-blue-700 my-5 mr-2' /> : <GrFavorite className='text-white my-5 mr-2' />}
                                    </div>
                                    <div style={{ height: "200px", width: "300px", overflow: "hidden" }} >
                                        <img src={product.displayImage} alt={product.name} className="w-full h-full object-fit: fill; lg:mt-1 mt-10" />
                                    </div>
                                    <div className="p-2 bg-blue-800 rounded-2xl mt-10">
                                        <h3 className="text-lg font-semibold overflow-hidden text-white " style={{ maxHeight: "3rem" }}>{product.name}</h3>
                                        <p className="text-white text-xl my-2">₹{product.price}.00</p>
                                        <div className="flex items-center mt-2">
                                            {renderRatingStars(product.ratings)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {/* Render Productdetails component with selected product ID */}
                    {selectedProductID && <Productdetails productId={selectedProductID} />}
                </div>
            )}
        </>
    );
};

export default Categories;





   

    


    