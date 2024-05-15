import React, { useContext } from 'react'
import { FaMoneyBill, FaRegArrowAltCircleRight } from "react-icons/fa";
import { LuCalendarClock } from "react-icons/lu";
import { useNavigate } from 'react-router-dom'
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IsLoggedInContext } from '../App';
import { FaRupeeSign } from "react-icons/fa";
const ExperienceCard = (props) => {
    const { user, isLoggedIn } = useContext(IsLoggedInContext);
    const navigate = useNavigate();
     const [img , setImg] = React.useState(null)
    React.useEffect(() => {
        fetch("http://localhost:8085/experiences/experienceImage/"+props.details.title)
        .then((response) => response.blob())
        .then((blob) => {
            setImg(URL.createObjectURL(blob))
        })
    }, [])
    const [liked, setLiked] = React.useState(false);
    const [reviews, setReviews] = React.useState(0);
    React.useEffect(() => {
        fetch('http://localhost:8085/reviews/' + props.details.title)
            .then(res => res.json())
            .then(data => { setReviews(data.length); })
        if(isLoggedIn){
        fetch('http://localhost:8085/likedExperiences/isLiked/' + props.details.experienceId + '/' + user.id, {
            method: 'GET'
        })
            .then(res => res.text())
            .then(data => { data === "true" ? setLiked(true) : setLiked(false); console.log(data)})
    }
    }, [])
    
    return (

        <div className="flex flex-col w-full shadow-md rounded-md p-1  items-center m-9 "
        // style={{
        //     background: `linear-gradient(rgba(225, 225, 225, 0.8 ) 100%, rgba(225, 225, 225, 0.8 ) 0%)`,

        // }}>
        >
            <div className="flex flex-row rounded-md w-full ">
                <div className="h-60 w-1/3 flex rounded-xl items-center overflow-hidden relative" >
                    {img && <img className="cardImg" src={img} alt="img" />}
                    <button className='absolute right-10 top-5 p-4 bg-gray-200 rounded-full text-2xl text-red-800' onClick={() => {
                       if(isLoggedIn) {

                        if(!liked) {
                            fetch('http://localhost:8085/likedExperiences/' + props.details.experienceId + '/' + user.id, {
                                method: 'POST'
                            })
                        }
                        else {
                            fetch('http://localhost:8085/likedExperiences/' + props.details.experienceId + '/' + user.id, {
                                method: 'DELETE'
                            })
                        }
                        setLiked(!liked);
                        
                    }
                    else
                    {
                    if(confirm("Please Login to like the experience")===true){
                    navigate('/login')
                    window.scrollTo(0, 0);
                    }
                    };
                    }}>
                        {!liked? <FaRegHeart /> : <FaHeart />}
                    </button>
                </div>
                <div className="details w-2/3 flex  flex-row gap-8 p-3">
                    <div className="flex flex-col w-2/3 border-r-2 border-white border-solid">
                        <div className=" mx-2 ">
                            <h1 className='text-2xl text-red-800 font-bold'>{props.details.title}</h1>
                            <h5 className='font-bold'>{reviews} Reviews</h5>
                        </div>
                        <div className='p-3 my-5' >
                            <h4>{props.details.description.substring(0, 200) + "..."}</h4>
                        </div>
                    </div>
                    <div className=' flex flex-col w-1/3 items-center p-0 gap-3 text-lg'>
                        <div className=" w-full flex flex-row items-center gap-2 justify-between ">
                            <FaMoneyBill className='text-green-800 text-2xl' />
                        <span><FaRupeeSign className='text-yellow-700'/></span>    <span className='text-2xl text-yellow-700 font-bold whitespace-nowrap'> {(parseInt(props.details.amount)).toLocaleString('en-IN')}</span><span className='text-gray-600'>/person</span>
                        </div>
                        <div className=" w-full flex flex-row items-center gap-5  ">
                            <LuCalendarClock className='text-amber-950 text-2xl' />
                            <span className='text-xl'>{props.details.days} days</span>
                        </div>
                        <div className='w-full'>
                            <h1 className='text-xl text-gray-500 '>Total Price:</h1>
                        <div className='flex items-center'><FaRupeeSign className='text-3xl'/>{props.details.amount && <h1 className='text-3xl font-bold'> {(parseInt(props.totalPeople * props.details.amount)).toLocaleString('en-IN')}</h1> }</div>
                        </div>
                        <div className=" w-full text-center mt-7">
                            <button className="text-center p-2 bg-red-800 shadow-red-800 shadow-md text-white rounded-md hover:bg-red-600" onClick={() => {
                                const str = props.details.title.split(' ').join('-');
                                navigate(`/package/${str}`);

                            }}>See Details</button>
                        </div>
                    </div>
                </div>
            </div>
            <span >
                <button onClick={() => { props.handleUpdateExperience(props.details) }}><FaRegEdit className='text-red-800 text-2xl' /></button>
                <button onClick={() => { props.handleDeleteExperience(props.details.experienceId, props.details.title) }}><MdDelete className='text-red-800 text-2xl mx-5' /></button>
            </span>
        </div>
    )
}

export default ExperienceCard
