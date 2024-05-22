import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';
const ExperienceCard2 = (props) => {
    const baseUrl = "http://13.60.74.234:8085/permit";
    const navigate = useNavigate()
    const [loadingImage, setLoadingImage] = React.useState(true)
    const [img, setImg] = React.useState(null)
    React.useEffect(() => {
        setLoadingImage(true)
        fetch(`${baseUrl}/experiences/experienceImage/`+ props.details.title)
            .then((response) => response.blob())
            .then((blob) => {
                setImg(URL.createObjectURL(blob))
                setLoadingImage(false)
            })
    }, [])
    useEffect(()=>{
        AOS.init({duration: 1000});
    } , [])
    return (
        <div data-aos="flip-down" className="flex flex-col shadow-md hover:shadow-2xl w-full rounded-lg h-full bg-white items-center m-9 my-0 pb-0"
        >
            <div className='p-5 h-80  items-center flex w-96 flex-col'>
                <div  data-aos="zoom-in"className='h-96 w-full rounded-xl  overflow-hidden '>
                    <div className="h-96 w-full relative">
                      {loadingImage && <div className="loadingShimmerDiagnol h-full cardImg w-3/5 lg:w-full "></div>}
                      { !loadingImage &&  < img  className="absolute   cardImg" src={img} alt="img" />}
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
