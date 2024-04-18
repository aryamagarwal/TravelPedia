import React, { useState } from "react";
import { useContext } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Block from "./block";
import useFetch from "./useFetch.jsx";
import { useNavigate } from "react-router-dom";
import { IsLoggedInContext } from "../App.jsx";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useContext(IsLoggedInContext);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [message2, setMessage2] = useState("");
  const [message3, setMessage3] = useState("");
  const [message4, setMessage4] = useState("");
  const [message5, setMessage5] = useState("");
  const [message6, setMessage6] = useState("");
  const [cpass, setCpass] = useState("");
  const [username, setuserName] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");

  const {
    data: users,
    isPending,
    Error,
  } = useFetch("http://localhost:8085/users");

  const checkPass = (e) => {
    setPassword(e.target.value);
    const pr = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    setMessage(
      e.target.value.match(pr)
        ? ""
        : "Password should contain 7-15 characters with atleast 1 lowercase, 1 uppercase, one numeric digit and one special character.",
    );
  };
  const checkCpass = (e) => {
    setCpass(e.target.value);
    setMessage2(
      password == e.target.value
        ? ""
        : "Confirm Password doesn't match with password",
    );
  };

  const checkUsername = (e) => {
    console.log(e.target.value);
    setuserName(e.target.value);
    console.log("username", username);

    const existingUser = users.find((user) => user.username === e.target.value);
    if (existingUser) {
      setMessage6("");
      setMessage4("Username already taken");
      console.log("Username already taken");
    } else {
      setMessage4("");
      setMessage6("Username is available");
    }
  };

  const checkEmail = (e) => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    setEmail(e.target.value);
    setMessage3(emailRegex.test(e.target.value) ? "" : "Invalid email format");
    const existingUser = users.find((user) => user.email === e.target.value);
    if (existingUser) {
      setMessage3("Email already registered");
      console.log("email already registered");
    } else {
      setMessage3("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { username, firstname, lastname, email, password };
    if (
      password === cpass &&
      message3 === "" &&
      message4 === "" &&
      message2 == ""
    ) {
      fetch("http://localhost:8085/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then(() => {
        console.log("Added the new user");
      });
    } else {
      setMessage5("Enter correct details");
    }
    setIsLoggedIn(true);
    setUser(data);
    navigate(`/user/dashboard/${firstname} ${lastname}`);
  };

  return (
    <>
      <Block></Block>
      <div className="flex justify-center ">
        <div className="bg-transparent backdrop-blur-sm lg:w-96  p-12 sm:w-full m-12 box-content shadow-md rounded-lg">
          <form onSubmit={handleSubmit}>
            <h1 className="text-4xl text-center mb-5 font-bold">Sign Up</h1>

            <div className="inputBox flex relative items-center my-3 h-12 w-full ">
              <input
                className="bg-transparent w-full p-5 h-full text-xl  rounded-3xl outline-none border-2 focus:border-red-400"
                type="text"
                placeholder="Username"
                value={username}
                onChange={checkUsername}
                required
              />
              <FaUser className="absolute right-5 top-1/2 -translate-y-2/4" />
            </div>
            {message4 && (
              <h5 className="text-red-800 bg-white ml-3 ">{message4}</h5>
            )}
            {message6 && (
              <h5 className="text-green-400 bg-white ml-3 ">{message6}</h5>
            )}
            <div className="inputBox flex relative items-center my-3 h-12 w-full ">
              <input
                className="bg-transparent w-full p-5 h-full text-xl  rounded-3xl outline-none border-2 focus:border-red-400"
                type="text"
                placeholder="Firstname"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <FaUser className="absolute right-5 top-1/2 -translate-y-2/4" />
            </div>
            <div className="inputBox flex relative items-center my-3 h-12 w-full ">
              <input
                className="bg-transparent w-full p-5 h-full text-xl  rounded-3xl outline-none border-2 focus:border-red-400"
                type="text"
                placeholder="LastName"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <FaUser className="absolute right-5 top-1/2 -translate-y-2/4" />
            </div>
            <div className="inputBox flex relative items-center my-3 h-12 w-full ">
              <input
                className="bg-transparent w-full p-5 h-full text-xl  rounded-3xl outline-none border-2 focus:border-red-400"
                type="email"
                placeholder="Email"
                required
                onChange={checkEmail}
                value={email}
              />
              <MdEmail className="absolute right-5 top-1/2 -translate-y-2/4" />
            </div>
            <h5 className="text-red-800 ml-4 bg-white ">{message3}</h5>
            <div className="inputBox flex relative items-center my-3 h-12 w-full">
              <input
                className="bg-transparent w-full p-5 h-full text-xl  rounded-3xl outline-none border-2 focus:border-red-400"
                type="password"
                placeholder="Password"
                required
                onChange={checkPass}
                value={password}
              />
              <RiLockPasswordFill className="absolute right-5 top-1/2 -translate-y-2/4" />
            </div>
            <h5 className="text-red-800 bg-white ">{message}</h5>
            <div className="inputBox flex relative items-center my-3 h-12 w-full">
              <input
                className="bg-transparent w-full p-5 h-full text-xl rounded-3xl outline-none border-2 focus:border-red-400"
                type="password"
                placeholder="Confirm Password"
                required
                onChange={checkCpass}
                value={cpass}
              />
              <RiLockPasswordFill className="absolute right-5 top-1/2 -translate-y-2/4" />
            </div>
            <h5 className="text-red-800 bg-white ">{message2}</h5>
            <button className="w-full h-auto rounded-3xl font-bold hover:bg-red-600 bg-red-800 text-white p-2 my-3">
              Register
            </button>

            <center>
              <h5 className="text-red-800 bg-white ml-3 ">{message5}</h5>
            </center>

            <p className="text-center">
              By Clicking Register Button you agree to our Terms and Condition
              and Privacy Policy.
            </p>
          </form>
          <p className="mt-10 text-center">
            Already have an account?{" "}
            <Link
              to={"/Login/"}
              href="#"
              className="hover:text-red-400 font-bold "
            >
              Login
            </Link>{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
