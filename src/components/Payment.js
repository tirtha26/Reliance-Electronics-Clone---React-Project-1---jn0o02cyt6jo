import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
const PaymentComponent = ({ productID, onSubmit }) => {
  const [quantity, setQuantity] = useState(1);
  const [addressType, setAddressType] = useState("HOME");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");

  // Retrieve data from sessionStorage
  const detail = sessionStorage.getItem("address");
  // Parse the retrieved data, or default to an empty object if it's null
  const adres = detail ? JSON.parse(detail) : {};

  useEffect(() => {
    return () => {
      sessionStorage.removeItem("address");
    };
  }, []);
  const handleSubmit = () => {
    const orderData = {
      productId: productID,
      quantity: quantity,
      addressType: addressType,
      address: {
        street: street,
        city: city,
        state: state,
        country: country,
        zipCode: zipCode,
      },
    };
    onSubmit(orderData);
  };
  const navigate = useNavigate();
  const moveToSuccess = () => {
    navigate('/sucessfull');
  };
  const prompt = () => {
    let id = window.prompt('Enter Your wallet Number');
    if (id !== null && id.length === 5) {
      alert(`Your wallet Number ${id}`);
      document.getElementById("payButton").disabled = false;
      // Attach event listener when enabled
      document.getElementById("payButton").addEventListener('click', moveToSuccess);
    } else {
      window.prompt('wrong number! Try again');
      document.getElementById("payButton").disabled = true;
      // Remove event listener when disabled
      document.getElementById("payButton").removeEventListener('click', moveToSuccess);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h3
        className=" font-bold text-left mb-8 mt-11
    "
      >
        Pay Securely
      </h3>
      <div className="flex flex-col space-y-4">
        <div
          className=" space-x-4 border-2 border-darkgray  w-full"
          style={{ padding: "10px 20px" }}
        >
          <p className="text-xl font-medium text-center">Available Offers</p>
          <p className="text-gray-500 text-center mt-4">
            UPTO SEND INSTANT DISCOUNT WITH HDFC BANK EASY EMI TRANSACTION
          </p>
        </div>
      </div>
      <div className="details" style={{width:'100%'}}> 
      <div className="left " style={{width:'14%'}}> 
        <div className="flex items-center border-b border-solid border-gray-300  p-2">
        <input type="radio" name="payment-method" className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" onClick={prompt}/>
            <label className="text-gray-700">Credit Card EMI</label>
          </div>
          <div className="flex items-center border-b border-solid border-gray-300  p-2">
            <input type="radio" name="payment-method" className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" onClick={prompt} />
            <label className="text-gray-700">Net Banking</label>
          </div>
          <div className="flex items-center border-b border-solid border-gray-300  p-2">
            <input type="radio" name="payment-method" className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" onClick={prompt}/>
            <label className="text-gray-700">UPI</label>
          </div>
          <div className="flex items-center border-b border-solid border-gray-300  p-2">
            <input type="radio" name="payment-method" className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"onClick={prompt} />
            <label className="text-gray-700">Wallet</label>
        </div>
        </div>
      
      <div className="container mx-auto  right w-[70%] absolute lg:top-[30%] top-[37%] lg:right-[12%] right-1">
      <h1 className="text-md font-bold text-center mb-8 flex justify-start border-b border-solid border-gray-300 text-blue-700 p-2" >Payment Option</h1>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
          <p className="text-md font-medium">Select Bank</p>
            <select className="border border-blue-300 rounded-md px-8 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 lg:w-[120%] w-[240px]" >
              {/* <option >Select Bank</option> */}
              <option className="text-red-400 ">State Bank of India</option>
              <option className=" " >Bank of India</option>
              <option className=" ">Bank of Boroda</option>
              <option className=" ">Punjab National Bank</option>
            </select>
            <div className="pera" >
              <p>Click on <b>pay</b> will take You to a secure payment gateway where make your payment <br/> Your order not be compleate without this actions </p>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center mr-4">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5l8 8 8-8z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {/* <p className="text-xl font-medium">Terms & Conditions</p> */}
          <div className="flex items-center">
            <input type="checkbox" id="terms" className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            <label htmlFor="terms" className="text-sm ml-2">I agree <b className="text-blue-700"> Terms & Conditions</b></label>
          </div>
        </div>
        <div className="flex justify-start" style={{margin:'7px'}}>
        <button id="payButton" className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-40" disabled>
        PAY RS {localStorage.getItem('buy')}
      </button>

        </div>
      </div>
    </div>
      
    </div>
      </div>
     
  );
};

export default PaymentComponent;
