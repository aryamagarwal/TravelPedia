import React from 'react'
import ReviewCard from './ReviewCard'

import { useEffect, useState } from 'react'
const UserReview = () => {
  const [reviews , setReviews] = useState(null);
  useEffect(()=>{
    console.log("enter");
    fetch('http://localhost:8085/reviews/all')
    .then(res=>res.json())
    .then(data=>{setReviews(data); console.log(data)})
  } , [])
  return (
    <div className='p-40 h-auto w-full'
    style={{
      background: `linear-gradient(rgba(225, 225, 225, 0.9 ) 20%, rgba(0, 0, 0, 0.8 ) 100%), URL(https://i.ibb.co/Sy8dRpZ/crbg.jpg)`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }}>
      <h1 className="text-5xl text-red-900 text-center font-bold m-24 font-gideon ">
        Our Customer Reviews
      </h1>
      {reviews!==null ? <ReviewCard details={reviews} duration={3000}/> : null}
    </div>
  )
}

export default UserReview
