import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../providers/userProvider';


function Login() {
  let isAuthenticated;

  const { onTokenHandler, onNameHandler } = useUser();

  const [getData, setData] = useState({
    email: '',
    password: '',
    appType: 'ecommerce'
  });

  const [getError, setError] = useState(null);

  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    setData({ ...getData, [event.target.name]: event.target.value })
  }
 
  const onSubmitHandler = (event) => {
    event.preventDefault();
    
    setError(null);
    if (!getData.email) {
      setError('Email is mandatory');
      return;
    }
    else if (!getData.password) {
      setError('Password cannot be empty');
      return;
    }
    axios.post('https://academics.newtonschool.co/api/v1/user/login', getData, {
      headers: {
        projectID: 'rav6sl4o9c7d'
      }
    }).then((result) => {
      onTokenHandler(result.data.token);
      onNameHandler(result.data.data.user.name);
      isAuthenticated = true;
      navigate('/');
      console.log(isAuthenticated);
      // console.log(result);
    }).catch((error) => {
      setError("Internal server error. Please try again later.");
    })
  }

  return (
    <div style={{ height: "100vh" }} className='flex justify-center items-center'>
      
      <div className="lg:w-1/3 md:w-4/5 w-5/6 border rounded-3xl bg-red-700 shadow-lg p-8 ">
        <h2 className="text-2xl mb-4 text-center  font-bold text-white">Login</h2>
        {getError && <div className="bg-red-500 text-white px-4 py-2 mb-4 rounded">{getError}</div>}
        <form onSubmit={onSubmitHandler} className="space-y-4">
          <div className="form-group">
            <label htmlFor="email" className="block font-semibold text-white">Enter your Email ID</label>
            <input type="email" className="form-input bg-transparent border p-1 mt-1 block w-full rounded-md text-white border-gray-300" value={getData.email} onChange={onChangeHandler} name="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="block font-semibold text-white">Enter your Password</label>
            <input type="password" className="form-input text-white bg-transparent border p-1 mt-1 block w-full rounded border-gray-300" value={getData.password} onChange={onChangeHandler} name="password" placeholder="Enter your password" />
          </div>
          <div className="form-group">
            <label htmlFor="appType" className="block font-semibold text-white">App Type</label>
            <select className=" text-white mt-1 p-1 block w-full bg-transparent border rounded border-gray-300" value={getData.appType} onChange={onChangeHandler} name="appType">
              <option value="ecommerce" className=' bg-inherit'>E-commerce</option>
              <option value="music">Music</option>
              <option value="amazon">Amazon</option>
            </select>
          </div>
          <button type="submit" className="bg-red-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login;