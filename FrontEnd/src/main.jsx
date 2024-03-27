import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Home from "./Pages/Home"
import Explore from "./Pages/Explore";
import Experiences from "./Pages/Experiences";
import Events from "./Pages/Events";
import Blogs from "./Pages/Blogs";
import Login from './Pages/login.jsx'
import SignUpForm from './components/SignUpForm.jsx'
import LoginForm from './components/LoginFrom.jsx'
import ForgotPassword from './components/ForgotPassword.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./components/ErrorPage.jsx";
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

        path: "Explore",
        element: < Explore />,
      },
      {
        path: "Experiences",
        element: < Experiences />,
      },
      {
        path: "Events",
        element: <Events />,
      },
      {
        path: "Blogs",
        element: <Blogs />,
      },
      {
        path: "LogIn",
        element: <Login />,
        children: [
          {
            path: "",
            element: <LoginForm />
          },
          {
            path: "SignUp",
            element: <SignUpForm />
          },
          {
            path: "ForgotPassword",
            element: <ForgotPassword />
          },
        ]
      }
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
