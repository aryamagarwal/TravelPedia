import axios from "axios";
import { config } from "../environment.jsx";
import { parseJwt } from "./util";
// import { IsLoggedInContext } from "../App.jsx";
// import { useContext } from "react";
export const authApi = {
  signup,
  checkEmail,
  checkUserName,
  verifyUser,
  requestOtp,
  authenticate,
  getMyName,
  getMyDetails,
  saveToken,
  logout,
  forgotPass,
  getMyId,
  updateDetails,
  uploadPhoto,
};

function authenticate(userNameOrEmail, password) {
  const payload = {
    userNameOrEmail: userNameOrEmail,
    password: password,
  };
  return instance.post("/api/auth/login", payload, {
    headers: { "Content-type": "application/json" },
  });
}

function logout() {
  localStorage.removeItem("token");
}

function saveToken(token) {
  localStorage.setItem("token", token);
}

function signup(user) {
  return instance.post("/api/auth/signup", user, {
    headers: { "Content-type": "application/json" },
  });
}

function requestOtp(userNameOrEmail) {
  const url = "/api/auth/sendOTP";
  const payload = {
    userNameOrEmail: userNameOrEmail,
  };
  return instance.post(
    url,
    payload,
    // {
    // headers: { Authorization: bearerAuth() },}
  );
}

function checkPass(password) {
  const url = "/api/user/checkPass";
  const payload = {
    password: password,
  };
  return instance.post(
    url,
    payload,
    //   {
    //   headers: { "Content-type": "application/json" },
    // }
  );
}

function verifyUser(userNameOrEmail, otp) {
  const url = "/api/auth/verifyUser";
  const payload = {
    userNameOrEmail: userNameOrEmail,
    password: otp,
  };
  return instance.post(
    url,
    payload,
    // {
    // headers: { Authorization: bearerAuth() },}
  );
}

function checkUserName(u) {
  const url = "/api/user/checkUsername";
  const payload = {
    userName: u,
  };
  return instance.post(
    url,
    payload,
    //   {
    //   headers: { "Content-type": "application/json" },
    // }
  );
}

function getMyDetails() {
  const url = "/api/user/me";
  return instance.get(url, {
    headers: { Authorization: bearerAuth() },
  });
}

function getMyId() {
  const url = "/api/user/myId";
  return instance.get(url, {
    headers: { Authorization: bearerAuth() },
  });
}
function getMyName() {
  const url = "/api/user/myName";
  return instance.get(url, {
    headers: { Authorization: bearerAuth() },
  });
}

function checkEmail(em) {
  const url = "/api/user/checkEmail";
  const payload = {
    email: em,
  };
  return instance.post(url, payload, {
    headers: { "Content-type": "application/json" },
  });
}
function forgotPass(userNameOrEmail, password) {
  const payload = {
    userNameOrEmail: userNameOrEmail,
    password: password,
  };
  return instance.post("/api/auth/forgotPass", payload, {
    headers: { "Content-type": "application/json" },
  });
}

function updateDetails(
  username,
  firstName,
  lastname,
  email,
  opass,
  newPassword,
) {
  const payload = {
    username: username,
    firstname: firstName,
    lastname: lastname,
    email: email,
    oldPassword: opass,
    newPassword: newPassword,
  };
  return instance.post("/api/auth/updateDetails", payload, {
    headers: { "Content-type": "application/json" },
  });
}

async function uploadPhoto(formdata) {
  // const payload = {
  //   formdata: formdata,
  // };
  console.log("entered");
  // return instance.post("/api/auth/file-upload", formdata, {
  //   headers: { Authorization: bearerAuth() },
  // });
  const message = await fetch(
    `${config.url.API_BASE_URL}/api/auth/file-upload`,
    {
      method: "POST",
      headers: { Authorization: bearerAuth() },
      // headers: {
      //   "Content-Type" : "multipart/form-data"
      // },
      body: formdata,
    },
  );
  return message;
}

// -- Axios
// axios.defaults.headers.post["Content-Type"] =
//   "application/x-www-form-urlencoded";
// axios.defaults.headers.post["Access-Control-Allow-Origin"] =
//   "http://localhost:5173";
// axios.defaults.headers.post["Accept"] = "application/json";

const instance = axios.create({
  baseURL: config.url.API_BASE_URL,
});

instance.interceptors.request.use(
  function (config) {
    // const { setIsLoggedIn, setUser } = useContext(IsLoggedInContext);
    // If token is expired, redirect user to login
    if (config.headers.Authorization) {
      const token = config.headers.Authorization.split(" ")[1];
      const data = parseJwt(token);
      if (Date.now() > data.exp * 1000) {
        toast.error("Your session has expired!");
        // setIsLoggedIn(false);
        // setUser();
        window.location.href = "/LogIn";
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// -- Helper functions

function bearerAuth() {
  return `Bearer ${localStorage.getItem("token")}`;
}
