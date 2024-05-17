import React from "react";
import { useState, useEffect, useContext } from "react";
import { MdEmail } from "react-icons/md";
import Block from "./block";
import { IsLoggedInContext } from "../App.jsx";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
// import userData from "../assets/db/user.js";
// import useFetch from "./useFetch.jsx";
import { authApi } from "../api/authApi.jsx";
import { handleResponseError, parseJwt } from "../api/util.jsx";
import { FaRegEye } from "react-icons/fa";

const ForgotPassword = () => {
  const [userNameOrEmail, setUserNameOrEmail] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn, setUser } = useContext(IsLoggedInContext);
  const [invalidCredMsg, setInvalidCredMsg] = useState("");

  const updateUserNameOrEmail = (e) => {
    setUserNameOrEmail(e.target.value);
  };
  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);

  const validate = async () => {
    if (!(userNameOrEmail && password)) {
      setIsError(true);
      return;
    }

    try {
      const response = await authApi.forgotPass(userNameOrEmail, password);

      console.log(response);
      const authResp = response.data;
      const accessToken = authResp.token;
      console.log(typeof accessToken);
      const data = parseJwt(accessToken);
      const isVerified = authResp.status;
      if (!isVerified) {
        console.log("Not a verified user!");
        navigate("/verifyAccount");
      } else {
        console.log("Logging in");
        authApi.saveToken(accessToken);
        // const authenticatedUser = { data, accessToken };

        let myName = await authApi.getMyName();
        let myId = await authApi.getMyId();
        myId = myId.data;
        console.log("myId", myId);
        myName = myName.data;
        console.log(myName);
        setUserNameOrEmail("");
        setPassword("");
        setIsError(false);
        setIsLoggedIn(true);
        setUser({
          id: myId,
          firstname: myName,
          lastname: "",
          userNameOrEmail: userNameOrEmail,
        });
        navigate(`/user/dashboard/${myName}`);
      }
    } catch (error) {
      handleResponseError(error);
      setIsError(true);
    }
  };

  //stop form reload on submit and redirect to user Pages
  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
  };

  return (
    <>
      {/* <Block></Block> */}

      <div className="flex justify-center p-32 mt-32 mb-64">
        <div className="backdrop-blur-sm w-96 p-7 box-content shadow-md rounded-lg ">
          <form onSubmit={handleSubmit}>
            <h1 className="text-3xl text-center mb-5 font-bold">
              Forgot Password
            </h1>
            <div className="inputBox flex relative items-center my-3 h-12 w-full ">
              <input
                className="bg-transparent w-full p-5 h-full text-xl rounded-3xl outline-none border-2 focus:border-red-400"
                type="email"
                placeholder="Email"
                onChange={updateUserNameOrEmail}
                required
              />
              <MdEmail className="absolute right-5 top-1/2 -translate-y-2/4" />
            </div>
            <div className="inputBox flex relative items-center my-3 h-12 w-full">
              <input
                className="bg-transparent w-full p-5 h-full text-xl rounded-3xl outline-none border-2 focus:border-red-400"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                onChange={updatePassword}
                value={password}
              />
              {/* <RiLockPasswordFill className="absolute right-5 top-1/2 -translate-y-2/4" /> */}
              <button onClick={() => setShowPassword((prev) => !prev)}>
                <FaRegEye className="absolute right-5 top-1/2 -translate-y-2/4" />
              </button>
            </div>
            <button className="w-full h-auto rounded-3xl font-bold hover:bg-red-600 bg-red-800 text-white p-2 my-3">
              Reset Password
            </button>
            <button
              className="w-full h-auto  font-bold  bg-white hover:bg-red-100 text-red-800 p-2 my-3"
              onClick={() => {
                history.back();
              }}
            >
              Back
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
