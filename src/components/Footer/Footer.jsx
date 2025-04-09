import React from 'react'
import style from './Footer.module.css'
import { Button } from '@nextui-org/react';

export default function Footer() {
  return (
    <>
    <div className="lg:relative mt-40">
      <div className=" bg-orange-500 p-10 lg:rounded-3xl  lg:mx-32 lg:absolute lg:top-[-100px]">
          <div className="md:flex">
            <div className="md:w-1/2">
              <p className='text-white text-2xl xl:text-4xl font-bold archivo-black-regular'>STAY UPTO DATE ABOUT OUR LATEST OFFERS</p>
            </div>
            <div className="md:w-1/2">
                <div className="mx-auto text-center pt-5 md:pt-0">
                <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full w-2/3  p-3 mb-3 text-center " placeholder="Enter your email address" required />
                <button type='submit' className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-full  w-2/3 p-3">Subscribe to Newsletter</button>
                </div>
            </div>
         </div>
      </div>   
      <div className="bg-gray-100 px-20 lg:px-32">
        <div className="lg:flex md:flex-wrap lg:py-32 py-10">
          <div className="lg:w-1/3 ">
           <p className='font-bold text-3xl archivo-black-regular '>QuicKCart</p>
           <p className='text-lg py-2 lg:py-6'>We have clothes that suits your style and which you’re proud to wear. From women to men.</p>
           <div className="flex">
                 <div className="footer-icon">
                     <a href='#' className="fa-brands fa-twitter text-lg"></a>
                 </div>
                 <div className="footer-icon">
                     <a href='#'className="fa-brands fa-facebook text-lg"></a>
                 </div>
                 <div className="footer-icon">
                     <a href='#'className="fa-brands fa-instagram text-lg"></a>
                 </div>
                 <div className="footer-icon">
                      <a href='#' className="fa-brands fa-github text-lg"></a>
                 </div>
            </div>
          </div>
          <div className="lg:w-2/3 ">
          <div className="flex flex-wrap lg:pt-0 pt-10">
            <div className='w-1/2 lg:w-1/4'><p className="footer-subTitle">Company</p><a className="block mb-5" href="#">About</a><a className="block mb-5" href="#">Features</a><a className="block mb-5" href="#">Works</a><a className="block mb-5" href="#">Career</a></div>
            <div className='w-1/2 lg:w-1/4'><p className="footer-subTitle">Help</p><a className="block mb-5" href="#">Customers Support</a><a className="block mb-5" href="#">Delivery Details</a><a className="block mb-5" href="#">Terms &amp; Conditions</a><a className="block mb-5" href="#">Privacy Policy</a></div>
            <div className='w-1/2 lg:w-1/4'><p className="footer-subTitle">FAQ</p><a className="block mb-5" href="#">Account</a><a className="block mb-5" href="#">Manage Deliveries</a><a className="block mb-5" href="#">Orders</a><a className="block mb-5" href="#">Payments</a></div>
            <div className='w-1/2 lg:w-1/4'><p className="footer-subTitle">Resources</p><a className="block mb-5" href="#">Free eBooks</a><a className="block mb-5" href="#">Development Tutorial</a><a className="block mb-5" href="#">How to - Blog</a><a className="block mb-5" href="#">Youtube playlist</a></div></div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}
