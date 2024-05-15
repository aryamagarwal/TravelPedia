import React, { useContext } from "react";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { IsLoggedInContext } from "../App.jsx";
import { useNavigate } from "react-router-dom";
// import userData from "../assets/db/user.js";
import Block from "./block";
// import useFetch from "./useFetch.jsx";
import { authApi } from "../api/authApi.jsx";
import { handleResponseError, parseJwt } from "../api/util.jsx";

const LoginForm = () => {
  const [userNameOrEmail, setUserNameOrEmail] = useState("");
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
      const response = await authApi.authenticate(userNameOrEmail, password);
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
        myName = myName.data;
        console.log(myName);
        setUserNameOrEmail("");
        setPassword("");
        setIsError(false);
        setIsLoggedIn(true);
        setUser({
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
      <div className="flex justify-center p-32  mt-24 mb-80">
        <div className="backdrop-blur-sm w-96 p-7 mb-auto box-content shadow-md rounded-lg ">
          <form onSubmit={handleSubmit}>
            <h1 className="text-4xl text-center mb-5 font-bold">Login</h1>
            <div className="inputBox flex relative items-center my-3 h-12 w-full ">
              <input
                className="bg-transparent w-full p-5 h-full text-xl rounded-3xl outline-none border-2 focus:border-red-400"
                type="text"
                placeholder="Username/Email"
                required
                pattern="([a-z][a-z0-9_]{3,23}[a-z0-9])|(([A-Za-z0-9_.]{5,64})([@])([a-z0-9\-.]{1,252})([.])([a-z]{2,3}))"
                title="Enter a valid username or email"
                onChange={updateUserNameOrEmail}
                value={userNameOrEmail}
              />
              <FaUser className="absolute right-5 top-1/2 -translate-y-2/4" />
            </div>
            <div className="inputBox flex relative items-center my-3 h-12 w-full">
              <input
                className="bg-transparent w-full p-5 h-full text-xl rounded-3xl outline-none border-2 focus:border-red-400"
                type="password"
                placeholder="Password"
                required
                onChange={updatePassword}
                value={password}
              />
              <RiLockPasswordFill className="absolute right-5 top-1/2 -translate-y-2/4" />
            </div>
            <div className="rememberForgot flex justify-between my-3">
              <label>
                <input
                  className=" mr-1 accent-red-800"
                  type="checkbox"
                  name=""
                  id=""
                />
                Remember Me
              </label>
              <br />
              <Link
                to={"/forgotpassword"}
                href="#"
                className="hover:text-red-400 font-bold"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              disabled={!(userNameOrEmail && password)}
              className="w-full h-auto rounded-3xl font-bold hover:bg-red-600 bg-red-800 text-white p-2"
            >
              Login
            </button>
            <div className="register text-center mt-5 mb-10">
              <p>
                Don't have an account?{" "}
                <Link
                  to={"/SignUp"}
                  href="#"
                  className="hover:text-red-400 font-bold"
                >
                  {" "}
                  Register
                </Link>{" "}
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
