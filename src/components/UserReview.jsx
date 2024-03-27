import React from 'react'
import ReviewCard from './ReviewCard'
import avatar from '../assets/avatar.jpg'
const details = [
    {
    img: avatar,
        name: "user1",
        review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et hic nihil cumque delectus nobis provident atque! Qui nesciunt odit sint in culpa nobis, id nam perferendis! Iure asperiores doloribus officia!"
    },
    {
        img: avatar,
            name: "user2",
            review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et hic nihil cumque delectus nobis provident atque! Qui nesciunt odit sint in culpa nobis, id nam perferendis! Iure asperiores doloribus officia!"
    },

]
const UserReview = () => {
  return (
    <div>
      <h1 className="text-5xl text-center font-bold translate-y-10">
        Customer Reviews
      </h1>
      <ReviewCard details={details} duration={3000}/>
    </div>
  )
}

export default UserReview
