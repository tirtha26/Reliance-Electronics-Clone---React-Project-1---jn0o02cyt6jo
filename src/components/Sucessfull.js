 import React from 'react'
 import logo from "./Assests/logo.svg";
 import {useNavigate} from "react-router-dom"
 const Sucessfull = () => {
    const naigate=useNavigate();
    const home=()=>{
        naigate('/')
        localStorage.removeItem('buy');
    }
   return (
     <div className='w-40/100 border-4 border-red-600 bg-red-600'style={{ width: "18%",marginLeft: "40%",marginTop: "10%", borderRadius: "10px", height: "210px"}}>
        <img src={logo} alt="" className='logo w-20  rounded-10 h-150' style={{    width: "100%", margintop: "0"}}/>
       <h1 className='text-center text-white font-bold font font-serif'>Your item Succesfully <br /> Orderd <br className='text-blue-400'/>Thank You</h1>
        <button className='btn' onClick={home}>Continue to shopping</button>
     </div>
   )
 }
 
 export default Sucessfull
 