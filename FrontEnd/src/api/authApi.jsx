import axios from "axios";
import { config } from "../environment.jsx";
import { parseJwt } from "./util";

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

// -- Axios
// axios.defaults.headers.post["Content-Type"] =
//   "application/x-www-form-urlencoded";
// axios.defaults.headers.post["Access-Control-Allow-Origin"] =
//   "http://localhost:5173";
// axios.defaults.headers.post["Accept"] = "application/json";

const instance = axios.create({
  baseURL: config.url.API_BASE_URL,
  //   mode: "cors",
  //   headers: {},
});

instance.interceptors.request.use(
  function (config) {
    // If token is expired, redirect user to login
    if (config.headers.Authorization) {
      const token = config.headers.Authorization.split(" ")[1];
      const data = parseJwt(token);
      if (Date.now() > data.exp * 1000) {
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
