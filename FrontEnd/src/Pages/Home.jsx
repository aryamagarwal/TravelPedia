import React from 'react'
import SlideShow from '../components/SlideShow'
import logo from '../assets/logo.png'
import slides from '../assets/db/Slides'
import location1 from '../assets/Amber-fort-Jaipur.jpg'
import location2 from '../assets/logo.png'
import CardPallete from '../components/CardPallete'
import Block from '../components/block'
import UserReview from '../components/UserReview'
import { Link } from 'react-router-dom'
const Home = () => {
    const location=[
        {
           img: location1,
           name: "location 1",
           amount: "amount 1",
        },
        {
            img: location2,
            name: "location 2",
            amount: "amount 2",
        },
        {
            img: location1,
            name: "location 1",
            amount: "amount 1",
         },
         

    ];
  return (
    <div>
      <header className="flex">
        <SlideShow duration={7000} slides={slides}/>
      </header>
      <Block/>
      <div className="flex-row w-full ">
        <div className="flex justify-between p-10">
            <div className="font-medium text-4xl">
            What to Experience
            </div>
            <div>
            <Link to={"/experiences"}><button className="text-center hover:bg-red-800 bg-red-600 text-white rounded-3xl p-3 pl-5 pr-5">View All</button></Link>
            </div>
        </div>

     <CardPallete details={location}/>
     </div>
     <Block />
     <UserReview />
    </div>
  )
}

export default Home
