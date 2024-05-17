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
const baseUrl = "http://13.60.74.234:8085/permit";
const ExperienceCard = (props) => {
    const { user, isLoggedIn } = useContext(IsLoggedInContext);
    const navigate = useNavigate();
    const [img, setImg] = React.useState(null)
    React.useEffect(() => {
        fetch(`${baseUrl}/experiences/experienceImage/`+ props.details.title)
            .then((response) => response.blob())
            .then((blob) => {
                setImg(URL.createObjectURL(blob))
            })
    }, [])
    const [liked, setLiked] = React.useState(false);
    const [reviews, setReviews] = React.useState(0);
    React.useEffect(() => {
        fetch(`${baseUrl}/reviews/` + props.details.title)
            .then(res => res.json())
            .then(data => { setReviews(data.length); })
        if (isLoggedIn) {
            fetch(`${baseUrl}/likedExperiences/isLiked/` + props.details.experienceId + '/' + user.id, {
                method: 'GET'
            })
                .then(res => res.text())
                .then(data => { data === "true" ? setLiked(true) : setLiked(false); console.log(data) })
        }
    }, [])

    return (

        <div className="flex flex-col w-full shadow-md rounded-md p-5 lg:p-1 lg-m-9 items-center m-3 "
        // style={{
        //     background: `linear-gradient(rgba(225, 225, 225, 0.8 ) 100%, rgba(225, 225, 225, 0.8 ) 0%)`,

        // }}>
        >
            <div className="flex flex-col lg:items-center lg:flex-row rounded-md w-full ">
                <div className="h-60 w-full lg:w-1/3 2xl:w-1/4 flex rounded-xl items-center justify-center overflow-hidden relative" >
                    {img && <img className="cardImg w-3/5 lg:w-full " src={img} alt="img" />}
                    <button className='absolute right-10 top-5 p-4 bg-gray-200 rounded-full text-2xl text-red-800' onClick={() => {
                        if (isLoggedIn) {

                            if (!liked) {
                                fetch(`${baseUrl}/likedExperiences/` + props.details.experienceId + '/' + user.id, {
                                    method: 'POST'
                                })
                            }
                            else {
                                fetch(`${baseUrl}/likedExperiences/` + props.details.experienceId + '/' + user.id, {
                                    method: 'DELETE'
                                })
                            }
                            setLiked(!liked);

                        }
                        else {
                            if (confirm("Please Login to like the experience") === true) {
                                navigate('/login')
                                window.scrollTo(0, 0);
                            }
                        }
                        ;
                    }}>
                        {!liked ? <FaRegHeart /> : <FaHeart />}
                    </button>
                </div>
                <div className="details w-full lg:w-4/5 flex  flex-col lg:flex-row md:gap-8 p-3">
                    <div className="flex flex-col w-full mid:w-2/3 border-r-2 border-white border-solid">
                        <div className=" mx-2 ">
                            <h1 className='text-sm sm:text-xl text-red-800 font-bold'>{props.details.title}</h1>
                            <h5 className='font-bold'>{reviews} Reviews</h5>
                        </div>
                        <div className='p-3 text-sm sm:text-lg my-2 sm:my-5' >
                            <h4 >{props.details.description.substring(0, 200) + "..."}</h4>
                        </div>
                    </div>
                    <div className=' flex flex-col w-full  lg:w-2/5 items-center p-0 gap-3 text-md md:text-lg'>
                        <div className='flex md:flex-col w-full items-center p-0 justify-between md:justify-normal gap-3 text-md md:text-lg'>
                            <div className=" w-full flex flex-row items-center gap-1 md:gap-2 ">
                                <FaMoneyBill className='text-green-800 text-2xl' />
                                <span><FaRupeeSign className='text-yellow-700' /></span>    <span className='text-2xl text-yellow-700 font-bold whitespace-nowrap'> {(parseInt(props.details.amount)).toLocaleString('en-IN')}</span><span className='text-gray-600'>/person</span>
                            </div>
                            <div className=" w-full flex flex-row items-center gap-2 md:gap-5  ">
                                <LuCalendarClock className='text-amber-950 text-2xl' />
                                <span className='text-sm whitespace-nowrap'>{props.details.days} days</span>
                            </div>
                        </div>
                        <div className='w-full md:block'>
                            <h1 className='text-md md:text-xl text-gray-500 '>Total Price:</h1>
                            <div className='flex items-center'><FaRupeeSign className='text-md md:text-3xl' />{props.details.amount && <h1 className='text-3xl font-bold'> {(parseInt(props.totalPeople * props.details.amount)).toLocaleString('en-IN')}</h1>}</div>
                        </div>
                        <div className=" w-full text-center mt-2 md:mt-7">
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
