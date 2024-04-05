import React, { useEffect } from 'react'
import { useState } from 'react';
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
    <div className="h-screen/2 w-full bg-yellow-500 bg-cover bg-center bg-no-repeat" 
    style={{
        backgroundImage: `url(${props.slides[currentIndex]})`,
    }
    }>
    </div>
  )
}

export default SlideShow
