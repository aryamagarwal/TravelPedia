import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
function Pagination(props) {
    const pageCount = props.pageCount;
    useEffect(()=>{
        AOS.init({duration: 1000});
    } , [])
  return (
    <div data-aos="zoom-in" className="mt-3">
      <div>
        <button className='mx-2 text-red-800 border-solid border-2 border-red-800 p-3' onClick={()=>{props.currentPage===0 ? props.setCurrentPage(pageCount-1) : props.setCurrentPage(props.currentPage -1 )}}>Prev</button>
                {Array.from({ length: pageCount }, (_, index) => (
                    <button className={ props.currentPage == index ? "w-4 h-4 mx-2 rounded-full bg-red-800" :  "w-4 mx-2 h-4 rounded-full bg-red-100"} key={index}
                    onClick={()=>{props.setCurrentPage(index)}}></button>
                ))}
        <button className='mx-2 text-red-800 border-solid border-2 border-red-800 p-3' onClick={()=>{props.currentPage===pageCount-1 ? props.setCurrentPage(0) : props.setCurrentPage(props.currentPage +1 )}}>Next</button>
            </div>
    </div>
  )
}

export default Pagination
