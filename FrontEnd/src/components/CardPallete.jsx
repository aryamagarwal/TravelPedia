import React from 'react'
import ExperienceCard2 from './ExperienceCard2'
const CardPallete = (props) => {
    
  return (
    <div className="flex flex-wrap w-full h-auto">
      {
        props.details.map((location , i)=>
        (
        <ExperienceCard2 key={i} details={location}/>
        )
        )
      }
    </div>
  )
}

export default CardPallete
