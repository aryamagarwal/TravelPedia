import React, { useEffect } from 'react'
import ExperienceCard2 from './ExperienceCard2'
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
const CardPallete = (props) => {
  const [scroll, setScroll] = React.useState(0);
  useEffect(() => {
    const cardPallete = document.querySelector('.cardPallete')
    cardPallete.style.transform = `translateX(${scroll}px)`
  }, [scroll])

  return (
    <div className="w-full relative h-auto overflow-hidden">
      <button className="absolute top-1/2 z-10 text-3xl rounded-full bg-gray-100 p-3 hover:bg-gray-200"onClick={() => {
        setScroll(scroll - 100 < -500 * (props.details.length - 1) ? -100 * (props.details.length - 1) : scroll - 100)
      }}><IoIosArrowBack /></button>
      <button className="absolute top-1/2 z-10 text-3xl right-0 rounded-full bg-gray-100 p-3 hover:bg-gray-200" onClick={()=>{
        setScroll(scroll+100 >0 ? 0 : scroll+100)
      }}>
       <IoIosArrowForward />
      </button>
      <div className='cardPallete px-10 flex mt-1 overflow-visible w-full h-full'>
      {
        props.details.map((location, i) =>
        (
          <ExperienceCard2 key={i} details={location} />
        )
        )
      }
      </div>
    </div>
  )
}

export default CardPallete
