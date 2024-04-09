import { useEffect, useState } from 'react';
import { MdNavigateNext } from "react-icons/md";
import axios from 'axios';

const Menu = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://academics.newtonschool.co/api/v1/ecommerce/electronics/categories', { headers: { projectID: 'rav6sl4o9c7d' } });
        const jsonData = response.data;
        setCategories(jsonData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    onSelectCategory(category);
  };

  return (
    <div className='bg-blue-800 m-1 ml-72 fixed z-50 text-white w-76'>
      <h2 className='text-xl ml-2'>Categories:</h2>
      <ul>
        {categories && categories.map((category, index) => (
          <li className=' flex text-lg justify-between cursor-pointer capitalize px-5 py-2  hover:bg-red-600 hover:text-black' key={index} onClick={() => handleCategoryClick(category)}>{category} <MdNavigateNext className='mt-1 text-xl' /></li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;