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
    <div>
      <h1 className="text-5xl text-center font-bold translate-y-10">
        Customer Reviews
      </h1>
      {reviews!==null ? <ReviewCard details={reviews} duration={3000}/> : null}
    </div>
  )
}

export default UserReview
