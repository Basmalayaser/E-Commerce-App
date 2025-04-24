import React, { useContext, useState } from 'react'
import style from './Login.module.css'
import {Input ,Card, CardBody, Snippet,Spinner} from "@nextui-org/react";
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { TokenContext } from '../../Context/TokenContext';
import { CartContext } from '../../Context/Cartcontext';
import { WishListContext } from '../../Context/WishListContext';


export default function Login() {

  const [userError,setUserError]=useState(null)
  const {setToken}=useContext(TokenContext)
  const [IsLoading,setIsLoading]=useState(false)
  
  const { getCartProduct} = useContext(CartContext);
  const { getAllProductFromWishlist} = useContext(WishListContext);

  let navigate =useNavigate()

  const formik = useFormik({
    initialValues: {
      email:"",
      password:"",
    },

    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password:Yup.string().required('Password is required').matches(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/,"Password is not valid"),
    
    }),
    onSubmit: (values) => {
     loginForm(values);
    },})

    
async function getCart() {
 await getCartProduct();
}

async function getWishList() {
  await getAllProductFromWishlist();
}

   async function loginForm(values){
    setIsLoading(true)
       return await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values).then( async (data)=>{
        setIsLoading(false)
        setToken(data.data.token)
        localStorage.setItem("userToken",data.data.token)
        getWishList()
        getCart()
        navigate("/")

       }).catch((error)=>{
        setIsLoading(false)
        setUserError(error.response.data.message)
       })
    }



  return (
    <>
     <div className={` flex justify-center items-center h-screen bg_Image`}>
     <Card  className='w-5/6 sm:w-2/3 lg:w-1/3 py-10'>
     <CardBody>

     <form onSubmit={formik.handleSubmit}>
        <div className="text-center">
        <h2 className='text-4xl  font-bold text-orange-500 pb-10 f_roboto'>Login</h2>
        
        </div>
       <div className="w-4/5 mx-auto ">
       {userError? <Snippet color="danger" hideSymbol="false" hideCopyButton="false" className="mb-4 ">{userError}</Snippet>:null}

       <div className="mb-4">
        <Input name='email' id='email' type="email" label="Email" radius="full" className='h-11' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}/>
        {formik.touched.email && formik.errors.email ? (
         <div className='text-red-500'>{formik.errors.email}</div>
       ) : null}
        </div>

        <div className="mb-8">
        <Input name='password' id='password' type="password" label="Password" radius="full"  className='h-11' onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur}/>
        {formik.touched.password && formik.errors.password ? (
         <div className='text-red-500'>{formik.errors.password}</div>
       ) : null}
        </div>

        <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='px-14 py-3 w-full bg-orange-500 text-white rounded-full f_roboto '>
          {IsLoading?<Spinner  color="praimery"/>:"LogIn"}
        </button>

        <div className=' text-gray-500 text-center'>
          <div className="pt-7 pb-2">
          <Link to="/forgetPass" >
             Forget <span className='text-orange-500'>Username/Password ?</span>
          </Link>
          </div>
          <div >
          <Link to="/register" >
             Don't have an account ?<span className='text-orange-500'>Sign up</span>
          </Link>
          </div>
          </div>

       </div>

      </form>

      </CardBody>
      </Card>
      </div>
    </>
  )
}
