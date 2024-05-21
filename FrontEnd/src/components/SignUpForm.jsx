import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Block from "./block";
// import useFetch from "./useFetch.jsx";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IsLoggedInContext } from "../App.jsx";
import { authApi } from "../api/authApi.jsx";
import { handleResponseError } from "../api/util.jsx";
import { FaRegEye } from "react-icons/fa";

const SignUpForm = () => {
  const [message, setMessage] = useState("");
  const [passwdErrMsg, setPasswdErrMsg] = useState("");
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [regErrMsg, setRegErrMsg] = useState("");
  const [usernameSuccessMsg, setUsernameSuccessMsg] = useState("");
  const [showPassword, setShowPassword] = useState("");

  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useContext(IsLoggedInContext);

  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState("");
  const [cpass, setCpass] = useState("");

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [isError, setIsError] = useState(false);

  // async function to check username availability
  const checkUsername = async (uname) => {
    console.log("to check username", uname);
    try {
      const resp = await authApi.checkUserName(uname);
      console.log(resp);
      const existingUser = resp.data;
      console.log("checkUsername " + existingUser);
      console.log("type of username " + typeof existingUser);
      if (existingUser) {
        setUsernameSuccessMsg("");
        setUsernameErr("Username already taken");
        console.log("Username already taken");
      } else setUsernameSuccessMsg("Username is available");
    } catch (error) {
      handleResponseError(error);
      setIsError(true);
    }
  };

  // async function to check email availability
  const checkEmail = async (eml) => {
    try {
      const resp = await authApi.checkEmail(eml);
      console.log(resp);
      const existingUser = resp.data;
      console.log("checkEmail " + existingUser);
      // users.find((user) => user.email === e.target.value);
      if (existingUser) {
        setEmailErrMsg("Email already registered");
        console.log("email already registered");
      } else {
        setEmailErrMsg("");
      }
    } catch (error) {
      handleResponseError(error);
      setIsError(true);
    }
  };

  // for debouncing Username check
  useEffect(() => {
    if (username === undefined) {
      // skip initial useEffect
      return;
    }
    const timeoutId = setTimeout(() => {
      if (username.length >= 5) checkUsername(username);
      // since setState hook is async,
      // calling inside useEffect avoids delayed keystroke issue due to re rendering
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [username]);

  // for debouncing email check
  useEffect(() => {
    if (email === undefined) {
      // skip initial useEffect
      return;
    }
    const timeoutId = setTimeout(() => {
      checkEmail(email);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [email]);

  // onChange handler for username input
  const handleOnChangeUsername = (e) => {
    e.persist();
    if (e.target.value.length >= 5) {
      setUsernameErr("");
      setUsername(e.target.value);
    } else if (e.target.value != null) {
      setUsernameSuccessMsg("");
      setUsernameErr("Username should be atleast 5 characters long");
    } else if (e.target.value == null) {
      setUsernameSuccessMsg("");
      setUsernameErr("Username should be atleast 5 characters long");
    }
  };

  // onChange handler for email input
  const handleOnChangeEmail = (e) => {
    e.persist();
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (emailRegex.test(e.target.value)) {
      setEmailErrMsg("");
      setEmail(e.target.value);
    } else {
      setEmailErrMsg("Invalid email format");
    }
  };

  // onChange handler for Password input
  const checkPass = (e) => {
    setPassword(e.target.value);
    const pr = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    setMessage(
      e.target.value.match(pr)
        ? ""
        : "Password should contain 7-15 characters with atleast 1 lowercase, 1 uppercase, one numeric digit and one special character.",
    );
  };
  // onChange handler for conform Password input
  const checkCpass = (e) => {
    setCpass(e.target.value);
    setPasswdErrMsg(
      password == e.target.value
        ? ""
        : "Confirm Password doesn't match with password",
    );
  };

  // Async function to submit the sign up form request
  const doSubmit = async (userData) => {
    try {
      const response = await authApi.signup(userData);
      console.log(response);
      const signupToken = response.data;
      if(signupToken){
        toast.success("Registeration Successful");
      }
      console.log(signupToken);
      // localStorage.setItem("signupToken", signupToken);
      setUser(userData);
      // navigate("/LogIn");
      navigate("/verifyAccount");
    } catch (e) {
      setIsError(e);
      setRegErrMsg("User cannot be registered.");
      handleLogError(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      userName: username,
      firstName: firstname,
      lastName: lastname,
      email: email,
      password: password,
    };
    // const data = { username, firstname, lastname, email, password };
    if (
      password === cpass &&
      emailErrMsg === "" &&
      usernameErr === "" &&
      passwdErrMsg == ""
    ) {
      doSubmit(userData);
      // fetch("http://localhost:8080/api/auth/signup", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // }).then(() => {
      //   console.log("Added the new user");
      //   setIsLoggedIn(false);
      //   // setUser(data);
      //   // TODO: add Email OTP
      navigate("/verifyAccount");
      // });
    } else {
      setRegErrMsg("Enter correct details");
    }
  };

  return (
    <>
      {/* <Block></Block> */}
      <div className="flex justify-center mt-20 ">
        <div className="bg-transparent backdrop-blur-sm lg:w-96  p-12 sm:w-full m-12 box-content shadow-md rounded-lg">
          <form onSubmit={handleSubmit}>
            <h1 className="text-4xl text-center mb-5 font-bold">Sign Up</h1>

            <div className="inputBox flex relative items-center my-3 h-12 w-full ">
              <input
                className="bg-transparent w-full p-5 h-full text-xl  rounded-3xl outline-none border-2 focus:border-red-400"
                type="text"
                placeholder="Username"
                pattern="[a-z][a-z0-9_]{3,23}[a-z0-9]"
                title="Enter a valid username : It should consist of (a-z,0-9 or _) and the first character should be lowercase latin letter(a-z)"
                onChange={handleOnChangeUsername}
                required
              />
              <FaUser className="absolute right-5 top-1/2 -translate-y-2/4" />
            </div>
            {usernameErr && (
              <h5 className="text-red-800 bg-white ml-3 ">{usernameErr}</h5>
            )}
            {usernameSuccessMsg && (
              <h5 className="text-green-400 bg-white ml-3 ">
                {usernameSuccessMsg}
              </h5>
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
                placeholder="email"
                required
                onChange={handleOnChangeEmail}
              />
              <MdEmail className="absolute right-5 top-1/2 -translate-y-2/4" />
            </div>
            {/* <h5 className="text-red-800 bg-white ">{emailErrMsg}</h5> */}
            <h5 className="text-red-800 ml-4 bg-white ">{emailErrMsg}</h5>
            <div className="inputBox flex relative items-center my-3 h-12 w-full">
              <input
                className="bg-transparent w-full p-5 h-full text-xl  rounded-3xl outline-none border-2 focus:border-red-400"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                onChange={checkPass}
                value={password}
              />

                    <FaRegEye
                      className="absolute right-5 top-1/2 -translate-y-2/4"
                      onMouseOver={() => {
                        // e.preventDefault();
                        setShowPassword((prev) => !prev);
                      }}
                    />
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
            <h5 className="text-red-800 bg-white ">{passwdErrMsg}</h5>
            <button className="w-full h-auto rounded-3xl font-bold hover:bg-red-600 bg-red-800 text-white p-2 my-3">
              Register
            </button>

            <center>
              <h5 className="text-red-800 bg-white ml-3 ">{regErrMsg}</h5>
            </center>

            <p className="text-center">
              {/* By Clicking Register Button you agree to our Terms and Condition
              and Privacy Policy. */}
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
