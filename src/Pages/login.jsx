import React from 'react'
import { Outlet } from 'react-router-dom'
const Login = () => {
  return (
    <div className="w-full bg-loginBg flex justify-center image items-center py-5 min-h-full ">
     <Outlet />
    </div>
  )
}

export default  Login
