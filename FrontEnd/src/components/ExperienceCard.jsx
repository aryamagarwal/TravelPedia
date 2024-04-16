import React from 'react'
import { FaMoneyBill , FaRegArrowAltCircleRight } from "react-icons/fa";
import { LuCalendarClock } from "react-icons/lu";
import {useNavigate} from 'react-router-dom'

const ExperienceCard = (props) => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-row shadow-md rounded-md w-auto p-3 items-center m-9 bg-red-200">
            <div className="h-60 flex items-center" >
                <img className="w-full h-full" src={props.details.imageUrl} alt="img" />
            </div>
            <div className="details flex flex-row gap-8 p-3">
                <div className="flex flex-col border-r-2 border-white border-solid">
                    <div className="font-bold text-2xl mx-2 ">
                        {props.details.title}
                    </div>
                    <div >
                        {props.details.description}
                    </div>
                </div>
                <div className=' flex flex-col items-center w-1/2 p-0 gap-3 text-lg'>
                <div className=" w-full flex flex-row items-center gap-2 justify-between ">
                <FaMoneyBill className='text-red-800 text-2xl'/>
                    Rs. {props.details.amount}
                </div>
                <div className=" w-full flex flex-row items-center gap-2 justify-between ">
                <LuCalendarClock className='text-red-800 text-2xl'/>
                    {props.details.days} days
                </div>
                <div className=" w-full text-center ">
                <button className="text-center p-2" onClick={()=>{
                    const str=props.details.title.split(' ').join('-');
                    navigate(`/package/${str}`);

                }}><FaRegArrowAltCircleRight className=' hover:text-red-600 text-red-800 text-3xl'/></button>
            </div>
                </div>
            </div>
            
        </div>
    )
}

export default ExperienceCard
