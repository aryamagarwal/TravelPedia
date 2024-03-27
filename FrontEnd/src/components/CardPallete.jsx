import React from 'react'
import Card from './Card'
const CardPallete = (props) => {
    
  return (
    <div className="flex flex-wrap w-full h-auto">
      {
        props.details.map((location , i)=>
        (
        <Card key={i} details={location}/>
        )
        )
      }
    </div>
  )
}

export default CardPallete
