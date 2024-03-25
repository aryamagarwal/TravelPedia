import React, { useEffect } from 'react'
import slide2 from '../assets/Amber-fort-Jaipur.jpg'
const Card = (props) => {
   
    return (
        <div className="flex flex-col shadow-md rounded-md w-60 p-3 items-center m-9">
            <div className="image h-60" >
                <img className="w-80" src={props.details.img} alt="img" />
            </div>
            <div className="details flex flex-row gap-8 p-3">
                <div className="flex flex-col">
                    <div className="location">
                        {props.details.name}
                    </div>
                    <div className="amount">
                        `Rs. ${props.details.amount}`
                    </div>
                </div>
                <div className="days">
                    _N-_D
                </div>
            </div>
            <div className="link">
                <button className="text-center bg-red-600 text-white rounded-md p-2">Book Now</button>
            </div>
        </div>
    )
}

export default Card
