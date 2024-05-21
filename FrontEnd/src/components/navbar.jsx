import React, { useEffect } from "react";
import logo from "../assets/logo.png";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { IsLoggedInContext } from "../App.jsx";
import { LuMenu } from "react-icons/lu";

const Navbar = () => {
  const items = [
    "Home",
    "About Us",
    "Experiences",
    "Blogs",
    "Contact Us",
  ];
  // const [dispLogo, setDispLogo] = React.useState(true);
  const [sideMenu, setSideMenu] = React.useState(false);
  const [scroll, setScroll] = React.useState(0);
  window.addEventListener("scroll", function () { // or window.addEventListener("scroll"....
    var st = window.scrollY; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    if (st === 0) {
      const navbar = document.querySelector(".navbar");
      navbar.style.background = "linear-gradient(to bottom , rgb(0, 0, 0), rgba(0, 0, 0, 0))";

    }
    else {
      const navbar = document.querySelector(".navbar");
      navbar.style.background = "rgba(0, 0, 0, 0.5)";

    }
    if (st > scroll) {
      const navbar = document.querySelector(".navbar");
      navbar.style.display = "none";
      setSideMenu(false);

    } else if (st < scroll) {
      const navbar = document.querySelector(".navbar");
      navbar.style.display = "flex";

    } // else was horizontal scroll
    setScroll(st <= 0 ? 0 : st); // For Mobile or negative scrolling

  }, false);

  const { isLoggedIn, user } = React.useContext(IsLoggedInContext);
  const url = isLoggedIn
    ? `/user/dashboard/${user.firstname} ${user.lastname}`
    : "/LogIn";
  return (
    <div className="navbar flex justify-between fixed top-0 z-20 w-full navBg items-center h-auto flex-row  pl-5 ">
      <div className="h-full ">
        <Link to={"/"}>
          {window.scrollY === 0 && <img className="logo h-full w-20 2xl:w-2/4" src={logo} alt="logo" />}
        </Link>
      </div>
      <div className="logIn hidden lg:flex gap-3 h-full float-right border-solid border-b-4 items-center py-11 p-6 border-red-500">
        <ul className=" list-none flex gap-10 text-xl whitespace-nowrap mx-3 text-white">
          {items.map((item, i) => (
            <Link to={`/${item.split(" ").join("")}`} key={i}>
              <li key={i} className="hover:text-red-800 p-2 rounded-md">
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
      <button onClick={() => { setSideMenu(true) }} className="hamburger block lg:hidden p-2 mr-8 rounded-xl hover:bg-red-600 h-auto w-auto">
        <LuMenu className="text-white text-3xl" />
      </button>
      <div className={`sideMenu fixed top-0 right-0 h-full w-1/2  text-white z-50 ${sideMenu ? "" : "hidden"}`}
        style={{
          background: "linear-gradient(to bottom , rgb(0, 0, 0), rgba(0, 0, 0, 0.5))",
        }}
      >
        <button onClick={() => { setSideMenu(false) }} className=" ml-8 p-2 text-3xl text-white hover:text-red-800">X</button>
        <ul className="flex flex-col items-center gap-4 text-2xl">
          {items.map((item, i) => (
            <Link to={`/${item.split(" ").join("")}`} key={i}>
              <li key={i} className="hover:text-red-800 p-2 rounded-md">
                {item}
              </li>
            </Link>
          ))}
          <Link to={url} >
              <li  className="hover:text-red-800 p-2 rounded-md">
                Login
              </li>
            </Link>
        </ul>
      </div>
    </div>

  );
};

export default Navbar;
