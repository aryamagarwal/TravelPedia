import React, { useEffect, useState } from 'react'
import SlideShow from '../components/SlideShow'
import logo from '../assets/logo.png'
import slides from '../assets/db/Slides'
import location1 from '../assets/Amber-fort-Jaipur.jpg'
import location2 from '../assets/logo.png'
import CardPallete from '../components/CardPallete'
import Block from '../components/block'
import UserReview from '../components/UserReview'
import { Link } from 'react-router-dom'
import bgImg from '../assets/ecbg.jpg'
const Home = () => {
  const [experiences , setExperiences] = useState(null);
  useEffect(()=>{
    fetch('http://localhost:8085/experiences/all')
    .then(res=>res.json())
    .then(data=>{setExperiences(data); console.log(data)})
  } , [])
  return (
    <div>
      <header className="flex">
        <SlideShow duration={7000} slides={slides}/>
      </header>
      <div className="flex-row h-auto w-full pt-0 p-20 "
      style={{
        background: `linear-gradient(rgba(225, 225, 225, 1 ) 40%, rgba(0, 0, 0, 0.6) 60% ), URL(${bgImg})`,
         backgroundSize: 'cover',
         backgroundRepeat: 'no-repeat',
         backgroundPosition: 'center',
    }}>
        <div className="p-10 ">
            <h1 className='text-center text-red-800 text-5xl font-bold font-gideon mt-32 m-0'>What to Experience</h1>
            <div >
            <Link to={"/experiences"}><button className="float-right  text-center hover:bg-red-800 bg-red-600 text-white rounded-3xl p-3 pl-5 pr-5">View All</button></Link>
            </div>
        </div>
        <div className='w-full px-32'>
        {experiences!==null ? <CardPallete details={experiences}/> : null }
        </div>
     </div>
     <UserReview />
    </div>
  )
}

export default Home
