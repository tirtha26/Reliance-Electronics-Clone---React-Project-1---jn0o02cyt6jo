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
     <div className=' w-60 border-4 border-red-600 bg-red-600 ml-12 lg:ml-[40%] mt-40 rounded-2xl h-52'>
        <img src={logo} alt="" className='logo   rounded-10 h-150 w-full'/>
       <h1 className='text-center text-white font-bold font font-serif'>Your item Succesfully <br /> Orderd <br className='text-blue-400'/>Thank You</h1>
        <button className='btn px-5 py-1 ml-5 mt-2 rounded-lg bg-blue-700 text-cyan-50 font-serif hover:bg-green-700 font-medium' onClick={home}>Continue to shopping</button>
     </div>
   )
 }
 
 export default Sucessfull
 