import React, { useEffect } from 'react'
import ExperienceCard2 from './ExperienceCard2'
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import ExperienceCard2Loader from './ExperienceCard2Loader';
const CardPallete = (props) => {
  const [scroll, setScroll] = React.useState(0);
  useEffect(() => {
    const cardPallete = document.querySelector(`.${props.className}`)
    cardPallete.style.transition="transform 0.5s ease-in-out"
    cardPallete.style.transform = `translateX(${scroll}px)`
  }, [scroll])

  return (
    <div className="w-full relative overflow-hidden h-auto ">
      <button className="absolute top-1/2 z-10 text-3xl rounded-full bg-gray-100 p-3 hover:bg-gray-200" onClick={() => {
        setScroll(scroll + 400 > 0 ? 0 : scroll + 400)
      }}><IoIosArrowBack /></button>
      <button className="absolute top-1/2 z-10 text-3xl right-0 rounded-full bg-gray-100 p-3 hover:bg-gray-200" onClick={() => {
        setScroll(scroll - 400 < -400 * (props.details.length) ? 0: scroll - 400)
      }}>
        <IoIosArrowForward />
      </button>
      {props.loading &&
        <div className={` ${props.className}  flex  mt-1 py-5 overflow-visible w-full h-full`}>
          {
            [...Array(5)].map((e, i) => { return <ExperienceCard2Loader key={i} /> })
          }
        </div>
      }

      {!props.loading && <div className={` ${props.className} flex mt-1 py-5 w-full h-full`}>
        {
          props.details.map((location, i) =>
          (
            <ExperienceCard2 key={i} details={location} />
          )
          )
        }
      </div>
      }
    </div>
  )
}

export default CardPallete
