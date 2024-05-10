import React, { useEffect, useState } from 'react'
import avatar from '../assets/avatar.jpg'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
const ReviewCard = (props) => {
    const [count, updateCount] = useState(0);
    console.log(props.details)
    const l = props.details.length;
    const next = () => {
        const n = (count + 1) % l;
        updateCount(n);
    }
    const back = () => {
        const n = count != 0 ? count - 1 : l - 1;
        updateCount(n);
    }
    useEffect(() => {
        const timer = setInterval(
            next, props.duration);
        return () => { clearInterval(timer) }
    }, [count]);
    return (
        <div className='text-center flex flex-col gap-0 items-center justify-around shadow-md shadow-white' style={{

        }}>
            <div className=" h-40 w-full rounded-lg m-0 items-center flex justify-center translate-y-1/2" >
                <img className="w-20 h-20 rounded-full" src={avatar} alt="img" />
            </div>
            <div className='bg-white w-1/2 m-0 rounded-lg pt-10 p-20 text-white text-3xl'
                style={{
                    background: `linear-gradient(rgba(0, 0, 0, 0.1 ) 100%, rgba(0, 0, 0, 0.3 ) 0%)`,
                }}>
                <div className="User font-bold  m-4 w-full">
                    {props.details[count].username}
                </div>
                {props.details[count].review}
            </div>
            <button onClick={back}><IoIosArrowBack className="hover:text-white relative left-0 text-5xl -translate-y-full -translate-x-80" /></button>
            <button onClick={next}><IoIosArrowForward className="hover:text-white relative right-0 text-5xl -translate-y-24 translate-x-80" /></button>
        </div>
    )
}

export default ReviewCard
