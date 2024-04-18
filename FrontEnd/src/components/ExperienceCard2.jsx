import React from 'react'
import { useNavigate } from 'react-router-dom'
const ExperienceCard2 = (props) => {
   const navigate = useNavigate()
    return (
        <div className="flex flex-col shadow-md hover:shadow-2xl h-auto  w-1/5 rounded-md p-3 items-center m-9">
            <div className=" h-2/3 overflow-hidden" >
                <img className="" src={props.details.imageUrl} alt="img" />
            </div>
            <div className="details h-1/3 flex flex-row gap-8 p-3">
                <div className="flex w-2/3 flex-col">
                    <div className="location font-bold">
                        {props.details.title}
                    </div>
                    <div className="amount text-2xl m-2 font-bold text-red-800">
                        Rs.{props.details.amount}
                    </div>
                </div>
                <div className=" w-1/3 days">
                    {props.details.days} days
                </div>
            </div>
            <div className="link">
                <button className="text-center hover:bg-red-800 bg-red-600 text-white rounded-md p-2" onClick={()=>{navigate(`../package/${props.details.title.split(' ').join('-')}`)}}>Book Now</button>
            </div>
        </div>
    )
}

export default ExperienceCard2
