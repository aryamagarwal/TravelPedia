import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
// import { Link } from "react-router-dom";
import { IsLoggedInContext } from "../App.jsx";
import { useNavigate } from "react-router-dom";
// import userData from "../assets/db/user.js";
import Block from "./block.jsx";
// import useFetch from "./useFetch.jsx";
import { authApi } from "../api/authApi.jsx";
import { handleResponseError, parseJwt } from "../api/util.jsx";
import { FaRegEye } from "react-icons/fa";
// import { useAuth } from "../context/AuthContext";

const VerifyForm = () => {
  // const Auth = useAuth();
  // const { otpSent } = useParams();
  // console.log("url: val=", otpSent, "type:", typeof otpSent);
  const [showPassword, setShowPassword] = useState("");
  const [userNameOrEmail, setUserNameOrEmail] = useState(null);
  const [otp, setOtp] = useState(null);
  const [toSend, setToSend] = useState(true);
  const { setIsLoggedIn, setUser } = useContext(IsLoggedInContext);
  const [otpErrMessage, setOtpErrMessage] = useState("");
  const [otpSendErrMessage, setOtpSendErrMessage] = useState("");
  const [otpSendSuccessMessage, setOtpSendSuccessMessage] = useState("");
  const [attempt, setAttempt] = useState(0);

  // Timer for ResendOtp
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);

  const updateUserNameOrEmail = (e) => {
    setUserNameOrEmail(e.target.value);
  };
  const updateOtp = (e) => {
    setOtp(e.target.value);
  };

  // Effect for setting OTP timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
          setToSend(true);
          // toSend = true;
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  // Sem
  const resendOTP = async (e) => {
    e.preventDefault();

    if (!userNameOrEmail) {
      setIsError(true);
      // Set Error Msg
      return;
    }

    try {
      const otpResponse = await authApi.requestOtp(userNameOrEmail);
      console.log(otpResponse);
      setAttempt(attempt + 1);
      const status = otpResponse.data.status;
      console.log(status);
      const msg = otpResponse.data.message;
      console.log(msg);
      setToSend(false);
      // toSend = false;
      if (!status) {
        // Otp could not be sent
        setOtpSendErrMessage(msg);
        setMinutes(0);
        seconds(59);
      } else {
        setMinutes(4);
        setSeconds(59);
        setOtpSendSuccessMessage("Otp Sent Successfully!");
      }
    } catch (error) {
      handleResponseError(error);
      setIsError(true);
    }
  };

  const validate = async () => {
    if (!(userNameOrEmail && otp)) {
      setIsError(true);
      return;
    }

    try {
      const response = await authApi.verifyUser(userNameOrEmail, otp);
      console.log(response);
      const authResp = response.data;
      const token = authResp.token;
      const accessToken = parseJwt(token);
      const status = authResp.status;
      const msg = authResp.message;
      console.log("Status:", status);
      console.log("Msg:", msg);
      if (!status) {
        setOtpErrMessage(msg);
        setMinutes(0);
        setSeconds(0);
      } else {
        console.log("Otp Verified!");
        console.log("Logging in");
        authApi.saveToken(token);
        // const authenticatedUser = { data, accessToken };
        const nameResp = await authApi.getMyName();
        const myName = nameResp.data;
        console.log("myName Response: ", myName);
        setUserNameOrEmail("");
        setOtp("");
        setToSend(false);
        let myId = await authApi.getMyId();
        myId = myId.data;
        console.log("myId", myId);
        // toSend = false;

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
        <div className="backdrop-blur-sm w-96 p-7 mb-auto box-content shadow-md rounded-lg ">
          <form onSubmit={handleSubmit}>
            <h1 className="text-4xl text-center mb-5 font-bold">
              Confirm Account
            </h1>
            <div className="inputBox flex relative items-center my-3 h-12 w-full ">
              <input
                className="bg-transparent w-full p-5 h-full text-xl rounded-3xl outline-none border-2 focus:border-red-400"
                type="text"
                placeholder="Username / Email"
                required
                onChange={updateUserNameOrEmail}
                pattern="([a-z][a-z0-9_]{3,23}[a-z0-9])|(([A-Za-z0-9_.]{5,64})([@])([a-z0-9\-.]{1,252})([.])([a-z]{2,3}))"
                title="Enter a valid username or email"
                // value={userNameOrEmail ? userNameOrEmail : ""}
              />
              <FaUser className="absolute right-5 top-1/2 -translate-y-2/4" />
            </div>

            <div className="inputBox flex relative items-center my-3 h-12 w-full">
              <input
                className="bg-transparent w-full p-5 h-full text-xl rounded-3xl outline-none border-2 focus:border-red-400"
                // type="password"
                type={showPassword ? "text" : "password"}
                placeholder="OTP"
                required
                onChange={updateOtp}
                // value={otp}
              />
              {/* <RiLockPasswordFill className="absolute right-5 top-1/2 -translate-y-2/4" /> */}
              <button onClick={() => setShowPassword((prev) => !prev)}>
                <FaRegEye className="absolute right-5 top-1/2 -translate-y-2/4" />
              </button>
            </div>
            <button
              disabled={!(userNameOrEmail && otp)}
              className="w-full h-auto rounded-3xl font-bold hover:bg-red-600 bg-red-800 text-white p-2"
            >
              Verify
            </button>
            {otpErrMessage && (
              <h5 className="text-red-800 bg-white ml-3 ">{otpErrMessage}</h5>
            )}
          </form>
          <br />
          <div className="countdown-text">
            {
              <button
                disabled={!toSend}
                className={
                  minutes > 0 || seconds > 0
                    ? "w-full h-auto rounded-3xl font-bold hover:bg-gray-600 bg-gray-800 text-white p-2"
                    : "w-full h-auto rounded-3xl font-bold hover:bg-green-600 bg-green-800 text-white p-2"
                }
                onClick={resendOTP}
              >
                {attempt == 0 ? `Send` : `Resend`} OTP
              </button>
            }
            <br />
            {otpSendSuccessMessage && (
              <h5 className="text-green-400 bg-white ml-3 ">
                {otpSendSuccessMessage}
              </h5>
            )}
            {attempt > 0 ? (
              minutes > 0 || seconds > 0 ? (
                <h5 className="text-green-400 bg-white ml-3">
                  Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </h5>
              ) : (
                <h5 className="text-red-800 bg-white ml-3">
                  Didn't recieve code?
                </h5>
              )
            ) : (
              ""
            )}
            <h5 className="text-red-800 bg-white ml-3">
              {attempt > 0 ? `Attempt: ${attempt}/5 remaining` : ""}
            </h5>
            {otpSendErrMessage && (
              <h5 className="text-red-800 bg-white ml-3 ">
                {otpSendErrMessage}
              </h5>
            )}

            <br />
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyForm;
