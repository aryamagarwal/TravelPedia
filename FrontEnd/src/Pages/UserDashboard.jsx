import React from "react";
import Block from "../components/block";
import avatar from "../assets/avatar.jpg";
import { useState, useEffect } from "react";
import useFetch from "../components/useFetch.jsx";
import { useParams } from "react-router-dom";
import { FaCity } from "react-icons/fa";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { IconBase } from "react-icons/lib";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { IsLoggedInContext } from "../App.jsx";
import { authApi } from "../api/authApi";
import dashbaordbg from "../assets/dashboardBg.png";
import bg from '../assets/bg.avif'
import CardPallete from "../components/CardPallete.jsx";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import LikedExperiences from "../components/LikedExperiences.jsx";
const UserDashboard = () => {
  const baseUrl = "http://13.60.74.234:8085/permit/"
  const { setIsLoggedIn, setUser, user } = useContext(IsLoggedInContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [experiences, setExperiences] = useState(null);
  const [isExperiencesLoading, setIsExperiencesLoading] = useState(true);
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, [])
  useEffect(() => {
    setIsExperiencesLoading(true);
    fetch(`${baseUrl}experiences/all`)
      .then(res => res.json())
      .then(data => {
        setExperiences(data);
        setIsExperiencesLoading(false);
      })
  }, [])
  const [likedExperiences, setLikedExperiences] = useState(null);
  const [isLikedExperienceLoading, setIsLikedExperienceLoading] = useState(true);
  useEffect(() => {
    setIsLikedExperienceLoading(true);
    fetch(`${baseUrl}likedExperiences/likedByUser/` + user.id)
      .then(res => res.json())
      .then(data => {
        setLikedExperiences(data.map((item) => item.experience));
        setIsLikedExperienceLoading(false);
      })
  }, [])


  const logout = (e) => {
    if (confirm("Do you want to logout?") === false) {
      return
    }
    authApi.logout();
    setIsLoggedIn(false);
    setUser([]);
    navigate(`/LogIn`);
    window.scrollTo(0, 0);
  };

  const account = (e) => {
    navigate(`/Account/${id}`);
    window.scrollTo(0,0);
  };


  return (
    <>
      <img src={bg}></img>
      <div className="flex flex-row gap-3 w-full ">
        <div data-aos="fade-right" className="flex flex-col m-4 mr-0 w-2/12 p-10 shadow-md rounded-xl shadow-gray-400">
          <div className="p-3 w-full hover:text-red-800">
              <button onClick={account}>Account</button>
            </div>
            <div className="p-3 w-full hover:text-red-800">
              <button onClick={logout}>LogOut</button>
            </div>
        </div>
        <div data-aos="fade-down" className="flex flex-col m-4 mx-0  w-8/12 min:w-6/12 p-10 shadow-md rounded-xl shadow-gray-400">
          <h1 className="text-3xl whitespace-nowrap font-bold ">Welcome! {id}</h1>
          <div className="flex-row my-10  h-auto w-full ">
            <div className=' rounded-2xl bg-white'>
              <div className="h-fit flex items-center justify-between w-full px-10 pt-1 ">
                <h1 className='text-black-800 text-3xl font-bold font-gideon'>Liked Experiences</h1>
              </div>
              <div className=''>
                {likedExperiences !== null ? <CardPallete loading={isLikedExperienceLoading} details={likedExperiences} className="likedCardPallete" /> : null}
              </div>
            </div>
          </div>
          <div className="flex-row my-10  h-auto w-full ">
            <div className=' rounded-2xl bg-white'>
              <div className="h-fit flex items-center justify-between w-full px-10 pt-1 ">
                <h1 className='text-black-800 text-3xl font-bold font-gideon'>More Experiences</h1>
                <div >
                  <Link to={"/experiences"}><button className="text-center hover:bg-red-800 bg-red-600 text-white rounded-3xl p-3 pl-5 pr-5">View All</button></Link>
                </div>
              </div>
              <div className=''>
                {experiences !== null ? <CardPallete loading={isExperiencesLoading} details={experiences} className="experiencesCardPallete" /> : null}
              </div>
            </div>
          </div>

        </div>
        <div data-aos="fade-left"className="flex flex-col m-4 ml-0 w-2/12 p-10 shadow-md rounded-xl shadow-gray-400">
          <div className="flex flex-col items-center justify-evenly">
            <img
              className="w-20 rounded-full"
              src={avatar}
              alt="img"
            />
            <h1 className="mt-3 text-lg whitespace-nowrap">{id}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
