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
import bg from '../assets/bg.avif'
import { useContext } from "react";
import { IsLoggedInContext } from "../App.jsx";
import { authApi } from "../api/authApi";
import { handleResponseError, parseJwt } from "../api/util";
import { FaRegEye } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import {toast} from 'react-toastify'
const Account = (props) => {
  const [message, setMessage] = useState("");
  const [addImage, setAddImage] = useState("");

  const [passwdErrMsg, setPasswdErrMsg] = useState("");
  const [opasswdErrMsg, setoPasswdErrMsg] = useState("");
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [regErrMsg, setRegErrMsg] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const [showPassword1, setShowPassword1] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [firstname, setFirstName] = useState(userDetails.firstName);
  const [lastname, setLastName] = useState(userDetails.lastName);
  const [email, setEmail] = useState(userDetails.email);
  const [oldpassword, setoldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [Cpass, setCpass] = useState("");
  const [username, setuserName] = useState(userDetails.userName);
  // const [review, setReview] = useState("");
  const [base, setBase] = useState(false);
  const [opass, setopass] = useState("");
  const [npass, setnpass] = useState("");
  const [message2, setMessage2] = useState("");

  // useEffect(() => {
  //   console.log(userDetails.firstName);
  //   console.log(lastname);
  //   console.log(email);
  //   console.log(username);
  // }, [userDetails]);
  const { setIsLoggedIn, setUser } = useContext(IsLoggedInContext);
  const [iserror, setIsError] = useState(false);

  const [needData, setNeedData] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const resp = await authApi.getMyDetails();
        const data = resp.data;
        console.log(data);
        if (data) {
          setUserDetails({
            // password: data.password,
            userName: data.userName,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
          });
        }
      } catch (error) {
        handleResponseError(error);
        setIsError(true);
      }
    };

    if (needData) {
      getUserDetails();
      setNeedData(false);
    }
  }, [needData]);

  useEffect(() => {
    console.log(userDetails.firstName);
    console.log(userDetails.lastName);
    console.log(userDetails.email);
    console.log(userDetails.userName);
    console.log(userDetails.password);
    setFirstName(userDetails.firstName);
    setLastName(userDetails.lastName);
    setEmail(userDetails.email);
    setuserName(userDetails.userName);
    setoldPassword(userDetails.password);
    setNewPassword("");
  }, [userDetails]);
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

  const checkopass2 = (e) => {
    setopass(e.target.value);
    setoPasswdErrMsg(oldpassword == e.target.value ? "" : "Wrong Password");
  };

  // onChange handler for Password input
  const checkPass = (e) => {
    setNewPassword(e.target.value);
    const pr = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    setMessage(
      e.target.value.match(pr)
        ? ""
        : "Password should contain 7-15 characters with atleast 1 lowercase, 1 uppercase, one numeric digit and one special character."
    );
  };
  // onChange handler for conform Password input
  const checkCpass = (e) => {
    setCpass(e.target.value);
    setPasswdErrMsg(
      newPassword == e.target.value
        ? ""
        : "Confirm Password doesn't match with password"
    );
  };
  // const handleImgSubmit2 = async (e) => {
  //   const response = await authApi.uploadPhoto
  //     .then((response) => response.blob())
  //     .then((blob) => {
  //       // console.log(blob);
  //       var file = new File([blob], details.title, {
  //         type: "image/*",
  //         lastModified: Date.now(),
  //       });
  //       // console.log(file);
  //       setAddImage(file);
  //     });
  // };

  const handleImgSubmit2 = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    document.getElementById('accountPageFileUpload').click()
    try {
      const formdata = new FormData();
      formdata.append("file", addImage);
      formdata.append("title", userDetails.userName);
      const response = await authApi.uploadPhoto(formdata);
      // console.log(response);
      // const blob = await response.blob();
      if (response.ok) {
        toast.success("New photo uploaded successfully");
      }
      else
      {
        toast.error("error uploading file!");
        
      }
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

  // const [firstName, lastName] = id.split(" ");
  // const usern = firstName.toLowerCase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("in handle submit");
    try {
      console.log(username, firstname, email, opass, newPassword);
      const response = await authApi.updateDetails(
        username,
        firstname,
        lastname,
        email,
        opass,
        newPassword
      );

      console.log(response);

      const authResp = response.data;
      const accessToken = authResp.token;
      if (accessToken) {
        setBase(true);
        setMessage2("");
      } else {
        setMessage2("Enter correct Details");
      }
      navigate("/verifyAccount");

      console.log(typeof accessToken);
      const data = parseJwt(accessToken);
      const isVerified = authResp.status;
      console.log(isVerified);
      if (!isVerified) {
        console.log("Not a verified user!");
      } else {
        console.log("Logging in");
        authApi.saveToken(accessToken);
        // const authenticatedUser = { data, accessToken };
        let myName = await authApi.getMyName();
        myName = myName.data;
        console.log(myName);
        setUserNameOrEmail("");
        setPassword("");
        let myId = await authApi.getMyId();
        myId = myId.data;
        console.log("myId", myId);
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
      console.log();
      handleResponseError(error);
      setIsError(true);
      // setMessage2("Enter correct Details");
    }
  };
  // if (base == true) {
  //   setMessage2("");
  // }


  return (
    <div className="w-full flex relative flex-col justify-center items-center">
      <div className=" w-full bg-white">
        <center className="relative">
          <button className=" absolute -top-1/2 left-0 w-fit rounded-full p-3 border-solid border-red-800 border-2 hover:text-white hover:bg-red-800" onClick={() => {
            props.setShowAccount(false);
            window.scroll(0, 0)
          }}>
            <IoMdArrowRoundBack />
          </button>
          <div className="border-b-8 w-fit flex relative border-red-800 border-solid text-black text-4xl   mt-8 ">

            <center>Account Details</center>
          </div>
        </center>

        <div className="flex flex-row justify-between w-full">
          <div className="mt-5 w-3/5">
            <form className="w-full"
              onSubmit={() => {
                e.preventDefault();
              }}
            >
              <div className="inputBox flex flex-col relative justify-center my-3 h-12 w-full">
                <h1 className="pl-8  m-1 text-xl">Username</h1>
                <div className="w-full flex items-center justify-center">
                  <input
                    className="bg-transparent w-full p-5 h-full text-xl ml-8  outline-none border-2 focus:border-black"
                    type="text"
                    disabled
                    title="Username cannot be changed"
                    placeholder="Username"
                    // required
                    value={username}
                  // onChange={(e) => setuserName(e.target.value)}
                  />
                  <FaUser className="absolute right-5" />
                </div>
              </div>

              <div className="inputBox flex flex-col relative justify-center  my-3 h-12 w-full">
                <div className="pl-8  m-1 text-xl">First Name</div>
                <div className="w-full flex items-center justify-center">
                  <input
                    className="bg-transparent w-full p-5 h-full text-xl ml-8  outline-none border-2 focus:border-black"
                    type="text"
                    placeholder="First Name"
                    required
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <FaUser className="absolute right-5" />
                </div>
              </div>

              <div className="inputBox  flex flex-col relative justify-center my-3 h-12 w-full">
                <div className="pl-8  m-1 text-xl ">Last Name</div>
                <div className="w-full flex items-center justify-center">
                  <input
                    className="bg-transparent w-full p-5 h-full text-xl ml-8 outline-none border-2 focus:border-black"
                    type="text"
                    placeholder="LastName"
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <FaUser className="absolute right-5" />
                </div>
              </div>

              <div className="inputBox relative flex flex-col  justify-center my-3 h-12 w-full">
                <div className="pl-8  m-1 text-xl ">Old Password</div>
                <div className="w-full flex items-center justify-center">
                  <input
                    className={`bg-transparent w-full p-2 h-full text-xl ml-8 outline-none border-2 focus:border-black`}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                    onChange={checkopass2}
                  />
                  <FaRegEye
                    className="absolute right-5 "
                    onMouseOver={() => {
                      setShowPassword((prev) => !prev);
                    }}
                  />
                </div>
              </div>

              <div className="inputBox  flex flex-col relative justify-center my-3 h-12 w-full">
                <div className="pl-8  m-1 text-xl ">New Password</div>
                <div className="w-full flex items-center justify-center">
                  <input
                    className="bg-transparent w-full p-2 h-full text-xl ml-8 outline-none border-2 focus:border-black"
                    type={showPassword1 ? "text" : "password"}
                    placeholder="Password"
                    // required
                    onChange={checkPass}
                    value={newPassword}
                  />

                  <FaRegEye
                    className="absolute right-5 "
                    onMouseOver={() => {
                      // e.preventDefault();
                      setShowPassword1((prev) => !prev);
                    }}
                  />
                </div>
              </div>

              <h5 className="text-red-800 bg-white ">{message}</h5>

              <div className="inputBox  flex flex-col relative justify-center my-3 h-12 w-full">
                <div className="pl-8  m-1 text-xl">Confirm new Password</div>
                <div className="w-full flex items-center justify-center">
                  <input
                    className="bg-transparent w-full p-2 h-full text-xl ml-8  outline-none border-2 focus:border-black"
                    type="password"
                    placeholder="Confirm Password"
                    // required
                    onChange={checkCpass}
                    value={Cpass}
                  />
                  <RiLockPasswordFill className="absolute right-5 " />
                </div>
              </div>
              <center>
                {" "}
                <h5 className="text-red-800 bg-white ">{passwdErrMsg}</h5>
              </center>

              <div className="inputBox  flex flex-col relative justify-center my-3  h-12 w-full ">
                <div className="pl-8  m-1 text-xl">Email:</div>
                <div className="w-full flex items-center justify-center">
                  <input
                    pattern="([a-z][a-z0-9_]{3,23}[a-z0-9])|(([A-Za-z0-9_.]{5,64})([@])([a-z0-9\-.]{1,252})([.])([a-z]{2,3}))"
                    className="bg-transparent w-full p-5 h-full text-xl  ml-8 outline-none border-2 focus:border-black"
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    // disabled
                    // onChange={(e) => setEmail(e.target.value)}
                    onChange={handleOnChangeEmail}
                  />
                  <FaUser className="absolute right-5" />
                </div>
              </div>
              <h5 className="text-red-800 ml-4 bg-white ">
                {emailErrMsg}
              </h5>

              <center>
                <div className="w-40 mt-4 mb-4">
                  <button
                    // disabled={!password.length >= 1}
                    className="w-full h-auto rounded-3xl font-bold hover:bg-red-600 bg-red-800 text-white p-2"
                    onClick={handleSubmit}
                  >
                    Update
                  </button>
                </div>
                {base && (
                  <div className="text-lg w-80 mb-16 ">
                    Details Updated Succesfully
                  </div>
                )}
              </center>
              <center>
                <h5 className="text-red-800 bg-white ">{message2}</h5>
              </center>
            </form>
          </div>
          <div className="w-2/5 p-5 items-center flex flex-col">
            <center>
              <div className="rounded-full overflow-hidden flex items-center justify-center bg-white max-h-28 max-w-28 ">
                {addImage && addImage !== "" && addImage.size > 0 && (
                  <img
                    className="rounded-full"
                    src={URL.createObjectURL(addImage)}
                    alt="preview Image"
                  />
                )}
                {!addImage  && (
                  <img
                    className="rounded-full"
                    src={avatar}
                    alt="img"
                  />
                )}
              </div>
              <div className="w-full  flex flex-col">
              <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setAddImage(e.target.files[0]);
                  }}
                  id="accountPageFileUpload"
                  className=" hidden "
                />
                <button className="text-red-800 mt-5"onClick={handleImgSubmit2}>Change picture</button>
              </div>
            </center>
          </div>
        </div >
      </div >

    </div>

  );
};

export default Account;
