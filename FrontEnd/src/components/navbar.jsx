import React from "react";
import logo from "../assets/logo.png";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { IsLoggedInContext } from "../App.jsx";
const Navbar = () => {
  const items = [
    "Home",
    "About Us",
    "Experiences",
    "Trips",
    "Blogs",
    "Contact Us",
  ];

  const { isLoggedIn, user } = React.useContext(IsLoggedInContext);
  const url = isLoggedIn
    ? `/user/dashboard/${user.firstname} ${user.lastname}`
    : "/LogIn";
  return (
    <div className="flex justify-between fixed top-0 z-10 w-full navBg items-center h-auto flex-row  pl-5 ">
      <div className="logo h-full ">
        <Link to={"/"}>
          <img className="h-full w-1/6" src={logo} alt="logo" />
        </Link>
      </div>
      <div className="logIn flex gap-3 h-full float-right border-solid border-b-4 items-center py-11 p-6 border-red-500">
      <ul className=" list-none flex gap-10 text-2xl mx-3 text-white">
        {items.map((item, i) => (
          <Link to={`/${item.split(" ").join("")}`} key={i}>
            <li key={i} className="hover:text-red-400 hover:font-medium p-2 rounded-md">
              {item}
            </li>
          </Link>
        ))}
      </ul>
      
        <Link to={url}>
          <CgProfile
            style={{
              height: "30px",
              width: "30px",
            }}
            className="text-white hover:text-red-800"
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
