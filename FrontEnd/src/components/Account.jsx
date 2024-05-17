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
import { handleResponseError, parseJwt } from "../api/util";
import { FaRegEye } from "react-icons/fa";

const Account = () => {
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

    try {
      const formdata = new FormData();
      var file = new File([blob], userDetails.username, {
        type: blob.type,
        lastModified: Date.now(),
      });
      setAddImage(file);
      formdata.append("file", addImage);
      formdata.append("title", userDetails.username);
      const response = await authApi.uploadPhoto(formdata);
      // console.log(response);
      // const blob = await response.blob();
      if (response.ok) {
        toast.success("New experience added successfully");
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

  const logout = (e) => {
    if (confirm("The action will log you out!") === false) {
      // return;
    }
    setIsLoggedIn(false);
    setUser([]);
    console.log("button pressed logout");
    navigate(`/LogIn`);
  };

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
                  <form
                    onSubmit={() => {
                      e.preventDefault();
                    }}
                  >
                    <div className="inputBox flex relative items-center my-3 h-12 w-full">
                      <div className="pl-8 ">UserName:</div>

                      <input
                        className="bg-transparent w-full p-5 h-full text-xl ml-8  rounded-3xl outline-none border-2 focus:border-red-400"
                        type="text"
                        disabled
                        title="Username cannot be changed"
                        placeholder="Username"
                        // required
                        value={username}
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
                        value={firstname}
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
                        value={lastname}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                      <FaUser className="absolute right-5 top-1/2 -translate-y-2/4" />
                    </div>

                    <div className="inputBox flex relative items-center my-3 h-12 w-full">
                      <div className="pl-8 ">Old Password</div>
                      <input
                        className="bg-transparent w-full p-5 h-full text-xl ml-8  rounded-3xl outline-none border-2 focus:border-red-400"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        required
                        // onChange={checkPass}
                        // value={password}
                        onChange={checkopass2}
                      />

                      <FaRegEye
                        className="absolute right-5 top-1/2 -translate-y-2/4"
                        onMouseOver={() => {
                          // e.preventDefault();
                          setShowPassword((prev) => !prev);
                        }}
                      />
                    </div>
                    {/* <center>
                      <h5 className="text-red-800 bg-white ">
                        {opasswdErrMsg}
                      </h5>
                    </center> */}

                    <div className="inputBox flex relative items-center my-3 h-12 w-full">
                      <div className="pl-8 ">New Password</div>
                      <input
                        className="bg-transparent w-full p-5 h-full text-xl  rounded-3xl outline-none border-2 focus:border-red-400"
                        type={showPassword1 ? "text" : "password"}
                        placeholder="Password"
                        // required
                        onChange={checkPass}
                        value={newPassword}
                      />

                      <FaRegEye
                        className="absolute right-5 top-1/2 -translate-y-2/4"
                        onMouseOver={() => {
                          // e.preventDefault();
                          setShowPassword1((prev) => !prev);
                        }}
                      />
                    </div>
                    <h5 className="text-red-800 bg-white ">{message}</h5>

                    <div className="inputBox flex relative items-center my-3 h-12 w-full">
                      <div className="pl-8 ">Confirm new Password</div>
                      <input
                        className="bg-transparent w-full p-5 h-full text-xl rounded-3xl outline-none border-2 focus:border-red-400"
                        type="password"
                        placeholder="Confirm Password"
                        // required
                        onChange={checkCpass}
                        value={Cpass}
                      />
                      <RiLockPasswordFill className="absolute right-5 top-1/2 -translate-y-2/4" />
                    </div>
                    <center>
                      {" "}
                      <h5 className="text-red-800 bg-white ">{passwdErrMsg}</h5>
                    </center>

                    <div className="inputBox flex relative items-center my-3 mt-12 h-12 w-full ">
                      <div className="pl-8">Email:</div>

                      <input
                        pattern="([a-z][a-z0-9_]{3,23}[a-z0-9])|(([A-Za-z0-9_.]{5,64})([@])([a-z0-9\-.]{1,252})([.])([a-z]{2,3}))"
                        className="bg-transparent w-full p-5 h-full text-xl rounded-3xl ml-16 outline-none border-2 focus:border-red-400"
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        // disabled
                        // onChange={(e) => setEmail(e.target.value)}
                        onChange={handleOnChangeEmail}
                      />
                      <FaUser className="absolute right-5 top-1/2 -translate-y-2/4" />
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
                <div className="h-80 w-80 ml-40 mr-40 mt-32 mb-40 flex flex-col">
                  <center>
                    {/* <div className="bg-red-800 text-white text-lg w-44 rounded-lg mt-8 mb-8">
                      Profile Picture
                    </div> */}
                    <div className="box-border border-4 h-80 w-80 ">
                      {addImage && addImage !== "" && addImage.size > 0 && (
                        <img
                          src={URL.createObjectURL(addImage)}
                          alt="preview Image"
                        />
                      )}
                      {!addImage && addImage == "" && addImage.size <= 0 && (
                        <img
                          className="pt-12 w-20 h-32 rounded-full"
                          src={avatar}
                          alt="img"
                        />
                      )}
                    </div>
                    <div className="w-40">
                      <button onClick={handleImgSubmit2}>Upload photo</button>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          setAddImage(e.target.files[0]);
                        }}
                        className="border-solid border-red-800 border-2 p-3"
                      />
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
