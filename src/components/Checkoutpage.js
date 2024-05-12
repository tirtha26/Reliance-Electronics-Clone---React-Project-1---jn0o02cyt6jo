import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Assuming the user is logged in initially
    const [activeTab, setActiveTab] = useState('checkout');
    const [address, setAddress] = useState({
        name:'',
        mobile: '', 
        street: '',
        city: '',
        state: '',
        country: '',
        zipCode: ''
    });
    
    const [isAddressFormOpen, setAddressFormOpen] = useState(false);
    const onSubmitHandler = () => {
        // Check if any required field is empty
        const requiredFields = ['name', 'mobile', 'street', 'city', 'state', 'country', 'zipCode'];
        const emptyFields = requiredFields.filter(field => !address[field]);
    
        if (emptyFields.length > 0) {
            // Alert if any required field is empty
            alert("Please fill in all mandatory fields");
        } else {
            // All required fields are filled, proceed with submission
            alert("Address saved successfully");
            setAddressFormOpen(false);
            navigate('/payment');
        }
    };

    // const onSubmitHandler = ()=>{
    //     alert("Address saved sucessfully");
    //     setAddressFormOpen(false)
        
    //     navigate('/payment')
    // }
    
    const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZjliODc0NzQ2ZTY5MzYxNzcxOGQxNyIsImlhdCI6MTcxMTE4NDIyNywiZXhwIjoxNzQyNzIwMjI3fQ.JZeqqLswKqR1eo8bRTGuYY2vmC9kD20FIA4eMEOyVFU";
    const projectId = "rav6sl4o9c7d";
    
    const navigate = useNavigate(); // Initialize useNavigate
    
    const handleCart = () => {
        navigate('/cart')
    };
    const handlePayment = () => {
        navigate('/Payment')
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddress({ ...address, [name]: value });
        console.log(address);
        sessionStorage.setItem("address",JSON.stringify(address));
    };

    const cancle=()=>{
        navigate('/cart')
    }
    const handlePayClick = () => {
        // Perform validations
        if (true) {
            console.log("Call the API");
            // Call the API
            fetch('https://academics.newtonschool.co/api/v1/ecommerce/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`,
                    'projectID': projectId
                },
                body: JSON.stringify({
                    productId: "{{productID}}",
                    quantity: 2,
                    addressType: 'HOME',
                    address: address
                })
            })
                .then(response => response.json())
                .then(data => {
                    // Handle success response, show order summary, payment mode, and address in a modal or popup
                    console.log(data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            // Redirect to Login or Register page if user is not logged in
            navigate('/login'); // Example redirection to login page
        }
    };

    
    return (
        <div className='text-black pt-24  lg:px-8 lg:py-12 rounded-lg shadow-md '>
            {/* Header Section */}
            {/* <div className="flex justify-center space-x-4  border-2 border-red-500 rounded-lg p-3 w-1/4 mx-auto gap-6">
                <button className={`btn ${activeTab === 'Cart' && ' hover:border-2 rounded-md border-red-600 p-2  text-white'}`} onClick={() => handleCart()}>Cart</button>
                <button className='  hover:border-2 rounded-md border-red-600 p-2 text-black' onClick={() => handleTabChange('Shipping')} >Address</button>
                <button className={`btn ${activeTab === 'Payment' && 'hover:border-2 rounded-md border-red-600 p-2 text-white'}`} onClick={() => handlePayment()}>Payment</button>
                {/* <button className=' border-2 rounded-md hover:border-red-600 p-2 text-black' onClick={() => handleTabChange('Shipping')} disabled={activeTab !== 'Shipping'}>Address</button>
                <button className={`btn ${activeTab === 'Payment' && 'hover:border-red-600  p-2 text-white'}`} onClick={() => handlePayment()} disabled={activeTab !== 'Payment'}>Payment</button> */}
            {/* </div> */} 

            {/* Shipping Address Form */}
                    <form onSubmit={onSubmitHandler}>

            <div className="lg:mt-10 p-7  lg:w-2/3 w-96 mx-auto">
                <div className=" font-bold bg-blue-500 text-white p-5 mr-7   ">Update Address</div>
                <div className='flex gap-2'>
                    <p className='w-1/2'>Full Name*</p>
                    <p>Mobile Number*</p>
                </div>
                <div className='flex gap-3'>
                    <input className="input w-1/2  border-2 border-blue-500  text-red-600 p-2 rounded mb-4" type="text" name="name" placeholder="Enter your name" value={address.name} onChange={handleAddressChange} />
                    <input className="input w-1/2 border-2 border-blue-500  text-red-600 p-2 rounded mb-4" type="number" name="mobile" placeholder="Enter Mobile Number" value={address.mobile} onChange={handleAddressChange} />
                </div>
                <p>Landmark*</p>
                <input className="input border-2 border-blue-500  text-red-600   w-full p-2 rounded mb-4" type="text" name="street" placeholder="Street" value={address.street} onChange={handleAddressChange} />
                <div className='flex gap-2'>
                    <p className='w-1/2'>City*</p>
                    <p>State*</p>
                </div>
                <div className='flex gap-3'>
                    <input className="input  border-2 border-blue-500  text-red-600   w-1/2 p-2 rounded mb-4" type="text" name="city" placeholder="City" value={address.city} onChange={handleAddressChange} />
                    <input className="input  border-2 border-blue-500  text-red-600   w-1/2 p-2 rounded mb-4" type="text" name="state" placeholder="State" value={address.state} onChange={handleAddressChange} />
                </div>
                <div className='flex gap-2'>
                    <p className='w-1/2'>Country*</p>
                    <p>Pin Code*</p>
                </div>
                <div className='flex gap-3'>
                    <input className="input border-2 border-blue-500  text-red-600  w-1/2 p-2 rounded mb-4" type="text" name="country" placeholder="Country" value={address.country} onChange={handleAddressChange} />
                    <input className="input  border-2 border-blue-500  text-red-600   w-1/2 p-2 rounded mb-4" type="number" name="zipCode" placeholder="Pin Code" value={address.zipCode} onChange={handleAddressChange} />
                </div>
                <p className='mb-4'>All fields are mandetory*</p>
                <button className="btn-primary bg-blue-700 text-white hover:bg-green-700 rounded-lg px-8 py-2 font-bold" onClick={onSubmitHandler}>Submit</button>
                <button className="btn-primary bg-red-700 text-white hover:bg-green-700 rounded-lg ml-4 px-8 py-2 font-bold" onClick={cancle}>Cancle</button>
            </div>


            {/* Checkout Page */}
            {activeTab === 'Payment' && (
                <div className="mt-6">
                    <h2 className="text-2xl font-bold mb-4">Checkout Page</h2>
                    <button className="btn" onClick={() => setAddressFormOpen(true)}>Update Shipping Address</button>
                    <button className="btn-primary ml-4" onClick={handlePayClick}>Pay Now</button>
                </div>
            )}
            </form>
        </div>
    );
};

export default Checkout;