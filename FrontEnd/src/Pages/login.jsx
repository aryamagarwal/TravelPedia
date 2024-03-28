import React from 'react'
import { Outlet } from 'react-router-dom'
const Login = () => {
  return (
    <div className="w-full flex flex-col bg-loginBg image items-center py-5 h-20 mb-80">
      <div className="">
        <Outlet/>
      </div>
    </div>
  )
}

export default Login
