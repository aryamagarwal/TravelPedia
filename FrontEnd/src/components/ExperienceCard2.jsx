import React from 'react'
import { useNavigate } from 'react-router-dom'
const ExperienceCard2 = (props) => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col shadow-md hover:shadow-2xl w-90 rounded-lg h-96 bg-white items-center m-9 pb-0"
        >
            <div className='p-5 h-5/6 items-center flex w-full flex-col'>
                <div className='h-96 w-full rounded-xl  overflow-hidden '>
                    <div className="h-96 w-full ">
                        <img className="cardImg" src={"http://localhost:8085/experiences/experienceImage/" + props.details.title} alt="img" />
                    </div>
                </div>
                <div className="details h-20 w-full flex flex-row justify-between gap-4 p-3">
                    <h1 className="location whitespace-nowrap">
                        {props.details.title}
                    </h1>
                    <h1 className='whitespace-nowrap'>{props.details.days} days</h1>
                </div>
                <div className='w-full h-1/6  rounded-xl text-center text-2xl font-bold text-black p-3' >
                    <h1> Rs. {props.details.amount}</h1>
                </div>

            </div>
            <button className="text-center hover:bg-red-600 mx-1 bg-red-800 text-white p-2 w-full" onClick={() => { navigate(`../package/${props.details.title.split(' ').join('-')}`) }}>Book Now</button>
        </div>
    )
}

export default ExperienceCard2
