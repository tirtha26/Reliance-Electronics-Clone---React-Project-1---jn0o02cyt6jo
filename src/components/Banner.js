// Banner.js

import React from 'react';
// import bannerImage from './Assests/img-ban.avif'; // Import the banner image
// import "./Assests/img-ban.avif"; // Importing the image file to include it in the build
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavLink } from 'react-router-dom';
const Banner = () => {
  // const settings = {
//   dots: false,
//   infinite: true,
//   speed: 500,
//   slidesToShow: 6,
//   slidesToScroll: 2,
//   nextArrow: <SampleNextArrow />,
//   prevArrow: <SamplePrevArrow />
// };
const settings2 = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />
};
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
      <div
          className={className}
          style={{ ...style, display: "block", background: "gray",color:"black", opacity: 0.3, position: "absolute", zIndex: 100,padding: "60px 0px"}}
          onClick={onClick}
      />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
      <div
          className={className}
          style={{ ...style, display: "block", background: "gray", opacity: 0.3 ,padding: "60px 0px"}}
          onClick={onClick}
      />
  );
    }
  return (
    <div  className='lg:mt-24 mt-32 w-10/12 m-auto'>
    <Slider {...settings2}>
        <NavLink to="/"> <img src="https://www.reliancedigital.in/medias/Kitchen-Fest-Banner-D-rev-1.jpg?context=bWFzdGVyfGltYWdlc3w5OTQzM3xpbWFnZS9qcGVnfGltYWdlcy9oYzQvaDBhLzEwMTI0NzAzNzYwNDE0LmpwZ3xkNTRiZTQyMGZjNmM5NDhjYzRhZWQ2ZjAyNTFmNTk0NDhhMzkzY2YyZjQ0ZDg3MzMwZTY2YTgwYTE0OThhNGNm"></img></NavLink>

        <NavLink to="/"><img src="https://www.reliancedigital.in/medias/Midnight-Sale-Banner-New.jpg?context=bWFzdGVyfGltYWdlc3wxMjQ2MDV8aW1hZ2UvanBlZ3xpbWFnZXMvaDBmL2hmNi8xMDExMDU5MDc0NjY1NC5qcGd8NzY5ZGIzNjVlZDdiMWIxYWE2NmE1YjQ2YzUyZDQ5NWRjNDA5YmUzNzA2ZTNmYzcxNmE4ZjZkZGE4YmNjMTJkZQ"></img></NavLink>

        <NavLink to="/"> <img src="https://www.reliancedigital.in/medias/Gaming-laptops-Banner-1365X260-1-1-1-.jpg?context=bWFzdGVyfGltYWdlc3wyMDQyNTJ8aW1hZ2UvanBlZ3xpbWFnZXMvaDE3L2hlYS8xMDExNDY4ODM4NTA1NC5qcGd8NjM3ZGIyYmVjYThjM2Q3MGVhZTY2YzRlYzg4YmQ2MWQ4NzcxMzdiZDBjYmViYmYxOGYzOTEwYjZjZmIxNTRlNg"></img></NavLink>
        <NavLink> <img src="https://www.reliancedigital.in/medias/OnePlus-Nord-3-5G-1365x260px.jpg?context=bWFzdGVyfGltYWdlc3w5NDg2NXxpbWFnZS9qcGVnfGltYWdlcy9oOGIvaDBjLzEwMTIxNjg4MDIzMDcwLmpwZ3w4MDcwY2E2MjNlZTliYjFmM2M4NGM2YTRmMWUxNmE5ZTEzMjM4MWI4NTZkM2IzYTg0MjlhZjc4YjM0M2EwNGE2"></img></NavLink>
        <NavLink> <img src="https://www.reliancedigital.in/medias/Fireboltt-Oracle-Banner-D.jpg?context=bWFzdGVyfGltYWdlc3wxMzE4MzB8aW1hZ2UvanBlZ3xpbWFnZXMvaDRmL2gxMy8xMDEyMzE2MjgxMjQ0Ni5qcGd8MzgyNmY0ZDczMWNmZDJhOWJjOWE4MWEwY2Q4ZDk4MDBhYTI2ZDAwZjczOTJjODUwYjk0YWRmMjY5OTQyODM5Yg"></img></NavLink>
        <NavLink>  <img src="https://www.reliancedigital.in/medias/Summer-Ready-Sale-Beat-the-Heat-Banner-freebie-D-1-.jpg?context=bWFzdGVyfGltYWdlc3wxMDQxMDZ8aW1hZ2UvanBlZ3xpbWFnZXMvaDA0L2g1MS8xMDEyMDI1MDMyNzA3MC5qcGd8M2M5NDAwZGFmYjgwMGYxZWJhM2FkN2Q4NTdjNWE5YzcyNmZlNzNiYWVjMjgwYjcxMzkwNjI5MDMxMmM2MmE5Yg"></img></NavLink>
        <NavLink to="/"><img src="https://www.reliancedigital.in/medias/Digital-Big-Screen-Fest-Banner-D.jpg?context=bWFzdGVyfGltYWdlc3wyNDI4Mzl8aW1hZ2UvanBlZ3xpbWFnZXMvaGZiL2hjNi8xMDEyMDIzNzkwNzk5OC5qcGd8YWMzM2UzY2Q4YmE1YWE1MmM1NmNkNGM0NGJkNjU1Mjg4NzFmNzQwYTE1ZmVlNTViODQ0NWY5Y2ZkMmFmZjk2NA"></img></NavLink>
        <NavLink to="/">  <img src="https://www.reliancedigital.in/medias/New-Launches-AC-Banner-D.jpg?context=bWFzdGVyfGltYWdlc3wxMzU0MjN8aW1hZ2UvanBlZ3xpbWFnZXMvaDYxL2hlMi8xMDEyMDIyNDU3MTQyMi5qcGd8NDZlMTg5YmVjZmRhYzg4NjAzNGE2OGQyNzY3NjY4NDMxMzBmNTcwZGMwZmQ5ZTJjMDU5MDk1ZmZkNzg5N2VmMQ"></img></NavLink>
        <NavLink to="/"><img src="https://www.reliancedigital.in/medias/JioAirFiber-1365-260-2-1-.jpg?context=bWFzdGVyfGltYWdlc3wzMDc4MDB8aW1hZ2UvanBlZ3xpbWFnZXMvaGIxL2gxNS8xMDExNDY4NjMyMDY3MC5qcGd8OThiMGExMjlhMWE0Yjc3ZDc5MzkxZTMyMmFkZWY3NGMzMjgzZDdhYTdiMDExMGY4ZTA5NjRkNGE5ZjM1OTk4ZA"></img></NavLink>
    </Slider>
    </div>
  );
};

export default Banner;






// import React from 'react';
// import imageArray from './Assests'; // Importing the array of image paths

// function Banner() {
//     return (
//         <div className='w-full bg-white pt-20'>
//             {imageArray.map((image, index) => (
//                 <img key={index} src={image} alt={`Image ${index}`} />
//             ))}
//         </div>
//     );
// }

// export default Banner;