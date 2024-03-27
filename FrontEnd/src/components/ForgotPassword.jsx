import React from 'react'
import { MdEmail } from "react-icons/md";
const ForgotPassword = () => {
  return (
    <div>
      <div className="  text-white bg-transparent backdrop-blur-sm w-96 rounded-lg p-7">
                <form action="">
                    <h1 className="text-4xl text-center mb-5 font-bold">Forgot Password</h1>
                    <div className="inputBox flex relative items-center my-3 h-12 w-full ">
                        <input className="bg-transparent w-full p-5 h-full text-xl placeholder:text-white rounded-3xl outline-none border-2 border-cyan-100" type="email" placeholder="Email" required />
                        <MdEmail className="absolute right-5 top-1/2 -translate-y-2/4" />
                    </div>
                    <button className="w-full h-auto rounded-3xl font-bold hover:bg-red-600 bg-red-800 text-white p-2 my-3">Reset Paasword</button>
                    <button className="w-full h-auto  font-bold  bg-white hover:bg-red-100 text-red-800 p-2 my-3" onClick={()=>{history.back()}}>Back</button>

                </form>
            </div>
    </div>
  )
}

export default ForgotPassword
