import Navbar from "./components/navbar"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./components/footer"
import { Outlet } from "react-router-dom"
import React from "react";
//IsLoggedIn context Object
export const IsLoggedInContext = React.createContext(false);

function App() {
   //state variable to store the value of IsLoggedIn
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [user , setUser] = React.useState({});
   return (
    <>
      <IsLoggedInContext.Provider value={{isLoggedIn , setIsLoggedIn , user, setUser}}>
      <Navbar />
      <Outlet/>
      <Footer />
      </IsLoggedInContext.Provider>
      <ToastContainer />
      
    </>
  );

}
export default App;
