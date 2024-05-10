import React, { useEffect } from 'react'
import { useState } from 'react';
import './SlideShow.css';
const SlideShow = (props) => {
    const [currentIndex , updateIndex] = useState(0);
    const timer = React.useRef(null);
     useEffect(()=>{
         timer.current = setInterval(()=>{
         updateIndex((currentIndex+1)%props.slides.length)
        
        },props.duration)

        return ()=>{
            clearInterval(timer.current)}
        } , [currentIndex] )

        
   
  return (
    <div className="h-screen w-full flex justify-center overflow-hidden t" >
      <img src={props.slides[currentIndex]} alt="slide" className="slide " />
    </div>
  )
}

export default SlideShow
