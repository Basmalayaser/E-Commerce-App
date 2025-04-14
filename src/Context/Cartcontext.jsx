import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";



export let CartContext =createContext()

export default function CartContextProvider(props) {

    const[noOfCartItem,setNoOfCartItem]=useState(0)
    const[totalPrice,setTotalPrice]=useState(0)
    const[cartId,setcartId]=useState(null)
    const [userId, setUserId] = useState(localStorage.getItem("userId") || null);

  let headers={
    token:localStorage.getItem("userToken")
}

useEffect(() => {
  if (localStorage.getItem("userToken")) {
    getCartProduct();
  }
}, []);



 async function addProductToCart(productId){ 
    return  await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
        productId
    },{
        headers
    }).then((response)=>{
        toast.success(response.data.message)
        setNoOfCartItem(response.data.numOfCartItems)
        setTotalPrice(response.data.data.totalCartPrice)
        setcartId(response.data.data._id)
        return response
    }).catch((error)=>{
        toast.error(error.response.data.message) 
        return error
    })

  }


  async function getCartProduct(){
    return  await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
        headers :{token:localStorage.getItem("userToken")}
    }).then((response)=>{
        setNoOfCartItem(response.data.numOfCartItems)
        setTotalPrice(response.data.data.totalCartPrice)
        setcartId(response.data.data._id)
        return response
    }).catch((error)=>{
        return error
    })

  }

  async function deleteItem(id){
    return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        headers
    }).then((response)=>{
        toast.success(response.data.status)
        setTotalPrice(response.data.data.totalCartPrice)
        return response
    }).catch((error)=>{
        toast.error(error)
    })
  }

  async function UpdateProductQuantity(id,count){
    return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        count
    },{
        headers
    }).then((response)=>{
        toast.success(response.statusText)
        setTotalPrice(response.data.data.totalCartPrice)
        setcartId(response.data.data._id)
        return response
    }).catch((error)=>{
        toast.error(error)
        return error
    })
  }


  async function clearCart(){
    return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
        headers
    }).then((response)=>{
        return response
    }).catch((error)=>{
        return error
    })
  }


  async function onlinePayment(shippingAddress){
    return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://github.com/Basmalayaser/E-Commerce-App`,{
        shippingAddress
    },{
        headers
    }).then((response)=>{
        setNoOfCartItem(response.data.numOfCartItems)
         return response
    }).catch((error)=>{
      toast.error(error.response?.data?.message)
        return error
    })
  }



async function cashPayment(shippingAddress) {
  try {
    const response = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      { shippingAddress },
      { headers }
    );

    setNoOfCartItem(response.data.numOfCartItems);
    setTotalPrice(response.data.data.totalCartPrice);
    setUserId(response.data.data.user);
    localStorage.setItem("userId", response.data.data.user);
    return response;
  } catch (error) {
    return error;
  }
}

  
  async function getAllOrders() {
    if (!userId) {
      return null;
    }
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
      );
      
      return response;
    } 
    catch (error) {
      return error;
    }
  }


  return <CartContext.Provider value={{addProductToCart ,getCartProduct,UpdateProductQuantity ,deleteItem,clearCart,noOfCartItem,totalPrice,setNoOfCartItem,onlinePayment,cashPayment,getAllOrders,cartId,userId}}>
            {props.children}
         </CartContext.Provider>
}
