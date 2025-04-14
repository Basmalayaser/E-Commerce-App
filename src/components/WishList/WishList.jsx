
import React, { useContext, useEffect, useState } from 'react'
import style from './WishList.module.css'
import { WishListContext } from '../../Context/WishListContext'
import Loader from '../Loader/Loader'
import { CartContext } from '../../Context/Cartcontext'
import { Helmet } from 'react-helmet'

export default function WishList() {

  const[isLoading,setisLoading]=useState(true) 

  let{ removeProductFromWishlist,getAllProductFromWishlist,wishListItems} =useContext(WishListContext)
  let {addProductToCart}=useContext(CartContext)

 useEffect(()=>{
  getWishlist()
},[])

 async function getWishlist() {
   await  getAllProductFromWishlist()
   setisLoading(false)
 }


   async function deleteFromWishList(id){
     await removeProductFromWishlist(id)
     await getAllProductFromWishlist()
     
  }

  async function addToCart(productId){
     await addProductToCart(productId)
 }
  
  return (
    <>
    {isLoading?<Loader/>: <div className="bg-[#eee] min-h-screen pb-10">
      <div className={`container mx-auto xl:px-20 p-5`}>
   
       <div className="py-6 ">
           <h2 className='f_roboto text-2xl font-bold'>Wish List :</h2>
       </div>
     
     <table className="w-full ">
     <tbody>
                   {wishListItems.length === 0 ? (
                     <tr>
                       <td colSpan="6" className="py-4 text-center">No items in the Wishlist</td>
                     </tr>
                   ) : (
                    wishListItems.map((item) => (
                       <tr key={item.id} className="bg-white py-5 ">
                         <td className="py-2 ps-3">
                           <img className=" mx-auto" src={item.imageCover} width="100" alt="Product" />
                         </td>
                         <td>
                           <p className="font-bold text-xl">{item.title?.split(" ").slice(0,5).join(" ")}</p>
                           <p className='text-orange-500 text-xl font-semibold py-1'>{item.price} EGP</p>
                           <i onClick={()=>{deleteFromWishList(item.id)}} className="fa fa-trash mb-1 text-danger cursor-pointer"></i>
                         </td>
                         <td>
                         <div  onClick={()=>addToCart(item.id)} className="bg-orange-500 text-white text-xl px-8 py-3 text-center cursor-pointer me-5">
                             Add To Cart
                         </div>
                         </td>
                       </tr>
                     ))
                   )}
                 </tbody>

   </table>

   </div>
   </div>}

           <Helmet>
                <meta charSet="utf-8" />
                <title>Wish List</title>
            </Helmet>
   </>
  )
}