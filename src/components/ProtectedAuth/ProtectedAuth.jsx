import React from 'react'
import style from './ProtectedAuth.module.css'
import { Navigate } from 'react-router-dom'

export default function ProtectedAuth(props) {
  if(localStorage.getItem("userToken")){
    return <Navigate to='/'></Navigate>
  }else{
    return props.children
  }
}
