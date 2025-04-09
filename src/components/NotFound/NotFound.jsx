import React from 'react'
import style from './NotFound.module.css'
import  ImageNotFound  from './../../assets/image-not-found.jpg'

export default function NotFound() {
  return (
    <>
   <div className="flex justify-center items-center min-h-screen">
     <div className="text-center">
      <img src={ImageNotFound} alt="ImageNotFound" className='w-1/4 h-auto mx-auto' />
       <p className='text-xl text-gray-500 pt-5'>404 - Page Not Found </p>
     </div>
   </div>
    </>
  )
}