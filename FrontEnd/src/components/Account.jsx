import React from "react";
import Block from "../components/block";
import avatar from "../assets/avatar.jpg";
import { useState, useEffect } from "react";
import useFetch from "./useFetch.jsx";
import { useParams } from "react-router-dom";
import { FaCity } from "react-icons/fa";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { IconBase } from "react-icons/lib";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { IsLoggedInContext } from "../App.jsx";
import { authApi } from "../api/authApi";
import { handleResponseError } from "../api/util";

const Account = () => {
  const { setIsLoggedIn, setUser } = useContext(IsLoggedInContext);
  const getUserDetails = () => {
    let userDetails = {};
    try {
      const resp = authApi.getMyDetails();
      userDetails.userName = resp.data.userName;
      userDetails.email = resp.data.email;
      userDetails.firstName = resp.data.firstName;
      userDetails.lastName = resp.data.lastName;
    }
    catch (error) {
      handleResponseError(error);
      setIsError(true);
    }
    return userDetails;
  };
  const [needData, setNeedData] = useState(true);
  const [userDetails, setUserDetails] = useState(getUserDetails());
  const navigate = useNavigate();
  const { id } = useParams();

  // useEffect(()=>{
  //   getUserDetails();
  //   setNeedData(false);
  // })[needData==true];
  
  //   {users && users.map()}\
  const [id2, setId2] = useState();
  // const [email, setEmail] = useState(data.userDetails.email);
  // const [password, setPass] = useState();
  
  const [newPassword, setNewPass] = useState();
  // const [name, setName] = useState();
  const [firstname, setFirstName] = useState(data.userDetails.firstName);
  const [lastname, setLastName] = useState(data.userDetails.lastName);
  // const [username, setuserName] = useState(data.userDetails.userName);
  // const [review, setReview] = useState("");
  const [base, setBase] = useState(false);

  const [firstName, lastName] = id.split(" ");
  const usern = firstName.toLowerCase();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { username, firstname, lastname, email, password };
    fetch("http://localhost:8085/users/update/" + id2, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => {
      console.log("Changes made");
      setBase(true);
    });
    // navigate(`/user/dashboard/${id}`)
  };

  const logout = (e) => {
    if (confirm("The action will log you out!") === false) {
      return;
    }
    setIsLoggedIn(false);
    setUser([]);
    console.log("button pressed logout");
    navigate(`/LogIn`);
  };
  console.log(firstname);
  console.log(lastname);
  console.log(username);
  console.log(email);
  console.log(password);
  // console.log(review);

  return (
    <>
      <Block></Block>
      <div className="flex flex-row justify-between gap-6">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <img
              className="pt-12 ml-20 w-20 h-32 rounded-full"
              src={avatar}
              alt="img"
            />

            <div className="ml-12 mt-12 mr-8 w-52 h-80  bg-gray-50 shadow:sm rounded-3xl">
              <div className="flex flex-col justify-between">
                <div className="pl-8 mt-8 w-full hover:bg-red-800">
                  <button onClick={logout}>LogOut</button>
                </div>
                <div className="pl-8 mt-8 w-full hover:bg-red-800">
                  <button>Account</button>
                </div>
                <div className="pl-8 mt-8 w-full hover:bg-slate-100"></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-6xl pt-12 pl-32">Welcome Back! {id}</h1>
            <p className="pl-32 mr-32 text-lg">
              Welcome to your gateway to adventure and relaxation, where
              wanderlust meets convenience. Explore the world, one click at a
              time, and let us be your compass on the journey of a lifetime.
            </p>

            <div className="mt-12 bg-gray-50">
              <center>
                <div className="bg-red-800 text-white text-4xl w-80 rounded-lg  mt-8 ">
                  <center>Account Details</center>
                </div>
              </center>

              <div className="flex flex-row">
                <div className="ml-12 mt-16 w-2/5">
                  <form onSubmit={handleSubmit}>
                    <div className="inputBox flex relative items-center my-3 h-12 w-full">
                      <div className="pl-8 ">UserName:</div>

                      <input
                        className="bg-transparent w-full p-5 h-full text-xl ml-8  rounded-3xl outline-none border-2 focus:border-red-400"
                        type="text"
                        disabled
                        placeholder="Username"
                        required
                        value={userDetails.userName}
                        // onChange={(e) => setuserName(e.target.value)}
                      />
                      <FaUser className="absolute right-5 top-1/2 -translate-y-2/4" />
                    </div>

                    <div className="inputBox flex relative items-center my-3 h-12 w-full">
                      <div className="pl-8 ">FirstName:</div>

                      <input
                        className="bg-transparent w-full p-5 h-full text-xl ml-8  rounded-3xl outline-none border-2 focus:border-red-400"
                        type="text"
                        placeholder="FirstName"
                        required
                        value={userDetails.firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      <FaUser className="absolute right-5 top-1/2 -translate-y-2/4" />
                    </div>

                    <div className="inputBox flex relative items-center my-3 h-12 w-full">
                      <div className="pl-8 ">LastName:</div>

                      <input
                        className="bg-transparent w-full p-5 h-full text-xl ml-8  rounded-3xl outline-none border-2 focus:border-red-400"
                        type="text"
                        placeholder="LastName"
                        value={userDetails.lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                      <FaUser className="absolute right-5 top-1/2 -translate-y-2/4" />
                    </div>
                    <div className="inputBox flex relative items-center my-3 mt-12 h-12 w-full ">
                      <div className="pl-8">Email:</div>

                      <input
                        className="bg-transparent w-full p-5 h-full text-xl rounded-3xl ml-16 outline-none border-2 focus:border-red-400"
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        disabled
                        // onChange={(e) => setEmail(e.target.value)}
                      />
                      <FaUser className="absolute right-5 top-1/2 -translate-y-2/4" />
                    </div>
                    {/* <div className="inputBox flex relative items-center my-3 mt-12 h-80 w-full">
                      <div className="pl-8 h-80">Review:</div>

                      <textarea
                        className="resize-none leading-tight bg-transparent w-full h-full p-5 text-xl rounded-3xl ml-16 outline-none border-2 focus:border-red-400"
                        placeholder="Enter your message here..."
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                      ></textarea>
                    </div> */}
                    <center>
                      <div className="w-40 mt-4 mb-4">
                        <button
                          className="w-full h-auto rounded-3xl font-bold hover:bg-red-600 bg-red-800 text-white p-2"
                          onClick={handleSubmit}
                        >
                          UPDATE DETAILS
                        </button>
                      </div>
                      {base && (
                        <div className="text-lg w-80 mb-16 ">
                          Details Updated Succesfully
                        </div>
                      )}
                    </center>
                  </form>
                </div>
                <div className="h-80 w-80 ml-40 mr-40 mt-32 mb-40 flex flex-col">
                  <center>
                    {/* <div className="bg-red-800 text-white text-lg w-44 rounded-lg mt-8 mb-8">
                      Profile Picture
                    </div> */}
                    <div className="box-border border-4 h-80 w-80 ">
                      <img
                        className="pt-12 w-20 h-32 rounded-full"
                        src={avatar}
                        alt="img"
                      />
                    </div>
                    <div className="w-40">
                      <button
                        className="w-full h-auto mt-8 rounded-3xl font-bold hover:bg-red-600 bg-red-800 text-white p-2"
                        onClick={handleSubmit}
                      >
                        CHANGE PHOTO
                      </button>
                    </div>
                  </center>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
