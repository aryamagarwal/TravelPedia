import React, { useEffect, useState } from 'react'
import avatar from '../assets/avatar.jpg'
import { IoIosArrowBack , IoIosArrowForward} from "react-icons/io";
const ReviewCard = (props) => {
    const [count , updateCount] = useState(0);
    console.log(props.details)
    const l=props.details.length;
    const next=()=>{
        const n=(count+1)%l;
        updateCount(n);
    }
    const back=()=>{
        const n=count!=0?count-1:l-1;
        updateCount(n);
    }
    useEffect(()=>
    {const timer=setInterval(
       next, props.duration);
       return ()=>{clearInterval(timer)}
    },[count]);
    return (
        <div className='text-center flex flex-row items-center justify-around p-32 bg-gradient-to-r from-red-700 via-red-500 to-pink-800 m-10' style={{
            clipPath: "   polygon(0 13%, 100% 28%, 85% 73%, 100% 85%, 0 80%, 15% 33%)"
        }}>
            <button onClick={back}><IoIosArrowBack className="hover:text-white relative left-0 text-5xl"/></button>
            
            <div className="flex flex-col shadow-md rounded-md w-60 bg-white p-3 h-auto items-center m-9">
                <div className=" h-40 w-full rounded-lg bg-red-400 items-center flex justify-center" >
                    <img className="w-20 h-20 rounded-full" src={avatar} alt="img" />
                </div>
                <div className="User font-bold  w-full">
                {props.details[count].username}
                </div>
            </div>
            <div className='bg-white w-1/2 rounded-lg p-10 '
            >
            {props.details[count].review}
           </div>
           <button onClick={next}><IoIosArrowForward className="hover:text-white relative right-0 text-5xl"/></button>
        </div>
    )
}

export default ReviewCard
