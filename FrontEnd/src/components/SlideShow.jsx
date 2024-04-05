import React, { useEffect } from 'react'
import { useState } from 'react';
import './SlideShow.css';
const SlideShow = (props) => {
    const [currentIndex , updateIndex] = useState(0);
    useEffect(()=>{
      const timer=setInterval(()=>
      {
        const newIndex=(currentIndex + 1)%props.slides.length;
        updateIndex(newIndex);
      } , props.duration);
       
      return ()=> clearInterval(timer);
    } , [currentIndex]);
  return (
    <div className="h-screen70 w-full flex justify-center overflow-hidden bg-yellow-500 bg-cover bg-center bg-no-repeat" >
      <img src={props.slides[currentIndex]} alt="slide" className="slide " />
    </div>
  )
}

export default SlideShow
