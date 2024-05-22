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
import { useNavigate } from 'react-router-dom'
import GotYouCovered from '../components/GotYouCovered'
import AOS from 'aos'
import 'aos/dist/aos.css'
const Home = () => {
  const baseUrl = "http://13.60.74.234:8085/permit";
  const navigate = useNavigate();
  const [experiences, setExperiences] = useState(null);
  const[loading , setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    fetch(`${baseUrl}/experiences/all`)
      .then(res => res.json())
      .then(data => { setExperiences(data); console.log(data)
        setLoading(false)
       })
  }, [])
  useEffect(()=>{
    AOS.init({duration: 1000});
  } , [])
  return (
    <div className='bg-gray-200'>
      <header className="flex">
        <SlideShow duration={7000} slides={slides} />
      </header>
      <div  data-aos="fade-left" className=" flex-row my-10  h-auto w-full "
      // style={{
      //   background: `linear-gradient(rgba(225, 225, 225, 1 ) 40%, rgba(0, 0, 0, 0.6) 60% ), URL(${bgImg})`,
      //   backgroundSize: 'cover',
      //   backgroundRepeat: 'no-repeat',
      //   backgroundPosition: 'center',
      // }}
      >
        <div className='ml-10 rounded-2xl bg-white'>
          <div className="h-auto w-full px-10 pt-10">
            <h1 className='text-black-800 text-4xl font-bold font-gideon'>Explore the Unexplored</h1>
            <div >
              <Link to={"/experiences"}><button className="float-right  text-center hover:bg-red-800 bg-red-600 text-white rounded-3xl p-3 pl-5 pr-5">View All</button></Link>
            </div>
          </div>
          <div className='w-full'>
            <CardPallete details={experiences} loading={loading} className="experiencesHomeCardPallete"/>
          </div>
        </div>
      </div>
      <section data-aos="fade-right" className='w-full bg-transparent my-5 flex justify-center p-10'>
        <div className='w-full bg-white rounded-xl p-10 text-2xl'>
          <div>
            <h2 className='font-bold'>Sign in to save time</h2>
          </div>
          <p >
            Your Travelpedia account lets you book using your saved details
          </p>
          <div >
            <div >
              <a >
                <button onClick={()=>{
                  navigate('/login')
                }}className='p-1 border-red-800 border-solid border-2 rounded-3xl mt-2 hover:bg-red-800 hover:text-white'>Sign in</button>
              </a>
            </div>
          </div>
        </div>
      </section >
      <UserReview />
      <GotYouCovered data-aos="fade-right" />
    </div >
  )
}

export default Home
