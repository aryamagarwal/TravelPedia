import React from "react";
import Block from "../components/block";
import avatar from "../assets/avatar.jpg";
import { useState, useEffect } from "react";
import useFetch from "../components/useFetch";
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

const Account = () => {
  const { setIsLoggedIn, setUser } = useContext(IsLoggedInContext);
  const navigate = useNavigate();
  const { id } = useParams();
  // console.log(id);
  console.log();

  const {
    data: users,
    isPending,
    Error,
  } = useFetch("http://localhost:8000/userData");

  //   {users && users.map()}\

  const [email, setEmail] = useState();
  const [password, setPass] = useState();
  const [name, setName] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [userName, setuserName] = useState();
  const [review, setReview] = useState("");
  const [base, setBase] = useState(false);

  const [firstname, lastname] = id.split(" ");
  const usern = firstname.toLowerCase();

  useEffect(() => {
    if (users) {
      const user = users.find((user_db) => user_db.id === id);
      if (user) {
        setEmail(user.email);
        setPass(user.password);
        setName(user.id);
        setFirstName(firstname);
        setLastName(lastname);
        setuserName(usern);
        setReview(user.review);
      }
    }
  }, [users, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { userName, firstName, lastName, email, password, review };
    fetch("http://localhost:8000/userData/" + id, {
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
    setIsLoggedIn(false);
    setUser([]);
    console.log("button pressed logout");
    navigate(`/LogIn`);
  };
  console.log(name);
  console.log(email);
  console.log(password);
  console.log(review);

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
                        placeholder="Username"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <FaUser className="absolute right-5 top-1/2 -translate-y-2/4" />
                    </div>
                    <div className="inputBox flex relative items-center my-3 mt-12 h-12 w-full">
                      <div className="pl-8">Password:</div>

                      <input
                        className="bg-transparent w-full p-5 h-full ml-8 text-xl rounded-3xl outline-none border-2 focus:border-red-400"
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPass(e.target.value)}
                      />
                      <RiLockPasswordFill className="absolute right-5 top-1/2 -translate-y-2/4" />
                    </div>
                    <div className="inputBox flex relative items-center my-3 mt-12 h-12 w-full ">
                      <div className="pl-8">Email:</div>

                      <input
                        className="bg-transparent w-full p-5 h-full text-xl rounded-3xl ml-16 outline-none border-2 focus:border-red-400"
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <FaUser className="absolute right-5 top-1/2 -translate-y-2/4" />
                    </div>
                    <div className="inputBox flex relative items-center my-3 mt-12 h-80 w-full">
                      <div className="pl-8 h-80">Review:</div>

                      <textarea
                        className="resize-none leading-tight bg-transparent w-full h-full p-5 text-xl rounded-3xl ml-16 outline-none border-2 focus:border-red-400"
                        placeholder="Enter your message here..."
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                      ></textarea>
                    </div>
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
                <div className="h-80 w-80 ml-40 mr-40 mt-40 flex flex-col">
                  <center>
                    {/* <div className="bg-red-800 text-white text-lg w-44 rounded-lg mt-8 mb-8">
                      Profile Picture
                    </div> */}
                    <div className="box-border border-4 h-80 w-80 ">
                      <img
                        className="h-60 w-60   pt-12 w-20 h-32 rounded-full"
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
