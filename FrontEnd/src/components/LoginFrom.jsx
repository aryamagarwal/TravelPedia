import React, { useContext } from 'react'
import { useState } from 'react';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { IsLoggedInContext } from '../App.jsx';
import { useNavigate } from 'react-router-dom';
import userData from '../assets/db/user.js'
import Block from './block';
const LoginForm = () => {
    const navigate = useNavigate();
    const user=userData;
    const [email , setEmail] = useState("");
    const [password, setPassword]=useState("");
    const {setIsLoggedIn , setUser} = useContext(IsLoggedInContext);
    const updateEmail=(e)=>{
         setEmail(e.target.value);
    }
    const updatePassword=(e)=>{
        setPassword(e.target.value);
   }
   const validate=()=>{
        const found=user.find((user)=>user.email===email);
        console.log(found);
        if(found)
        {
           if(found.password===password)
            {
               
                setIsLoggedIn(true);
                setUser(found);
                navigate(`/user/dashboard/${found.firstName} ${found.LastName}`);
            }
            else
            {
                alert("Wrong email or password!");
            }
        }
        else{
            alert("Wrong email or password!");
        }
   }
   //stop form reload on submit and redirect to user Pages
   const handleSubmit = (e) => {
    e.preventDefault();
    validate();
     };
    return (
        <>
        <Block></Block>
        <div className='flex justify-center p-32 '>
        <div className="backdrop-blur-sm w-96 p-7 mb-auto box-content shadow-md rounded-lg ">
            
             <form onSubmit={handleSubmit}>
            
                <h1 className="text-4xl text-center mb-5 font-bold">Login</h1>
                <div className="inputBox flex relative items-center my-3 h-12 w-full ">
                   <input className="bg-transparent w-full p-5 h-full text-xl rounded-3xl outline-none border-2 focus:border-red-400" type="email" placeholder="Email" required onChange={updateEmail} value={email}/>
                   <FaUser className="absolute right-5 top-1/2 -translate-y-2/4"/>
                </div>
                <div className="inputBox flex relative items-center my-3 h-12 w-full">
                   <input className="bg-transparent w-full p-5 h-full text-xl rounded-3xl outline-none border-2 focus:border-red-400" type="password" placeholder="Password" required onChange={updatePassword} value={password} />
                   <RiLockPasswordFill className="absolute right-5 top-1/2 -translate-y-2/4"/>
                </div>
                <div className="rememberForgot flex justify-between my-3">
                    <label><input className=" mr-1 accent-red-800"type="checkbox" name="" id="" />Remember Me</label>
                    <br/>
                    <Link to={"/forgotpassword"} href="#" className="hover:text-red-400 font-bold">Forgot Password?</Link>
                </div>
                <button className="w-full h-auto rounded-3xl font-bold hover:bg-red-600 bg-red-800 text-white p-2" >Login</button>
                <div className="register text-center mt-5 mb-10">
                    <p>Don't have an account? <Link to={"/SignUp"} href="#" className="hover:text-red-400 font-bold"> Register</Link> </p>
                </div>
         </form>

    </div>
    </div>
    </>
    
  )
}

export default LoginForm
