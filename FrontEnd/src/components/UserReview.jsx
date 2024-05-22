import React from 'react'
import ReviewCard from './ReviewCard'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect, useState } from 'react'
const UserReview = () => {
  const baseUrl = "http://13.60.74.234:8085/permit"
  const [reviews , setReviews] = useState(null);
  useEffect(()=>{
    console.log("enter");
    fetch(`${baseUrl}/reviews/all`)
    .then(res=>res.json())
    .then(data=>{setReviews(data); console.log(data)})
    .catch(error => toast.error("Error fetching reviews"))
  } , [])

  useEffect(()=>{
    AOS.init({duration: 1000});
  } , [])
  return (
    // <div className='p-40 h-auto w-full'
    // // style={{
    // //   background: `linear-gradient(rgba(225, 225, 225, 0.9 ) 20%, rgba(0, 0, 0, 0.8 ) 100%), URL(https://i.ibb.co/Sy8dRpZ/crbg.jpg)`,
    // //   backgroundSize: 'cover',
    // //   backgroundRepeat: 'no-repeat',
    // // }}
    // >
    //   <h1 className="text-5xl text-red-900 text-center font-bold m-24 font-gideon ">
    //     Our Customer Reviews
    //   </h1>
    //   {reviews!==null ? <ReviewCard details={reviews} duration={3000}/> : null}
    // </div>
    <div data-aos="fade-left" className="flex-row my-10  h-auto w-full "
      // style={{
      //   background: `linear-gradient(rgba(225, 225, 225, 1 ) 40%, rgba(0, 0, 0, 0.6) 60% ), URL(${bgImg})`,
      //   backgroundSize: 'cover',
      //   backgroundRepeat: 'no-repeat',
      //   backgroundPosition: 'center',
      // }}
      >
        <div className='ml-10 rounded-2xl bg-white'>
          <div className="h-auto w-full px-10 pt-10">
            <h1 data-aos="zoom-in"className='text-black-800 text-4xl font-bold font-gideon'>What Our Customers Say</h1>
          </div>
          <div className='w-full'>
          {reviews!==null ? <ReviewCard details={reviews} duration={3000}/> : null}
          </div>
        </div>
      </div>
  )
}

export default UserReview
