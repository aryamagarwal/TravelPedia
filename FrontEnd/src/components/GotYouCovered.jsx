import React from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
function GotYouCovered() {
  React.useEffect(()=>{
    AOS.init({duration: 1000});
  } , [])
  return (
    <div data-aos="fade-right"className='w-full bg-transparent h-auto my-5 p-5'>
    <div className='felx flex-col bg-white items-center w-fit rounded-xl p-5 ml-10 my-4'>
      <h1  className='text-2xl font-bold my-2'>We've got you covered</h1>
      <div className='flex text-xl mt-4 items-center justify-evenly ml-5 gap-5'>
           <div className='inline-block'>
             
             <div>
                <h1 className='font-bold'>Explore top attractions</h1>
                <h5>Experience the best of your destination, with attractions, tours, activities and more</h5>
             </div>
           </div>
           <div className='inline-block'>
           <div>
                <h1 className='font-bold'>Fast and flexible</h1>
                <h5>Book packages online in minutes, with free cancellation on many attractions</h5>
             </div>
           </div>
           <div className='inline-block'>
           <div>
                <h1 className='font-bold'>Support when you need it</h1>
                <h5>Travelpedia's global Customer Service team is here to help 24/7</h5>
             </div>
           </div>
      </div>
    </div>
    </div>
  )
}

export default GotYouCovered
