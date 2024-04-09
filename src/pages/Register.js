import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [getData, setData] = useState({
        name: '',
        email: '',
        password: '',
        appType: 'ecommerce'
    });

    const [getError, setError] = useState(null);
    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        setData({ ...getData, [event.target.name]: event.target.value });
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
        setError(null);
        if (!getData.name) {
            setError('UserName is mandatory');
            return;
        } else if (!getData.email) {
            setError('Email is mandatory');
            return;
        } else if (!getData.password) {
            setError('Password cannot be empty');
            return;
        }

        axios.post('https://academics.newtonschool.co/api/v1/user/signup', getData, {
            headers: {
                projectID: 'rav6sl4o9c7d'
            }
        }).then((result) => {
            console.log(result);
            navigate('/login');
        }).catch(() => {
            setError('This email ID is already registered.');
        });
    };

    return (
        <div className="container  pt-32 text-black flex justify-center items-center">
            <div className="flex bg-blue-800 justify-center border rounded-3xl w-1/3">
                <div className="w-full max-w-md ">
                    <h2 className="text-2xl mt-5 mb-2 text-center font-bold text-white">Register</h2>
                
                    {getError && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded relative" role="alert">
                        <strong className="font-bold">Error!</strong>
                        <span className="block sm:inline"> {getError}</span>
                    </div>}
                    <form onSubmit={onSubmitHandler} className="bg-transparent shadow-md rounded-3xl px-8 pt-6 pb-8 mb-4 bg-red-700">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-white  font-semibold mb-2">UserName</label>
                            <input type="text" value={getData.name} onChange={onChangeHandler} name="name" autoComplete="off" className="shadow appearance-none bg-inherit border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your username" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-white font-semibold mb-2">Enter your Email ID</label>
                            <input type="email" value={getData.email} onChange={onChangeHandler} name="email" className="bg-inherit shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your email address" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-white font-semibold mb-2">Enter your Password</label>
                            <input type="password" value={getData.password} onChange={onChangeHandler} name="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight bg-inherit focus:outline-none focus:shadow-outline" placeholder="Enter your password" />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="appType" className="block text-white font-semibold mb-2">App Type</label>
                            <select value={getData.appType} onChange={onChangeHandler} name="appType" className="shadow bg-inherit appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline">
                                <option value="ecommerce">Ecommerce</option>
                                <option value="amazon">Amazon</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between">
                            <button type="submit" className="bg-red-600 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;