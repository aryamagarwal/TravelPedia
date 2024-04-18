import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Home from "./Pages/Home";
import Explore from "./Pages/Explore";
import Experiences from "./Pages/Experiences";
import Events from "./Pages/Events";
import Blogs from "./Pages/Blogs";
import SignUpForm from "./components/SignUpForm.jsx";
import LoginForm from "./components/LoginFrom.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage.jsx";
import Account from "./components/Account.jsx";
import UserDashboard from "./Pages/UserDashboard.jsx";
import PrivateRoutes from "./components/PrivateRoutes.jsx";
import { MdAccountBalance } from "react-icons/md";
import Package from "./Pages/Package.jsx";
import Trips from "./Pages/Trips.jsx";
import AboutUs from "./Pages/AboutUs.jsx";
import ContactUs from "./Pages/ContactUs.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "Home",
        element: <Home />,
      },
      {
        path: "AboutUs",
        element: <AboutUs />
      },
      {
        path: "Experiences",
        element: <Experiences />,
      },
      {
        path: "ContactUs",
        element: <ContactUs />,
      },
      {
        path: "Blogs",
        element: <Blogs />,
      },
      {
        path: "LogIn",
        element: <LoginForm />,
      },
      {
        path: "SignUp",
        element: <SignUpForm />,
      },
      {
        path: "ForgotPassword",
        element: <ForgotPassword />,
      },
      {
        path: "Account/:id",
        element: <Account />,
      },

      {
        path: "user",
        element: <PrivateRoutes />,
        children: [
          {
            path: "Dashboard/:id",
            element: <UserDashboard />,
          },
        ],
      },
      {
        path: "Package/:id",
        element: <Package />,
      },
      {
        path: "trips",
        element: <Trips />,
      }
      
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
