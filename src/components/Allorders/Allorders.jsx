import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "./../../Context/Cartcontext";
import Loader from "../Loader/Loader";

const OrdersComponent = () => {
  const { getAllOrders } = useContext(CartContext);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setLoading] = useState(true);


 async function getOrdersList(){
     let response = await getAllOrders()
     setCartItems(response.data)
     setLoading(false) 
  }


  useEffect(()=>{
     getOrdersList()
  },[])
 return(<>
  {isLoading?<Loader/>: <div className="bg-[#eee] min-h-screen">
    <div className={`container mx-auto xl:px-20 p-5`}>
 
     <div className="flex justify-between py-6 ">
         <h2 className='f_roboto text-2xl font-bold'>Orders :</h2>
          
     </div>
   
   <table className="w-full ">
   <thead className=''>
     <tr className='bg-white border-b-1'>
       <th className='py-5 font-bold f_roboto  md:text-xl text-lg'>Order</th>
       <th className='py-5 font-bold f_roboto  md:text-xl text-lg'>Date</th>
       <th className='py-5 font-bold f_roboto  md:text-xl text-lg'>Items</th>
       <th className='py-5 font-bold f_roboto  md:text-xl text-lg'>Total Price</th>
       <th className='py-5 font-bold f_roboto  md:text-xl text-lg'>Payment</th>
       <th className='py-5 font-bold f_roboto  md:text-xl text-lg'>Payment Method</th>
       <th className='py-5 font-bold f_roboto  md:text-xl text-lg'>Delivery</th>
     </tr>
   </thead>
   <tbody>
                 {cartItems.length === 0 ? (
                   <tr>
                     <td colSpan="6" className="py-4 text-center">No items in the cart.</td>
                   </tr>
                 ) : (
                   cartItems.map((item) => (
                     <tr key={item.id} className="bg-white py-5 text-center">
                       <td>
                         <p > {item.id} </p>
                       </td>
                       <td>
                        <p>{item.createdAt}</p>
                       </td>
                       <td >
                       {item.cartItems.length }
                       </td>
                       <td>
                        <p>{item.totalOrderPrice} $</p>
                       </td>
                       
                       <td >
                         <p>{item.isPaid?<p className="text-green-500 border-1 rounded-md bg-green-100 border-green-400">Paid</p>:<p className="text-yellow-400 border-1 rounded-md bg-yellow-100 border-yellow-400">UnPaid</p>}</p>
                       </td>
                       <td>
                         <p>{item.paymentMethodType}</p>
                       </td>
                       <td>
                       <p>{item.isDelivered?<p className="text-green-500 border-1 rounded-md bg-green-100 border-green-400">Delivered</p>:<p className="text-yellow-400 border-1 rounded-md bg-yellow-100 border-yellow-400">Processing</p>}</p>
                       </td>
                     
                     </tr>
                   ))
                 )}
               </tbody>
              
 </table>
  </div>
  </div>}
 </>)
}

export default OrdersComponent;
