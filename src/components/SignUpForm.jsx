import React from 'react'
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
const SignUpForm = () => {
    return (
        <>
            <div className="  text-white bg-transparent backdrop-blur-sm w-96 rounded-lg p-7">
                <form action="">
                    <h1 className="text-4xl text-center mb-5 font-bold">Sign Up</h1>
                    <div className="inputBox flex relative items-center my-3 h-12 w-full ">
                        <input className="bg-transparent w-full p-5 h-full text-xl placeholder:text-white rounded-3xl outline-none border-2 border-cyan-100" type="text" placeholder="Username" required />
                        <FaUser className="absolute right-5 top-1/2 -translate-y-2/4" />
                    </div>
                    <div className="inputBox flex relative items-center my-3 h-12 w-full ">
                        <input className="bg-transparent w-full p-5 h-full text-xl placeholder:text-white rounded-3xl outline-none border-2 border-cyan-100" type="email" placeholder="Email" required />
                        <MdEmail className="absolute right-5 top-1/2 -translate-y-2/4" />
                    </div>
                    <div className="inputBox flex relative items-center my-3 h-12 w-full">
                        <input className="bg-transparent w-full p-5 h-full text-xl placeholder:text-white rounded-3xl outline-none border-2 border-cyan-100" type="password" placeholder="Password" required />
                        <RiLockPasswordFill className="absolute right-5 top-1/2 -translate-y-2/4" />
                    </div>
                    <div className="inputBox flex relative items-center my-3 h-12 w-full">
                        <input className="bg-transparent w-full p-5 h-full text-xl placeholder:text-white rounded-3xl outline-none border-2 border-cyan-100" type="password" placeholder="Confirm Password" required />
                        <RiLockPasswordFill className="absolute right-5 top-1/2 -translate-y-2/4" />
                    </div>
                    <button className="w-full h-auto rounded-3xl font-bold hover:bg-red-600 bg-red-800 text-white p-2 my-3">Register</button>
                    <p className='text-center'>By Clicking Register Button you agree to our Terms and Condition and Privacy Policy.</p>
                </form>
                <p className='mt-10 text-center'>Already have an account? <Link to={"/Login/"} href="#" className="hover:text-red-400 font-bold ">Login</Link> </p>
            </div>

        </>
    )
}

export default SignUpForm
