import React from 'react'
import style from './MainHome.module.css'
import menImage from './../../assets/men-removebg.png'
import { Link } from 'react-router-dom';

export default function MainHome() {
  return (
    <>
    <div className="bg-[#eee] w-[95%] mx-auto mb-32 mt-8 rounded-xl ">
      <div className="flex flex-wrap pb-5 p-5 md:px-20 ">
         <div className="lg:w-1/2 pt-20">
          <h1 className='archivo-black-regular text-xl md:text-3xl lg:text-4xl '><span className=' text-2xl md:text-4xl xl:text-6xl'>WE </span>HAVE DIVERSE CLOTHING <span className='text-orange-500 text-2xl md:text-4xl xl:text-6xl'>CLOICTION</span> </h1>
          <p className='md:w-2/3 py-12 text-gray-500'>Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
          <Link to="/products">
          <div className="border-1 border-gray-500 inline-block archivo-black-regular">
          <button className='px-14 py-3 bg-orange-500 text-white text-2xl font-semibold  -translate-x-1 -translate-y-1'>Shop Now</button>
          </div>
          </Link>
          <div className="flex pt-14">
            <div className="pr-5 border-r-2">
              <p className=' text-xl lg:text-3xl font-bold archivo-black-regular'>200+</p>
              <p className='text-gray-500'>International Brands</p>
            </div>
            <div className="px-5 border-r-2">
              <p className='text-xl lg:text-3xl font-bold archivo-black-regular'>2,000+</p>
              <p className='text-gray-500'>High-Quality Products</p>
            </div>
            <div className="px-5 border-r-2">
              <p className='text-xl lg:text-3xl font-bold archivo-black-regular'>30,000+</p>
              <p className='text-gray-500'>Happy Customers</p>
            </div>
          </div>
         </div>


         <div className="bg-cover bg-center  hidden lg:block lg:w-1/2" style={{ backgroundImage: `url(${menImage})` }}>
         </div>
        


      </div>
    </div>
    
    </>
  )
}
