import React from 'react'
import { useNavigate } from 'react-router-dom'
const ExperienceCard2 = (props) => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col shadow-md hover:shadow-2xl w-1/4 rounded-lg h-96 bg-white items-center m-9"
            >
            <div className='p-5 h-5/6 items-center flex flex-col'>
                <div className='h-96 w-full rounded-xl  overflow-hidden '>
                    <div className="h-96 w-full ">
                        <img className="cardImg" src={"http://localhost:8085/experiences/experienceImage/"+props.details.title} alt="img" />
                    </div>
                </div>
                <div className="details h-20 w-full flex flex-row gap-8 p-3">
                    <h1 className="location font-bold ">
                            {props.details.title}
                        </h1>
                    
                    <h1 className='whitespace-nowrap'>{props.details.days} days</h1>
                </div>
                <div className="link">
                    <button className="text-center hover:bg-red-800 bg-red-600 text-white rounded-md p-2" onClick={() => { navigate(`../package/${props.details.title.split(' ').join('-')}`) }}>Book Now</button>
                </div>
            </div>
            <div className='w-full h-1/6 bg-yellow-300 rounded-xl text-center text-2xl font-bold text-red-700 p-3' >
                <h1> Rs. {props.details.amount}</h1>
            </div>

        </div>
    )
}

export default ExperienceCard2
