import React from 'react'
import { FaMoneyBill , FaRegArrowAltCircleRight } from "react-icons/fa";
import { LuCalendarClock } from "react-icons/lu";
import {useNavigate} from 'react-router-dom'
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
const ExperienceCard = (props) => {
    const navigate = useNavigate();
    console.log(props);
    return (
        
        <div className="flex flex-col w-full shadow-md rounded-md p-3 items-center m-9 bg-red-200">
            <div className="flex flex-row rounded-md w-full ">
            <div className="h-60 w-1/3 flex items-center" >
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
            <span >
           <button onClick={()=>{props.handleUpdateExperience(props.details)}}><FaRegEdit className='text-red-800 text-lg'/></button>
           <button onClick={()=>{props.handleDeleteExperience(props.details.experienceId)}}><MdDelete className='text-red-800 text-lg mx-5'/></button>
           </span>
        </div>
    )
}

export default ExperienceCard
