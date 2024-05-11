// Footer.js

import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="bg-blue-800 text-white mt-20 py-10">
            <div className="w-5/6 mx-auto container px-4">
                <div className="flex flex-wrap justify-center">
                    {/* Connect with Us Section */}
                    <div className=" w-full lg:w-4/12 px-4 mb-4">
                        <h4 className="text-2xl font-semibold mb-4">CONNECT WITH US</h4>
                        <div className="flex items-center footer_search">
                            <input
                                type="email"
                                placeholder="Enter Email ID"
                                className="bg-white rounded-l px-4 py-2 outline-none focus:bg-red-600 text-white"
                            />
                            <button className="bg-gray-600 rounded-r px-4 py-2 ml-2 hover:bg-red-600">Subscribe</button>

                        </div>
                        <div className='flex gap-7 py-5 text-3xl'>
                            <a href="https://www.facebook.com/reliancedigital/" target="_blank" rel="noopener noreferrer"><FaFacebook className="text-white mr-2 hover:text-blue-600 cursor-pointer" /></a>

                            <a href="https://twitter.com/RelianceDigital/" target="_blank" rel="noopener noreferrer"><FaTwitter className="text-white mr-2 hover:text-blue-600 cursor-pointer" /></a>

                            <a href="https://www.instagram.com/reliance_digital/" target="_blank" rel="noopener noreferrer">
                                <FaInstagram className="text-white mr-2 hover:text-pink-600 cursor-pointer" />
                            </a>
                            <a href="https://www.linkedin.com/company/reliance-digital-retail-ltd-/?originalSubdomain=in" target="_blank" rel="noopener noreferrer"><FaLinkedin className="text-white mr-2 hover:text-blue-600 cursor-pointer" /></a>

                            <a href="https://www.youtube.com/c/reliancedigital/videos" target="_blank" rel="noopener noreferrer" className="text-white mr-2 hover:text-red-600 cursor-pointer">
                                <FaYoutube />
                            </a>
                        </div>

                        <p className="mt-10 text-m">© Copyright 2023 Relince Digital. All rights reserved</p>
                    </div>

                    {/* Useful Links Section */}
                    <div className=" border-x-2 w-full lg:w-4/12 px-4 pl-12 mb-4">
                        <h4 className="text-xl font-bold mb-4">USEFUL LINKS</h4>
                        <ul className="flex gap-10 text-sm font-bold">
                            <div>
                                <li className='mb-4'><a href="#" className="hover:text-red-700">About </a></li>
                                <li className='mb-4'><a href="#" className="hover:text-red-700">Help And Support</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-red-700">FAQs</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-red-700">Buying Guide</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-red-700">Return Policy</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-red-700">B2B Orders</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-red-700">Store Locator</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-red-700">E-Waste</a></li>
                            </div>
                            <div>
                                <li className='mb-4'><a href="#" className="hover:text-red-700">Franchise Opportunity</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-red-700">Site Map</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-red-700">Careers At Relince</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-red-700">Terms Of Use</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-red-700">Disclaimer</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-red-700">Privacy Policy</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-red-700">Unboxed</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-red-700">Gift Card</a></li>
                            </div>
                        </ul>
                    </div>

                    {/* Products Section */}
                    <div className="w-full pl-12 lg:w-4/12 px-4 mb-4">
                        <h4 className="text-xl font-bold mb-4">PRODUCTS</h4>
                        <ul className="flex gap-10 text-sm font-bold">
                            <div>
                                <li className='mb-4'><a href="#" className="hover:text-red-700">Televisions & Accessories</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-red-700">Home Appliances</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-red-700">Phones & Wearables</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-red-700">Computers & Tablets</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-red-700">Kitchen Appliances</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-red-700">Audio & Video</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-red-700">Health & Fitness</a></li>
                            </div>
                            <div>
                                <li className='mb-4'><a href="#" className="hover:text-red-700">Grooming & Personal Care</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-red-700">Cameras & Accessories</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-red-700">Smart Devices</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-red-700">Gaming</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-red-700">Accessories</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-red-700">Top Brands</a></li>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;